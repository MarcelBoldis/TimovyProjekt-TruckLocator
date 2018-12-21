import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  charts = [true, false];

  LineChart = [];
  DoughnutChart = [];
  constructor() { }

  ngOnInit() {
    this.showChart();
  }
  showChart() {
    if (this.charts[0]) {
      this.LineChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'March', 'April', 'May'],
          datasets: [
            {
              data: [9, 7, 5, 10, 6], // your data array
              borderColor: '#00AEFF',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            text: 'Chart',
            display: true
          },
          animation: {
            duration: 1000
          }
        }
      });
    } else {


      this.DoughnutChart = new Chart('myChart', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [10, 20, 30]
          }],
          labels: ['Red', 'Yellow', 'Blue']
        },
      });
    }
  }

  showGraph(index: number, para: string) {
    this.charts.fill(false);
    this.charts[index] = true;
    this.showChart();
  }
}
