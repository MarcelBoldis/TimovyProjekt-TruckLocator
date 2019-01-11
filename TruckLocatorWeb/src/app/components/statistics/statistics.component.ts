import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  employeeMetadataList: any = [];
  trucksMetadataList: any = [];
  charts = [true, false, false];
  LineChart = [];
  DoughnutChart = [];
  BarChart = [];
  constructor(public fbService: FirebaseService) {}

  ngOnInit() {
    this.fbService.getEmployeeListMetadata().subscribe(emploeye => {
      this.employeeMetadataList = emploeye;
    });

    this.fbService.getTruckListReadable().subscribe(truck => {
      this.trucksMetadataList = truck;
    });
  }
  actualGraph() {
    if (this.charts[0]) {
      this.LineChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'March', 'April', 'May'],
          datasets: [
            {
              data: [9, 7, 5, 10, 6],
              borderColor: '#024059',
              borderWidth: 2,
              fillColor: 'rgba(96,153,166,0.5)',
              fill: true,
              pointRadius: 0,
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            text: 'Štatistika pre ...',
            display: true
          },
        }
      });
    }
    if (this.charts[1]) {
      this.DoughnutChart = new Chart('myChart', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [10, 20, 30],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', '#8e5ea2', '#3cba9f'],
            }],
          labels: ['Red', 'Yellow', 'Blue']
        },
        options: {
          title: {
            text: 'Štatistika pre ...',
            display: true
          },
        }
      });
    }
    if (this.charts[2]) {
      const trucksKeys = [];
      const trucksKm = [];
      this.trucksMetadataList.map(function(n) {
        trucksKeys.push(n.brand + ' - ' + n.carNumber);
        trucksKm.push(n.km);
      });
      this.BarChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: trucksKeys,
          datasets: [
            {
              label: 'Počet kilometrov',
              backgroundColor: ['rgba(255, 159, 64, 0.4)', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
              borderColor: [
                'rgba(67, 7, 9, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2,
              data: trucksKm
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Počet najazdených kilometrov vozidiel',
          }
        }
      });
    }
  }
  showGraph(index: number, para: string) {
    this.charts.fill(false);
    this.charts[index] = true;
    if (this.employeeMetadataList.length !== 0 && this.trucksMetadataList.length !== 0) {
      this.actualGraph();
    }
  }
}
