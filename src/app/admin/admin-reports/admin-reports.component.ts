import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginReportService} from './login-report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  loginData: any;
  chartOptions: any;
  userData: any;
  userChartOptions: any;

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
          this.chartifyLoginReport(data);
          this.chartifyUserReport(data);

        },
        error => {
          console.log(error);
        }
      );
  }

  chartifyLoginReport(data: any) {

    this.loginData = {
      labels: [],
      datasets: [{label: 'User Logins', data: [], backgroundColor: '#2C81C0'}],
    };

    Object.keys(data).forEach(key => {
      this.loginData.labels.push(key);

      let loginsForDay = 0;
      Object.keys(data[key]).forEach(email => {
        loginsForDay += data[key][email];
      });
      this.loginData.datasets[0].data.push(loginsForDay);
    });
  }

  chartifyUserReport(data: any) {

    this.userData = [];
    const userAccumulator = {};

    Object.keys(data).forEach(date => {

      Object.keys(data[date]).forEach(email => {
        if (! userAccumulator[email]) {
          userAccumulator[email] = { email: email, totalLogins: 0, sevenDays: 0, thirtyDays: 0, lastLogin: date};
        }
        userAccumulator[email].totalLogins += 1;

        // check if this is a more recent login
        if (new Date(userAccumulator[email].lastLogin) < new Date(date)) {
          userAccumulator[email].lastLogin = date;
        };

        const msInDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        today.setHours(0,0,0,0); // dates from db don't include timestamp, so remove that from our 'today' var
        const dateLogin = new Date(date);
        const daysAgo = (today.getTime() - dateLogin.getTime()) / msInDay;

        if (daysAgo < 7) {
          userAccumulator[email].sevenDays += 1;
        }

        if (daysAgo < 30) {
          userAccumulator[email].thirtyDays += 1;
        }

      });
    });

    Object.keys(userAccumulator).forEach( email => {
      this.userData.push(userAccumulator[email]);
    });
  }

  ngOnInit() {
  }

}
