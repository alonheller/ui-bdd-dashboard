import {Component, OnInit} from '@angular/core';
import {JenkinsBddParserService} from "./services/jenkins-bdd-parser.service";
import {ReportResult} from "./types/ReportResult";
import {Observable, Subscription} from 'rxjs';
import highcharts from "commonjs-highcharts";

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
        text: 'Last BDD created on: ' + new Date(this.test.timestamp).toLocaleTimeString("en-us", {
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
          y: parseInt(this.test.tests) - parseInt(this.test.errors) - parseInt(this.test.disabled) - parseInt(this.test.failures) - parseInt(this.test.skipped),
          color: '#00CC00',
          visible: parseInt(this.test.tests) - parseInt(this.test.errors) - parseInt(this.test.disabled) - parseInt(this.test.failures) - parseInt(this.test.skipped) !== 0
        }, {
          name: 'Failed',
          y: parseInt(this.test.failures)+ parseInt(this.test.errors),
          sliced: true,
          selected: true,
          color: '#ff0814',
          visible: (parseInt(this.test.failures) + parseInt(this.test.errors)) !== 0
        }, {
          name: 'Disabled',
          y: parseInt(this.test.disabled) + parseInt(this.test.skipped),
          color: '#ababab',
          visible: (parseInt(this.test.disabled) + parseInt(this.test.skipped)) !== 0
        }]
      }]
    });

  }

  ngOnInit() {
    this.subscription = this.jenkinsBddParserService.getData().subscribe({
      next: (res) => {
        this.drawChart(res);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
