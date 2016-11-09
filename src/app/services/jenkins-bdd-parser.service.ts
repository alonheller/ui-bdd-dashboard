import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {parseString} from 'xml2js';
import {ReportResult} from "../types/ReportResult";

@Injectable()
export class JenkinsBddParserService {

  private baseUrl: string = '/assets/';
  private fileExtension: string = '.xml';
  private test1: string = `${this.baseUrl}1${this.fileExtension}`;
  private test2: string = `${this.baseUrl}2${this.fileExtension}`;
  private test3: string = `${this.baseUrl}3${this.fileExtension}`;
  private test4: string = `${this.baseUrl}4${this.fileExtension}`;
  private test5: string = `${this.baseUrl}5${this.fileExtension}`;

  constructor(private http: Http) {

  }

  /*getData(): Observable<ReportResult> {
    // parse string is a function in xml2js library
    // it works with callback
    // therefore we need to use Observable.bindNodeCallback
    let parseObservable = Observable.bindNodeCallback(parseString);

    return Observable
      .interval(1000)
      .switchMap(counter => this.http.get(this.test1))
      .switchMap(res => parseObservable(res._body))
      .map((res: any) => {
        let temp = res.testsuites.testsuite[0].$;
        let reportResult = new ReportResult(temp.name, temp.disabled, temp.errors, temp.failures, temp.hostname, temp.skipped, temp.tests, temp.time, temp.timestamp);
        return reportResult;
      })
      .distinct(function (x, y) {
        // no need to update the subscribers if it's the same date
        return x.timestamp.valueOf() == y.timestamp.valueOf();
      });
  }*/

  getData(): Observable<Array<ReportResult>> {
    // parse string is a function in xml2js library
    // it works with callback
    // therefore we need to use Observable.bindNodeCallback
    let parseObservable = Observable.bindNodeCallback(parseString);

    return Observable
      /*.interval(5000)*/
      .zip(
        this.http.get(this.test1).map((res:any) => parseObservable(res._body)),
        this.http.get(this.test2).map((res:any) => parseObservable(res._body)),
        this.http.get(this.test3).map((res:any) => parseObservable(res._body)),
        this.http.get(this.test4).map((res:any) => parseObservable(res._body)),
        this.http.get(this.test5).map((res:any) => parseObservable(res._body))
      )
      .switchMap(res => {
        return Observable.zip(...res);
      })
      .map((res: Array<any>) => {
        var items: ReportResult[] = [];
        for(var i = 0; i < res.length; i++){
          let temp = res[i].testsuites.testsuite[0].$;
          let reportResult = new ReportResult(temp.name, temp.disabled, temp.errors, temp.failures, temp.hostname, temp.skipped, temp.tests, temp.time, temp.timestamp);
          items.push(reportResult);
        }
        return items;
      })
     /* .distinct(function (x:Array<ReportResult>, y:Array<ReportResult>) {
        // no need to update the subscribers if it's the same date
        return x[0].timestamp.valueOf() == y[0].timestamp.valueOf();
      })*/;

  }
}
