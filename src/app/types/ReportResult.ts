export class ReportResult {
  disabled: string;//"0"
  errors: string;//"0"
  failures: string;//"0"
  hostname: string;//"localhost"
  name: string;//"Deploy Network Service E2E Tests"
  skipped: string;//"0"
  tests: number;//"9"
  time: string;//"691.943"
  timestamp: string;//"2016-10-25T10:05:34"

  constructor(name:string) {
    this.name = name;
  }
}
