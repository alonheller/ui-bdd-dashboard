import {Component, OnInit} from '@angular/core';
import {JenkinsBddParserService} from "./services/jenkins-bdd-parser.service";
import {ReportResult} from "./types/ReportResult";
import {Subscription} from 'rxjs';
//import {Highcharts} from "commonjs-highcharts";
declare var Highcharts;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JenkinsBddParserService]
})
export class AppComponent implements OnInit {

  subscription: Subscription;
  test: ReportResult;
  service:JenkinsBddParserService;

  constructor(private jenkinsBddParserService: JenkinsBddParserService) {
    this.service = jenkinsBddParserService;
  }


  drawChart(data) {
    this.test = data;

    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Last BDD created on: ' + this.test.timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        })
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}% ({point.y})</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f}% ({point.y})</b>',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'BDD Tests',
        colorByPoint: true,
        data: [{
          name: 'Successful',
          y: this.test.tests - this.test.errors - this.test.disabled - this.test.failures - this.test.skipped,
          color: '#00CC00',
          visible: this.test.tests - this.test.errors - this.test.disabled - this.test.failures - this.test.skipped !== 0
        }, {
          name: 'Failed',
          y: this.test.failures + this.test.errors,
          sliced: true,
          selected: true,
          color: '#ff0814',
          visible: (this.test.failures + this.test.errors) !== 0
        }, {
          name: 'Disabled',
          y: this.test.disabled + this.test.skipped,
          color: '#ababab',
          visible: (this.test.disabled + this.test.skipped) !== 0
        }]
      }]
    });

  }

  ngOnInit() {
    this.subscription = this.service.getData().subscribe({
      next: (res) => {
        this.drawChart(res);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
