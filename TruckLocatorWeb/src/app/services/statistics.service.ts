import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IDriversStatistics, ILabelAndDataForCharts, ITrucksStatistics } from '../interfaces/statistics-interfaces';
import { ITrack } from 'src/models/track';
import { ITask } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  statisticsByDriver: IDriversStatistics;
  statisticsByTruck: ITrucksStatistics;
  driversDrivenDistances: ILabelAndDataForCharts;
  driversFinishedTracksNumber: ILabelAndDataForCharts;
  driversPercentageTaskCompleted: ILabelAndDataForCharts;
  driversFuel: ILabelAndDataForCharts;
  dataReady: boolean;
  dataDispaliedOnce: boolean;

  truckDrivenDistance: ILabelAndDataForCharts;
  trucksFuel: ILabelAndDataForCharts;
  trucksFinishedTracksNumber: ILabelAndDataForCharts;

  constructor(private db: AngularFireDatabase) { this.createDriversStatisticsFromFinishedTracks(); }

  createDriversStatisticsFromFinishedTracks() {
    this.db.list('UPC/stats/finishedTracks').valueChanges().subscribe(finishedTracks => {
      this.dataDispaliedOnce = false;
      this.dataReady = false;
      this.statisticsByDriver = {};
      this.statisticsByTruck = {};
      finishedTracks.forEach((track: ITrack) => {

        // DRIVERS
        if (this.statisticsByDriver[track.driverName]) {
          this.statisticsByDriver[track.driverName].numberOfFinishedTracks += 1;
          this.statisticsByDriver[track.driverName].totalDrivenDistance += +track.drivenDistance;
          if (track.fuelCosts) {
            this.statisticsByDriver[track.driverName].priceForFuel += +track.fuelCosts.price;
            this.statisticsByDriver[track.driverName].fuelAmount += +track.fuelCosts.fuelAmount;
            console.log(+this.statisticsByDriver[track.driverName].fuelAmount);

          }
          if (track.tasks) {
            this.statisticsByDriver[track.driverName].completedTasks += +this.getNumberOfCompletedTasks(track.tasks);
            this.statisticsByDriver[track.driverName].totalNumberOfTasks += +track.tasks.length;
          }
        } else {
          let completedTasks = 0;
          let totalNumberOfTasks = 0;
          let priceForFuel = 0;
          let fuelAmount = 0;
          if (track.tasks) {
            completedTasks = this.getNumberOfCompletedTasks(track.tasks);
            totalNumberOfTasks = track.tasks.length;
          }
          if (track.fuelCosts) {
            priceForFuel = track.fuelCosts.price;
            fuelAmount = track.fuelCosts.fuelAmount;
          }
          this.statisticsByDriver[track.driverName] = {
            driversId: track.driverName,
            numberOfFinishedTracks: 1,
            totalDrivenDistance: track.drivenDistance,
            completedTasks: completedTasks,
            totalNumberOfTasks: totalNumberOfTasks,
            priceForFuel: priceForFuel,
            fuelAmount: fuelAmount
          };
        }

        // TRUCKS
        if (this.statisticsByTruck[track.carName]) {
          this.statisticsByTruck[track.carName].numberOfFinishedTracks += 1;
          this.statisticsByTruck[track.carName].totalDrivenDistance += track.drivenDistance;
          if (track.fuelCosts) {
            this.statisticsByTruck[track.carName].fuelAmount += track.fuelCosts.fuelAmount;
          }

        } else {
          let totalDrivenDistance = 0;
          let fuelAmount = 0;
          if (track) {
            totalDrivenDistance = track.drivenDistance;
          }
          if (track.fuelCosts) {
            fuelAmount = track.fuelCosts.fuelAmount;
          }
          this.statisticsByTruck[track.carName] = {
            truckId: track.carName,
            totalDrivenDistance: totalDrivenDistance,
            fuelAmount: fuelAmount,
            numberOfFinishedTracks: 1
          }
        }
      });
      this.prepareDriversDataForCharts();
      this.prepareTrucksDataForCharts();
    });
  }

  prepareDriversDataForCharts() {
    this.driversDrivenDistances = { labels: [], dataVals: [] }
    this.driversFinishedTracksNumber = { labels: [], dataVals: [] }
    this.driversPercentageTaskCompleted = { labels: [], dataVals: [] }
    this.driversFuel = { labels: [], dataVals: [] }

    Object.keys(this.statisticsByDriver).map(driversKey => {

      this.driversDrivenDistances.labels.push(driversKey)
      this.driversDrivenDistances.dataVals.push(this.statisticsByDriver[driversKey].totalDrivenDistance)

      this.driversFinishedTracksNumber.labels.push(driversKey)
      this.driversFinishedTracksNumber.dataVals.push(this.statisticsByDriver[driversKey].numberOfFinishedTracks)

      this.driversFuel.labels.push(driversKey)
      this.driversFuel.dataVals.push(Math.round(100 * this.statisticsByDriver[driversKey].fuelAmount / this.statisticsByDriver[driversKey].totalDrivenDistance));

      this.driversPercentageTaskCompleted.labels.push(driversKey)
      this.driversPercentageTaskCompleted.dataVals.push(
        this.calculatepercentage(this.statisticsByDriver[driversKey].totalNumberOfTasks, this.statisticsByDriver[driversKey].completedTasks));

    });
    this.dataReady = true;
  }
  prepareTrucksDataForCharts() {
    this.truckDrivenDistance = { labels: [], dataVals: [] }
    this.trucksFuel = { labels: [], dataVals: [] }
    this.trucksFinishedTracksNumber = { labels: [], dataVals: [] }

    Object.keys(this.statisticsByTruck).map(truckKey => {

      this.truckDrivenDistance.labels.push(truckKey);
      this.truckDrivenDistance.dataVals.push(this.statisticsByTruck[truckKey].totalDrivenDistance);

      this.trucksFuel.labels.push(truckKey);
      this.trucksFuel.dataVals.push(Math.round(100 * this.statisticsByTruck[truckKey].fuelAmount / this.statisticsByTruck[truckKey].totalDrivenDistance));

      this.trucksFinishedTracksNumber.labels.push(truckKey);
      this.trucksFinishedTracksNumber.dataVals.push(this.statisticsByTruck[truckKey].numberOfFinishedTracks);

    });
    this.dataReady = true;
  }
  getNumberOfCompletedTasks(allTasks: ITask[]): number {
    if (!allTasks)
      return 0;
    let completedTasks: number = 0;
    allTasks.forEach(task => {
      if (task.done) { completedTasks++ }
    });
    return completedTasks;
  }
  calculatepercentage(totalNumber: number, numberOfSuccess: number): number {
    return Math.round((numberOfSuccess / totalNumber) * 100);
  }
}


