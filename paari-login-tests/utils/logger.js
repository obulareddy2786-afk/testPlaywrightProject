export class Logger {
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }

  static debug(message) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
  }

  static step(stepNumber, description) {
    console.log(`\n[STEP ${stepNumber}] ${description}`);
  }

  static testCase(testCaseId, description) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TEST: ${testCaseId} - ${description}`);
    console.log(`${'='.repeat(60)}`);
  }

  static result(passed, message) {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${message}\n`);
  }
}
