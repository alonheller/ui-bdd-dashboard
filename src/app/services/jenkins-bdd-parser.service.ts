import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import * as xml2js from 'xml2js';
//import {Parser} from 'xml2js';
import {ReportResult} from "../types/ReportResult";

@Injectable()
export class JenkinsBddParserService {

  private url: string;

  constructor(private http: Http) {
    this.url = '/assets/1.xml';
  }

  getData(): Observable<ReportResult> {

    var parser = new xml2js.Parser();
    var parseObservable = Observable.bindNodeCallback(parser.parseString);

    return Observable
      .interval(5000)
      .switchMap(counter => this.http.get(this.url))
      .switchMap(res => parseObservable(res._body))
      .map((res: any) => {
        return res.testsuites.testsuite[0].$ as ReportResult
      });
  }
}
