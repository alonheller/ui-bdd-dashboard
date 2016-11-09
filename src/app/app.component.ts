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


  drawChart(data:Array<ReportResult>) {
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

  drawLast5Chart(data) {
    Highcharts.chart('container2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Last 5 BDD'
      },
      xAxis: {
        categories: [data[0].timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        }), data[1].timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        }), data[2].timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        }), data[3].timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        }), data[4].timestamp.toLocaleTimeString("en-us", {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        })]
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Last 5 BDDs'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: [{
        name: 'Success',
        data: [
          data[4].tests - data[4].errors - data[4].disabled - data[4].failures - data[4].skipped,
          data[3].tests - data[3].errors - data[3].disabled - data[3].failures - data[3].skipped,
          data[2].tests - data[2].errors - data[2].disabled - data[2].failures - data[2].skipped,
          data[1].tests - data[1].errors - data[1].disabled - data[1].failures - data[1].skipped,
          data[0].tests - data[0].errors - data[0].disabled - data[0].failures - data[0].skipped
      ],
        color: '#00CC00'
      }, {
        name: 'Failed',
        data: [
          data[4].failures + data[4].errors,
          data[3].failures + data[3].errors,
          data[2].failures + data[2].errors,
          data[1].failures + data[1].errors,
          data[0].failures + data[0].errors
        ],
        color: '#ff0814'
      },
        {
          name: 'Disabled',
          data: [
            data[4].disabled + data[4].skipped,
            data[3].disabled + data[3].skipped,
            data[2].disabled + data[2].skipped,
            data[1].disabled + data[1].skipped,
            data[0].disabled + data[0].skipped
          ],
          color: '#ababab'
        }]
    });
  }

  ngOnInit() {
    this.subscription = this.service.getData().subscribe({
      next: (res) => {
        //this.drawChart(res[0]);
        this.drawLast5Chart(res);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
