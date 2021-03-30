import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import {saveAs} from 'file-saver';



// import services
import {AnalyticsService} from '../../analytics/services/analytics.service';


@Component({
  selector: 'metric-downloads',
  templateUrl: './metric-downloads.component.html',
  styleUrls: ['./metric-downloads.component.css']
})
export class MetricDownloadsComponent implements OnInit {


  /* CONSTRUCTORS */
  /**
   * constructor
   */
  constructor(
    private AnalyticsService: AnalyticsService
  ) {
  }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  downloadScannedSolicitationsCSV() {
    document.body.style.cursor = 'wait';
    this.AnalyticsService.GetDownloadedSolicitationsReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_solicitations_report.csv');
          document.body.style.cursor = 'default';
        },
        err => {
        }
      );
  }

  downloadPredictionMetricsCSV() {
    document.body.style.cursor = 'wait';
    this.AnalyticsService.GetPredictionMetricsReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_solicitations_report.csv');
          document.body.style.cursor = 'default';
        },
        err => {
        }
      );
  }


}
