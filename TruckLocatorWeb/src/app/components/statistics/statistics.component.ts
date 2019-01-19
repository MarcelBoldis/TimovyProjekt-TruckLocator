import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  @ViewChild('dnumberOfFinishedTracksCanvas') dnumberOfFinishedTracksCanvas: ElementRef;
  @ViewChild('driversDrivenDistanceCanvas') driversDrivenDistanceCanvas: ElementRef;
  @ViewChild('taskCompletitionSucces') taskCompletitionSucces: ElementRef;

  constructor(private statisticsService: StatisticsService, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() { }

  ngAfterViewChecked() {
    if (!this.statisticsService.dataDispaliedOnce && this.statisticsService.dataReady) {
      this.initializeAllGraphs();
      this.statisticsService.dataDispaliedOnce = true;
    }
  }

  initializeAllGraphs() {
    this.createGraphDriversDrivenDistance('doughnut', 'Počet prejdených km',
      this.driversDrivenDistanceCanvas.nativeElement.getContext('2d'),
      this.statisticsService.driversDrivenDistances.dataVals, this.statisticsService.driversDrivenDistances.labels, 142, 94, 162);

    this.createGraphDriversDrivenDistance('doughnut', 'Počet ukončených rozvozov',
      this.dnumberOfFinishedTracksCanvas.nativeElement.getContext('2d'),
      this.statisticsService.driversFinishedTracksNumber.dataVals, this.statisticsService.driversFinishedTracksNumber.labels, 29, 178, 186);

    this.createGraphDriversDrivenDistance('bar', 'Úspešnosť ukončenia úlohy',
      this.taskCompletitionSucces.nativeElement.getContext('2d'),
      this.statisticsService.driversPercentageTaskCompleted.dataVals, this.statisticsService.driversPercentageTaskCompleted.labels, 185, 146, 29);
  }


  createGraphDriversDrivenDistance(graphType: string, graphTitile: string, graphHtmlIdContext: any, dataVals: number[], labels: string[], red: number, green: number, blue: number) {
    new Chart(graphHtmlIdContext, {
      type: graphType,
      data: {
        datasets: [{
          data: dataVals,
          backgroundColor: this.collorPalleteMaker(dataVals.length, red, green, blue),
        }],
        labels: labels
      },
      options: {
        title: {
          text: graphTitile,
          display: true
        },
      }
    });
  }
  collorPalleteMaker(numberOfColors: number, red: number, green: number, blue: number): string[] {
    let colorPallete: string[] = [];
    let opacityRatio: number = Math.round((1 / numberOfColors) * 100) / 100;
    let alpha: number;
    for (let index = 0; index < numberOfColors; index++) {
      alpha = 1 - (opacityRatio * index);
      colorPallete.push('rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')')
    }
    return colorPallete;
  }
}
