#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes Next.js build output and identifies optimization opportunities
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

const THRESHOLDS = {
  pageSize: 250 * 1024, // 250KB warning threshold
  totalJs: 1000 * 1024, // 1MB total JS warning
  firstLoad: 300 * 1024, // 300KB first load warning
};

async function analyzeBuildOutput() {
  console.log('📦 Analyzing Next.js Build Output');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const buildDir = path.join(projectRoot, '.next');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Get all JavaScript files
  const { stdout: findOutput } = await execAsync(
    `find ${buildDir} -name "*.js" -type f ! -path "*/cache/*"`
  );

  const files = findOutput.split('\n').filter(Boolean);

  console.log(`Found ${files.length} JavaScript files\n`);

  // Categorize files
  const categories = {
    pages: [],
    chunks: [],
    static: [],
    server: [],
  };

  let totalSize = 0;

  for (const file of files) {
    const stats = fs.statSync(file);
    const size = stats.size;
    totalSize += size;

    const relativePath = path.relative(buildDir, file);

    const fileInfo = {
      path: relativePath,
      size,
      sizeKB: (size / 1024).toFixed(2),
      sizeMB: (size / (1024 * 1024)).toFixed(2),
    };

    if (relativePath.startsWith('server/app/')) {
      categories.server.push(fileInfo);
    } else if (relativePath.startsWith('static/chunks/pages/')) {
      categories.pages.push(fileInfo);
    } else if (relativePath.startsWith('static/chunks/')) {
      categories.chunks.push(fileInfo);
    } else {
      categories.static.push(fileInfo);
    }
  }

  // Sort by size
  Object.keys(categories).forEach(key => {
    categories[key].sort((a, b) => b.size - a.size);
  });

  // Display results
  console.log('📊 Bundle Size Breakdown\n');

  console.log('Server Pages (Top 10):');
  categories.server.slice(0, 10).forEach((file, i) => {
    const warning = file.size > THRESHOLDS.pageSize ? ' ⚠️' : '';
    console.log(`  ${i + 1}. ${file.sizeKB}KB - ${file.path}${warning}`);
  });

  console.log('\nClient Chunks (Top 10):');
  categories.chunks.slice(0, 10).forEach((file, i) => {
    const warning = file.size > THRESHOLDS.pageSize ? ' ⚠️' : '';
    console.log(`  ${i + 1}. ${file.sizeKB}KB - ${file.path}${warning}`);
  });

  console.log('\nStatic Files (Top 10):');
  categories.static.slice(0, 10).forEach((file, i) => {
    console.log(`  ${i + 1}. ${file.sizeKB}KB - ${file.path}`);
  });

  // Total size
  console.log(`\n\nTotal Bundle Size: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);

  if (totalSize > THRESHOLDS.totalJs) {
    console.log('⚠️  Total bundle size exceeds recommended threshold (1MB)');
  } else {
    console.log('✅ Total bundle size is within acceptable limits');
  }

  // Check for large dependencies
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📦 Large Dependencies Analysis');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    const { stdout: packageOutput } = await execAsync(
      `du -sh ${projectRoot}/node_modules/* 2>/dev/null | sort -rh | head -20`
    );

    console.log('Largest node_modules (Top 20):');
    console.log(packageOutput);
  } catch (error) {
    console.log('Unable to analyze node_modules');
  }

  // Dashboard-specific analysis
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Dashboard Component Analysis');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const dashboardFiles = categories.server.filter(f =>
    f.path.includes('dashboard')
  );

  dashboardFiles.forEach(file => {
    const isLarge = file.size > 50 * 1024;
    const status = isLarge ? '⚠️' : '✅';
    console.log(`${status} ${file.sizeKB}KB - ${file.path}`);
  });

  // Component file sizes
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Source Component Sizes');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const stepComponents = [
    'src/components/dashboard/steps/Step2Content.tsx',
    'src/components/dashboard/steps/Step3Content.tsx',
    'src/components/dashboard/steps/Step4Content.tsx',
    'src/app/dashboard/page.tsx',
  ];

  stepComponents.forEach(comp => {
    const fullPath = path.join(projectRoot, comp);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const lines = fs.readFileSync(fullPath, 'utf8').split('\n').length;
      console.log(`${comp}:`);
      console.log(`  Size: ${(stats.size / 1024).toFixed(2)}KB`);
      console.log(`  Lines: ${lines}`);
    }
  });

  // Recommendations
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 Optimization Recommendations');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const recommendations = [];

  // Check for large server pages
  const largeServerPages = categories.server.filter(f => f.size > THRESHOLDS.pageSize);
  if (largeServerPages.length > 0) {
    recommendations.push({
      priority: 'High',
      issue: `${largeServerPages.length} server pages exceed 250KB`,
      solution: 'Consider code splitting, lazy loading, or extracting components',
      files: largeServerPages.slice(0, 3).map(f => f.path),
    });
  }

  // Check for large chunks
  const largeChunks = categories.chunks.filter(f => f.size > THRESHOLDS.pageSize);
  if (largeChunks.length > 0) {
    recommendations.push({
      priority: 'Medium',
      issue: `${largeChunks.length} client chunks exceed 250KB`,
      solution: 'Review and optimize large dependencies, use dynamic imports',
      files: largeChunks.slice(0, 3).map(f => f.path),
    });
  }

  // Check dashboard page specifically
  const dashboardPage = categories.server.find(f => f.path.includes('dashboard/page.js'));
  if (dashboardPage && dashboardPage.size > 100 * 1024) {
    recommendations.push({
      priority: 'Medium',
      issue: `Dashboard page is ${dashboardPage.sizeKB}KB`,
      solution: 'Already refactored Steps 2-4. Consider extracting Step 5 (500+ lines)',
      files: ['src/app/dashboard/page.tsx'],
    });
  }

  if (recommendations.length === 0) {
    console.log('✅ No major bundle size issues detected!');
    console.log('\nOptional improvements:');
    console.log('  • Implement lazy loading for step components');
    console.log('  • Use dynamic imports for heavy libraries');
    console.log('  • Consider image lazy loading');
  } else {
    recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. [${rec.priority}] ${rec.issue}`);
      console.log(`   Solution: ${rec.solution}`);
      if (rec.files.length > 0) {
        console.log(`   Files:`);
        rec.files.forEach(f => console.log(`     • ${f}`));
      }
      console.log('');
    });
  }

  console.log('\n✅ Bundle analysis complete!');
  console.log('\n💡 Tip: Run "npm run build" after optimizations to see improvements\n');

  return {
    totalSize,
    categories,
    recommendations,
  };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeBuildOutput().catch(console.error);
}

export { analyzeBuildOutput };
