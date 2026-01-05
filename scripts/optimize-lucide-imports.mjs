#!/usr/bin/env node

/**
 * Lucide React Icon Import Optimizer
 *
 * Converts bulk imports from lucide-react to individual icon imports
 * for better tree-shaking and reduced bundle size.
 *
 * BEFORE:
 * import { Users, Mail, Settings } from 'lucide-react';
 *
 * AFTER:
 * import Users from 'lucide-react/dist/esm/icons/users';
 * import Mail from 'lucide-react/dist/esm/icons/mail';
 * import Settings from 'lucide-react/dist/esm/icons/settings';
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Convert icon name to kebab-case for import path
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

async function optimizeLucideImports() {
  console.log('🎨 Optimizing Lucide React Icon Imports\n');
  console.log('This will convert bulk imports to individual imports for better tree-shaking.\n');

  // Find all files with lucide-react imports
  const { stdout } = await execAsync(
    `grep -r "from ['\\"]lucide-react['\\"]" ${projectRoot}/src --include="*.tsx" --include="*.ts" -l || true`
  );

  const files = stdout.split('\n').filter(Boolean);

  if (files.length === 0) {
    console.log('No files found with lucide-react imports.');
    return;
  }

  console.log(`Found ${files.length} files with lucide-react imports\n`);

  let totalOptimized = 0;
  let totalIconsOptimized = 0;
  const errors = [];

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      // Match import statements from lucide-react
      const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
      const matches = [...content.matchAll(importRegex)];

      if (matches.length === 0) continue;

      for (const match of matches) {
        const fullImport = match[0];
        const iconsList = match[1];

        // Parse icon names
        const icons = iconsList
          .split(',')
          .map(icon => icon.trim())
          .filter(icon => icon.length > 0);

        if (icons.length === 0) continue;

        // Generate individual imports
        const individualImports = icons
          .map(icon => {
            const kebabName = toKebabCase(icon);
            return `import ${icon} from 'lucide-react/dist/esm/icons/${kebabName}';`;
          })
          .join('\n');

        // Replace the bulk import with individual imports
        content = content.replace(fullImport, individualImports);
        modified = true;
        totalIconsOptimized += icons.length;
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        totalOptimized++;
        console.log(`✅ Optimized ${path.relative(projectRoot, file)}`);
      }
    } catch (error) {
      errors.push({ file, error: error.message });
      console.log(`❌ Error processing ${path.relative(projectRoot, file)}: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Optimization Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Files optimized: ${totalOptimized}`);
  console.log(`Total icons optimized: ${totalIconsOptimized}`);
  console.log(`Expected bundle size reduction: ~${Math.round(totalIconsOptimized * 2)}KB\n`);

  if (errors.length > 0) {
    console.log('⚠️  Errors encountered:');
    errors.forEach(({ file, error }) => {
      console.log(`   ${path.relative(projectRoot, file)}: ${error}`);
    });
  }

  console.log('\n✅ Lucide icon import optimization complete!');
  console.log('💡 Next: Run "npm run build" to verify tree-shaking works correctly.\n');

  return {
    filesOptimized: totalOptimized,
    iconsOptimized: totalIconsOptimized,
    errors,
  };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeLucideImports().catch(console.error);
}

export { optimizeLucideImports };
