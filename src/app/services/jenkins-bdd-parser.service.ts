import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {parseString} from 'xml2js';
import {ReportResult} from "../types/ReportResult";

@Injectable()
export class JenkinsBddParserService {

  private url: string;

  constructor(private http: Http) {
    this.url = '/assets/1.xml';
  }

  getData(): Observable<ReportResult> {
    let parseObservable = Observable.bindNodeCallback(parseString);

    return Observable
      .interval(60000)
      .switchMap(counter => this.http.get(this.url))
      .switchMap(res => parseObservable(res._body))
      .map((res: any) => {
        return res.testsuites.testsuite[0].$ as ReportResult
      });
  }
}
