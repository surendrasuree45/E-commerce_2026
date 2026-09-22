import type { TestCase, TestResult } from '@playwright/test/reporter';

class ConsoleReporter {
    onTestBegin(test: TestCase) {
        console.log(`\n========== RUNNING: ${test.title} ==========`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'passed') {
            console.log(`========== SUCCESS: ${test.title} ==========`);
        } else if (result.status === 'failed') {
            console.log(`========== FAILED: ${test.title} ==========`);
        }
    }
}

export default ConsoleReporter;
