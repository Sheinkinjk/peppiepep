import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Files to process (most critical ones first)
const filesToProcess = [
  'src/app/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/components/CustomersTable.tsx',
  'src/components/ReferralsTable.tsx',
  'src/app/login/page.tsx',
  'src/components/SupportChatbot.tsx',
  'src/components/CampaignBuilder.tsx',
  'src/components/ShareReferralCard.tsx',
];

let totalReplacements = 0;

filesToProcess.forEach(relPath => {
  const filePath = path.join(projectRoot, relPath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${relPath} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileReplacements = 0;

  // Check if logger is already imported
  const hasLoggerImport = content.includes("import { logger } from") ||
                          content.includes('import { logger } from');

  // Add logger import if not present and file has console statements
  if (!hasLoggerImport && /console\.(log|error|warn|info)/.test(content)) {
    // Find the last import statement
    const imports = content.match(/^import .+ from .+$/gm);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertPos = lastImportIndex + lastImport.length;

      content = content.slice(0, insertPos) +
                '\nimport { logger } from "@/lib/logger";' +
                content.slice(insertPos);
      fileReplacements++;
    }
  }

  // Replace console.log with logger.info
  content = content.replace(/console\.log\(/g, (match) => {
    fileReplacements++;
    return 'logger.info(';
  });

  // Replace console.error with logger.error
  content = content.replace(/console\.error\(/g, (match) => {
    fileReplacements++;
    return 'logger.error(';
  });

  // Replace console.warn with logger.warn
  content = content.replace(/console\.warn\(/g, (match) => {
    fileReplacements++;
    return 'logger.warn(';
  });

  // Replace console.info with logger.info
  content = content.replace(/console\.info\(/g, (match) => {
    fileReplacements++;
    return 'logger.info(';
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${relPath}: ${fileReplacements} replacements`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`✓  ${relPath}: No console statements found`);
  }
});

console.log(`\n🎉 Total replacements: ${totalReplacements}`);
console.log('\nRun "npm run build" to verify no errors were introduced.');
