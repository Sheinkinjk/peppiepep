#!/bin/bash

# Comprehensive test suite for dashboard refactoring
# Run before go-live to ensure all components work correctly

set -e

echo "🧪 Starting comprehensive dashboard refactoring tests..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test and track results
run_test() {
    local test_name=$1
    local test_command=$2

    echo -e "${YELLOW}Running: $test_name${NC}"

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED: $test_name${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED: $test_name${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. TypeScript Compilation Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check TypeScript types for Step components
echo "Checking Step2Content types..."
if npx tsc --noEmit src/components/dashboard/steps/Step2Content.tsx 2>&1 | grep -q "error TS"; then
    echo -e "${RED}✗ Step2Content has TypeScript errors${NC}"
    ((TESTS_FAILED++))
else
    echo -e "${GREEN}✓ Step2Content types are valid${NC}"
    ((TESTS_PASSED++))
fi

echo "Checking Step3Content types..."
if npx tsc --noEmit src/components/dashboard/steps/Step3Content.tsx 2>&1 | grep -q "error TS"; then
    echo -e "${RED}✗ Step3Content has TypeScript errors${NC}"
    ((TESTS_FAILED++))
else
    echo -e "${GREEN}✓ Step3Content types are valid${NC}"
    ((TESTS_PASSED++))
fi

echo "Checking Step4Content types..."
if npx tsc --noEmit src/components/dashboard/steps/Step4Content.tsx 2>&1 | grep -q "error TS"; then
    echo -e "${RED}✗ Step4Content has TypeScript errors${NC}"
    ((TESTS_FAILED++))
else
    echo -e "${GREEN}✓ Step4Content types are valid${NC}"
    ((TESTS_PASSED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Build Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Running production build..."
if npm run build; then
    echo -e "${GREEN}✓ Production build successful${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Production build failed${NC}"
    ((TESTS_FAILED++))
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. File Structure Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check that component files exist
FILES_TO_CHECK=(
    "src/components/dashboard/steps/Step2Content.tsx"
    "src/components/dashboard/steps/Step3Content.tsx"
    "src/components/dashboard/steps/Step4Content.tsx"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ Found: $file${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ Missing: $file${NC}"
        ((TESTS_FAILED++))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Component Import Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check that dashboard imports the new components
if grep -q "Step2Content" src/app/dashboard/page.tsx; then
    echo -e "${GREEN}✓ Step2Content is imported in dashboard${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Step2Content is NOT imported in dashboard${NC}"
    ((TESTS_FAILED++))
fi

if grep -q "Step3Content" src/app/dashboard/page.tsx; then
    echo -e "${GREEN}✓ Step3Content is imported in dashboard${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Step3Content is NOT imported in dashboard${NC}"
    ((TESTS_FAILED++))
fi

if grep -q "Step4Content" src/app/dashboard/page.tsx; then
    echo -e "${GREEN}✓ Step4Content is imported in dashboard${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Step4Content is NOT imported in dashboard${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Code Quality Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for console.log statements in new components (should use logger)
echo "Checking for console statements in Step components..."
CONSOLE_FOUND=0
for file in "${FILES_TO_CHECK[@]}"; do
    if grep -q "console\." "$file"; then
        echo -e "${YELLOW}⚠ Warning: console statements found in $file${NC}"
        CONSOLE_FOUND=1
    fi
done

if [ $CONSOLE_FOUND -eq 0 ]; then
    echo -e "${GREEN}✓ No console statements in Step components${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ Console statements should be replaced with logger${NC}"
fi

# Check file sizes
echo ""
echo "Checking component file sizes..."
for file in "${FILES_TO_CHECK[@]}"; do
    LINES=$(wc -l < "$file")
    if [ $LINES -lt 300 ]; then
        echo -e "${GREEN}✓ $file: $LINES lines (good size)${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${YELLOW}⚠ $file: $LINES lines (consider further splitting)${NC}"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Bundle Size Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check dashboard page size in build output
if [ -d ".next" ]; then
    DASHBOARD_SIZE=$(du -sh .next/server/app/dashboard/page.js 2>/dev/null | cut -f1 || echo "N/A")
    echo "Dashboard page bundle size: $DASHBOARD_SIZE"

    if [ "$DASHBOARD_SIZE" != "N/A" ]; then
        echo -e "${GREEN}✓ Dashboard page built successfully${NC}"
        ((TESTS_PASSED++))
    fi
else
    echo -e "${YELLOW}⚠ Build output not found, run 'npm run build' first${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. Security Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for potential security issues
echo "Checking for potential security issues..."

# Check for direct email/password exposure
SECURITY_ISSUES=0
for file in "${FILES_TO_CHECK[@]}"; do
    if grep -iE "(password|secret|api_key|private_key)" "$file" | grep -v "import\|type\|interface\|//" > /dev/null; then
        echo -e "${RED}✗ Potential security issue in $file${NC}"
        SECURITY_ISSUES=1
    fi
done

if [ $SECURITY_ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓ No obvious security issues detected${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Security issues need review${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8. Accessibility Quick Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for basic accessibility attributes
echo "Checking for accessibility attributes..."
A11Y_SCORE=0

for file in "${FILES_TO_CHECK[@]}"; do
    if grep -q "aria-" "$file" || grep -q "role=" "$file"; then
        A11Y_SCORE=$((A11Y_SCORE + 1))
    fi
done

if [ $A11Y_SCORE -gt 0 ]; then
    echo -e "${GREEN}✓ Some accessibility attributes found${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ Consider adding more accessibility attributes${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! Dashboard refactoring looks good.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Test manually on https://peppiepep.vercel.app/dashboard"
    echo "2. Run E2E tests if available"
    echo "3. Monitor production logs after deployment"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review and fix before go-live.${NC}"
    exit 1
fi
