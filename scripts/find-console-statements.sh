#!/bin/bash

# Find and categorize console statements in the codebase
# Usage: ./scripts/find-console-statements.sh

echo "🔍 Scanning for console statements in production code..."
echo ""

# Create output file
OUTPUT="console-statements-audit.txt"
echo "Console Statements Audit - $(date)" > "$OUTPUT"
echo "========================================" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Find all console statements and count by file
echo "📊 Console statements by file (sorted by count):" | tee -a "$OUTPUT"
echo "" | tee -a "$OUTPUT"

find src -name "*.tsx" -o -name "*.ts" | while read file; do
    count=$(grep -c "console\.\(log\|error\|warn\|info\|debug\)" "$file" 2>/dev/null || echo "0")
    if [ "$count" -gt 0 ]; then
        echo "$count statements in $file"
    fi
done | sort -rn | tee -a "$OUTPUT"

echo "" | tee -a "$OUTPUT"
echo "📝 Total console statements found:" | tee -a "$OUTPUT"
total=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "console\.\(log\|error\|warn\|info\|debug\)" 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
echo "$total statements" | tee -a "$OUTPUT"

echo "" | tee -a "$OUTPUT"
echo "🎯 Files with most console statements (top 10):" | tee -a "$OUTPUT"
echo "" | tee -a "$OUTPUT"

find src -name "*.tsx" -o -name "*.ts" | while read file; do
    count=$(grep -c "console\.\(log\|error\|warn\|info\|debug\)" "$file" 2>/dev/null || echo "0")
    if [ "$count" -gt 0 ]; then
        echo "$count $file"
    fi
done | sort -rn | head -10 | tee -a "$OUTPUT"

echo "" | tee -a "$OUTPUT"
echo "🔥 Critical files (>5 statements):" | tee -a "$OUTPUT"
echo "" | tee -a "$OUTPUT"

find src -name "*.tsx" -o -name "*.ts" | while read file; do
    count=$(grep -c "console\.\(log\|error\|warn\|info\|debug\)" "$file" 2>/dev/null || echo "0")
    if [ "$count" -gt 5 ]; then
        echo "  - $file ($count statements)"
        echo "    Lines:"
        grep -n "console\.\(log\|error\|warn\|info\|debug\)" "$file" | head -5 | sed 's/^/      /'
        if [ $(grep -c "console\.\(log\|error\|warn\|info\|debug\)" "$file") -gt 5 ]; then
            echo "      ... and more"
        fi
        echo ""
    fi
done | tee -a "$OUTPUT"

echo "✅ Audit complete! Full report saved to: $OUTPUT"
echo ""
echo "💡 Recommendation:"
echo "  1. Remove all console.log statements from client components"
echo "  2. Replace console.error with proper error tracking (Sentry)"
echo "  3. Keep server-side errors but use structured logging"
echo "  4. Add environment checks for any debugging statements"
