import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
import {parseString} from 'xml2js';
import {ReportResult} from "../types/ReportResult";

@Injectable()
export class JenkinsBddParserService {

  private url: string;

  constructor(private http: Http) {
    this.url = '/assets/1.xml';
  }

  getData(): Observable<ReportResult> {
    // parse string is a function in xml2js library
    // it works with callback
    // therefore we need to use Observable.bindNodeCallback
    let parseObservable = Observable.bindNodeCallback(parseString);

    return Observable
      .interval(1000)
      .switchMap(counter => this.http.get(this.url))
      .switchMap(res => parseObservable(res._body))
      .map((res: any) => {
        let temp = res.testsuites.testsuite[0].$;
        let reportResult = new ReportResult(temp.name, temp.disabled, temp.errors, temp.failures, temp.hostname, temp.skipped, temp.tests, temp.time, temp.timestamp);
        return reportResult;
      })
      .distinct(function(x,y) {
        // no need to update the subscribers if it's the same date
        return x.timestamp.valueOf() == y.timestamp.valueOf();
      });
  }
}
