import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LoginReportService } from './login-report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  loginData: any;
  chartOptions: any;

  constructor(private loginReportService: LoginReportService) {

    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };


      loginReportService.getLoginReport()
      .subscribe(
        data => {
          this.loginData = {
            labels: [],
            datasets: [ { label: 'User Logins', data: [], backgroundColor: '#2C81C0' } ],
            };

          Object.keys(data).forEach( key => {
            this.loginData.labels.push(key);

            let loginsForDay = 0;
            Object.keys(data[key]).forEach( email => {
              loginsForDay += data[key][email];
            });
            this.loginData.datasets[0].data.push(loginsForDay);
          });
        },
        error => {
          console.log(error);
        }
      );

  }

  ngOnInit() {
  }

}
