import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
/*import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';*/
import 'rxjs/Rx';
//import { Builder } from 'xml2js';

/*import './xml2json.js';
declare function xml2json(xml:any, tab?: any): any;*/
//declare var xml2json: any;

@Injectable()
export class JenkinsBddParserService {

  private jenkinsUrl = 'http://jenkins/view/CBND/view/DEV/job/cbnd-bdd-ui/ws/ui/test/reports/htmlReport.html';

  constructor(private http:Http) {
  }

  getTitle(): string {
    return 'app works from service :)';
  }

  getLastReportData(): any {
    return this.http.get('/assets/1.xml')
      .do(x => console.log(`Last BDD Results: \r\n================= \r\n\r\n${x['_body']}`));
/*      .map(res => {
        var builder = new xml2js.Builder();
      });*/
      /*.map(res => {
        console.log('----------------------------- ' + res['_body']);
        var xxx = JSON.parse(xml2json(res['_body']));
        console.log('xxx ----------------------------- ' + xxx);
      });*/


  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
