/**
 * Structured-data audit.
 *
 * Reports what each route actually emits, read from the built HTML rather than
 * from the source, because what a crawler sees is the only thing that counts:
 * a schema helper that is imported but never rendered looks correct in the
 * source and is invisible in production.
 *
 *   node scripts/audit-schema.ts             # builds first, then audits
 *   node scripts/audit-schema.ts --no-build  # audits the existing .next output
 *
 * Reports only. It changes nothing.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Read the assignment straight out of the generated file rather than importing
 * it. The file is generated with one record per line, and parsing it keeps this
 * script free of a build step and free of a compile-time dependency on app code.
 */
function loadAssignments(): { route: string; hub: string; arm: string }[] {
  const src = readFileSync('src/lib/experiment/assignment.ts', 'utf8');
  const re = /route:\s*'([^']+)',\s*hub:\s*'([^']+)',\s*arm:\s*'([^']+)'/g;
  const out: { route: string; hub: string; arm: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push({ route: m[1], hub: m[2], arm: m[3] });
  return out;
}

type Row = {
  route: string;
  hub: string;
  arm: string;
  types: string[];
  hasArticleish: boolean;
  author: boolean;
  dateModified: boolean;
  publisher: boolean;
  visualBreadcrumb: boolean;
  breadcrumbSchema: boolean;
  visualFaq: boolean;
  faqSchema: boolean;
};

const APP_DIR = '.next/server/app';

function build(): void {
  if (process.argv.includes('--no-build')) return;
  if (!existsSync(APP_DIR)) console.log('No build output found, building...');
  else console.log('Building so the audit reads current output...');
  execSync('npm run build', { stdio: 'ignore' });
}

/** Route -> built HTML path. Nested routes are written as nested directories. */
function htmlFor(route: string): string | null {
  const rel = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  const p = join(APP_DIR, rel);
  return existsSync(p) ? p : null;
}

function jsonLdNodes(html: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        if (node && typeof node === 'object') out.push(node as Record<string, unknown>);
        const graph = (node as Record<string, unknown>)?.['@graph'];
        if (Array.isArray(graph)) for (const g of graph) out.push(g as Record<string, unknown>);
      }
    } catch {
      /* a malformed block is itself worth seeing in the types column as (unparseable) */
      out.push({ '@type': '(unparseable)' });
    }
  }
  return out;
}

/**
 * Visual breadcrumbs: the two shells both render a nav whose first link is the
 * site name followed by a separator. Detected structurally rather than by class,
 * since the classes differ between the consumer and legacy shells.
 */
function hasVisualBreadcrumb(html: string): boolean {
  const navs = html.match(/<nav[\s\S]*?<\/nav>/g) ?? [];
  return navs.some((n) => /Refer Labs/.test(n) && /(\/|›|&rsaquo;)/.test(n));
}

/** An FAQ block: a heading that names questions, or a definition list of them. */
function hasVisualFaq(html: string): boolean {
  // Scoped to <main>: the footer carries an "FAQ" link on every page, which made
  // the unscoped check report an FAQ block on pages that have none.
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  return (
    /(Common questions|Frequently asked questions|Questions people ask)</i.test(main) ||
    /<dl[^>]*>[\s\S]{0,4000}?<dt/.test(main)
  );
}

function typeOf(node: Record<string, unknown>): string[] {
  const t = node['@type'];
  if (typeof t === 'string') return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === 'string');
  return [];
}

function audit(): Row[] {
  const rows: Row[] = [];
  const seen = new Set<string>();

  for (const a of loadAssignments()) {
    if (seen.has(a.route)) continue;
    seen.add(a.route);

    const path = htmlFor(a.route);
    if (!path) {
      rows.push({
        route: a.route, hub: a.hub, arm: a.arm, types: ['(no built html)'],
        hasArticleish: false, author: false, dateModified: false, publisher: false,
        visualBreadcrumb: false, breadcrumbSchema: false, visualFaq: false, faqSchema: false,
      });
      continue;
    }

    const html = readFileSync(path, 'utf8');
    const nodes = jsonLdNodes(html);
    const types = Array.from(new Set(nodes.flatMap(typeOf))).sort();

    // The node that should carry authorship: Article and its subtypes, or WebPage.
    const articleish = nodes.filter((n) =>
      typeOf(n).some((t) => /Article$/.test(t) || t === 'WebPage' || t === 'CollectionPage'),
    );

    rows.push({
      route: a.route,
      hub: a.hub,
      arm: a.arm,
      types,
      hasArticleish: articleish.length > 0,
      author: articleish.some((n) => 'author' in n),
      dateModified: articleish.some((n) => 'dateModified' in n),
      publisher: articleish.some((n) => 'publisher' in n),
      visualBreadcrumb: hasVisualBreadcrumb(html),
      breadcrumbSchema: types.includes('BreadcrumbList'),
      visualFaq: hasVisualFaq(html),
      faqSchema: types.includes('FAQPage'),
    });
  }
  return rows;
}

function mark(ok: boolean, na = false): string {
  if (na) return '-';
  return ok ? 'yes' : '**NO**';
}

function report(rows: Row[]): void {
  const hubs = ['hair-loss', 'weight-loss', 'solar-energy'];
  for (const hub of hubs) {
    const inHub = rows.filter((r) => r.hub === hub).sort((a, b) => a.route.localeCompare(b.route));
    if (inHub.length === 0) continue;
    console.log(`\n### ${hub}\n`);
    console.log('| route | arm | @types | author | dateModified | publisher | breadcrumb | FAQ |');
    console.log('|---|---|---|---|---|---|---|---|');
    for (const r of inHub) {
      const bc = r.visualBreadcrumb ? mark(r.breadcrumbSchema) : mark(r.breadcrumbSchema, !r.breadcrumbSchema);
      const faq = r.visualFaq ? mark(r.faqSchema) : mark(r.faqSchema, !r.faqSchema);
      console.log(
        `| \`${r.route}\` | ${r.arm} | ${r.types.join(', ') || '(none)'} | ${mark(r.author)} | ` +
          `${mark(r.dateModified)} | ${mark(r.publisher)} | ${bc} | ${faq} |`,
      );
    }
  }

  const gaps = {
    'missing author on Article/WebPage': rows.filter((r) => r.hasArticleish && !r.author).length,
    'missing dateModified': rows.filter((r) => r.hasArticleish && !r.dateModified).length,
    'missing publisher': rows.filter((r) => r.hasArticleish && !r.publisher).length,
    'no Article/WebPage node at all': rows.filter((r) => !r.hasArticleish).length,
    'visual breadcrumbs without BreadcrumbList': rows.filter((r) => r.visualBreadcrumb && !r.breadcrumbSchema).length,
    'FAQ block without FAQPage': rows.filter((r) => r.visualFaq && !r.faqSchema).length,
  };
  console.log(`\n### Gap summary (${rows.length} routes)\n`);
  console.log('| gap | routes |');
  console.log('|---|---:|');
  for (const [k, v] of Object.entries(gaps)) console.log(`| ${k} | ${v} |`);
}

build();
report(audit());
