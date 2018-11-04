import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  LineChart = [];
  DoughnutChart = [];
  constructor() { }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
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
          duration: 3000
        }
      }
    });

    this.DoughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        datasets: [{
            data: [10, 20, 30]
        }],
        labels: ['Red', 'Yellow', 'Blue']
      },
    });
  }

  showGraph(index: number, para: string) {
    // const destroy: HTMLElement = document.getElementById('chartDiv');
    // destroy.innerHTML = '';
    const element: HTMLElement = document.getElementById(para);
    element.setAttribute('style', 'display:block;');
  }
}
