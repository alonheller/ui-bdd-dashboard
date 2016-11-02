import {Component, OnInit} from '@angular/core';
import {JenkinsBddParserService} from "./services/jenkins-bdd-parser.service";
import {ReportResult} from "./types/ReportResult";
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JenkinsBddParserService]
})
export class AppComponent implements OnInit {

  subscription: Subscription;
  test: ReportResult;

  constructor(private jenkinsBddParserService: JenkinsBddParserService) {
    this.test = new ReportResult('Loading...');
  }

  ngOnInit() {
    this.subscription = this.jenkinsBddParserService.getData().subscribe({
      next: (res) => {
        this.test = res
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
