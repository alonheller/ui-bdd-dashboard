export class ReportResult {
  disabled: number;//"0"
  errors: number;//"0"
  failures: number;//"0"
  hostname: string;//"localhost"
  name: string;//"Deploy Network Service E2E Tests"
  skipped: number;//"0"
  tests: number;//"9"
  time: number;//"691.943"
  timestamp: Date;//"2016-10-25T10:05:34"

  constructor(name:string, disabled: string, errors: string,
              failures: string, hostname: string,
              skipped: string, tests: string, time: string,
              timestamp: string) {
    this.name = name;
    this.hostname = hostname;
    this.errors = parseInt(errors);
    this.failures = parseInt(failures);
    this.disabled = parseInt(disabled);
    this.skipped = parseInt(skipped);
    this.tests = parseInt(tests);
    this.time = parseFloat(time);
    this.timestamp = new Date(timestamp);
  }
}
