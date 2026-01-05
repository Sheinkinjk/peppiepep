#!/usr/bin/env node

/**
 * Lighthouse Performance Audit Script
 * Runs Lighthouse on key pages and generates performance report
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://peppiepep.vercel.app';

const pages = [
  { url: `${SITE_URL}/`, name: 'Homepage' },
  { url: `${SITE_URL}/dashboard`, name: 'Dashboard', requiresAuth: true },
  { url: `${SITE_URL}/pricing`, name: 'Pricing' },
  { url: `${SITE_URL}/linkedin-growth`, name: 'LinkedIn Growth' },
  { url: `${SITE_URL}/how-it-works`, name: 'How It Works' },
];

const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

async function runLighthouse(url, name) {
  console.log(`\n🔍 Running Lighthouse audit for: ${name}`);
  console.log(`   URL: ${url}`);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    const runnerResult = await lighthouse(url, {
      port: chrome.port,
      ...lighthouseConfig,
    });

    const report = runnerResult.lhr;

    return {
      name,
      url,
      scores: {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        bestPractices: Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100),
      },
      metrics: {
        fcp: report.audits['first-contentful-paint'].numericValue,
        lcp: report.audits['largest-contentful-paint'].numericValue,
        tti: report.audits['interactive'].numericValue,
        tbt: report.audits['total-blocking-time'].numericValue,
        cls: report.audits['cumulative-layout-shift'].numericValue,
        speedIndex: report.audits['speed-index'].numericValue,
      },
      opportunities: report.audits['unused-css-rules']?.details?.items?.length || 0,
      diagnostics: {
        mainThreadWork: report.audits['mainthread-work-breakdown'].numericValue,
        bootupTime: report.audits['bootup-time'].numericValue,
      },
    };
  } finally {
    await chrome.kill();
  }
}

async function runAllAudits() {
  console.log('🚀 Starting Lighthouse Performance Audits');
  console.log(`📍 Site: ${SITE_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];

  for (const page of pages) {
    if (page.requiresAuth) {
      console.log(`⚠️  Skipping ${page.name} (requires authentication)`);
      continue;
    }

    try {
      const result = await runLighthouse(page.url, page.name);
      results.push(result);

      console.log(`\n✅ ${result.name} - Scores:`);
      console.log(`   Performance: ${result.scores.performance}/100`);
      console.log(`   Accessibility: ${result.scores.accessibility}/100`);
      console.log(`   Best Practices: ${result.scores.bestPractices}/100`);
      console.log(`   SEO: ${result.scores.seo}/100`);
      console.log(`\n   Core Web Vitals:`);
      console.log(`   LCP: ${(result.metrics.lcp / 1000).toFixed(2)}s`);
      console.log(`   FCP: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
      console.log(`   CLS: ${result.metrics.cls.toFixed(3)}`);
      console.log(`   TBT: ${result.metrics.tbt.toFixed(0)}ms`);

    } catch (error) {
      console.error(`❌ Error auditing ${page.name}:`, error.message);
    }
  }

  // Generate summary report
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 PERFORMANCE SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const avgScores = {
    performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
    accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
    bestPractices: Math.round(results.reduce((sum, r) => sum + r.scores.bestPractices, 0) / results.length),
    seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length),
  };

  console.log('Average Scores:');
  console.log(`  Performance:    ${avgScores.performance}/100 ${avgScores.performance >= 90 ? '✅' : avgScores.performance >= 50 ? '⚠️' : '❌'}`);
  console.log(`  Accessibility:  ${avgScores.accessibility}/100 ${avgScores.accessibility >= 90 ? '✅' : avgScores.accessibility >= 50 ? '⚠️' : '❌'}`);
  console.log(`  Best Practices: ${avgScores.bestPractices}/100 ${avgScores.bestPractices >= 90 ? '✅' : avgScores.bestPractices >= 50 ? '⚠️' : '❌'}`);
  console.log(`  SEO:            ${avgScores.seo}/100 ${avgScores.seo >= 90 ? '✅' : avgScores.seo >= 50 ? '⚠️' : '❌'}`);

  // Core Web Vitals analysis
  console.log('\n\nCore Web Vitals:');
  results.forEach(result => {
    const lcpStatus = result.metrics.lcp < 2500 ? '✅ Good' : result.metrics.lcp < 4000 ? '⚠️  Needs Improvement' : '❌ Poor';
    const clsStatus = result.metrics.cls < 0.1 ? '✅ Good' : result.metrics.cls < 0.25 ? '⚠️  Needs Improvement' : '❌ Poor';

    console.log(`\n${result.name}:`);
    console.log(`  LCP: ${(result.metrics.lcp / 1000).toFixed(2)}s ${lcpStatus}`);
    console.log(`  CLS: ${result.metrics.cls.toFixed(3)} ${clsStatus}`);
    console.log(`  FCP: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
  });

  // Save detailed report
  const reportPath = path.join(projectRoot, 'lighthouse-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n\n💾 Detailed report saved to: lighthouse-report.json`);

  // Recommendations
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 RECOMMENDATIONS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (avgScores.performance < 90) {
    console.log('⚠️  Performance needs improvement:');
    console.log('  • Consider code splitting for large components');
    console.log('  • Optimize images further');
    console.log('  • Reduce JavaScript bundle size');
    console.log('  • Implement lazy loading');
  }

  results.forEach(result => {
    if (result.metrics.lcp > 2500) {
      console.log(`\n⚠️  ${result.name} has slow LCP (${(result.metrics.lcp / 1000).toFixed(2)}s):`);
      console.log('  • Optimize largest contentful paint element');
      console.log('  • Preload critical resources');
      console.log('  • Use CDN for static assets');
    }

    if (result.metrics.cls > 0.1) {
      console.log(`\n⚠️  ${result.name} has layout shifts (CLS: ${result.metrics.cls.toFixed(3)}):`);
      console.log('  • Add width/height to images');
      console.log('  • Reserve space for dynamic content');
      console.log('  • Avoid inserting content above existing content');
    }

    if (result.metrics.tbt > 300) {
      console.log(`\n⚠️  ${result.name} has high blocking time (${result.metrics.tbt}ms):`);
      console.log('  • Reduce JavaScript execution time');
      console.log('  • Split long tasks');
      console.log('  • Defer non-critical scripts');
    }
  });

  console.log('\n\n✅ Audit complete!\n');

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllAudits().catch(console.error);
}

export { runAllAudits };
