import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IDriversStatistics, ILabelAndDataForCharts } from '../interfaces/statistics-interfaces';
import { ITrack } from 'src/models/track';
import { ITask } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  statisticsByDriver: IDriversStatistics;
  driversDrivenDistances: ILabelAndDataForCharts;
  driversFinishedTracksNumber: ILabelAndDataForCharts;
  driversPercentageTaskCompleted: ILabelAndDataForCharts;

  constructor(private db: AngularFireDatabase) { this.createDriversStatisticsFromFinishedTracks(); }

  createDriversStatisticsFromFinishedTracks() {
    this.db.list('UPC/stats/finishedTracks').valueChanges().subscribe(finishedTracks => {
      this.statisticsByDriver = {};
      finishedTracks.forEach((track: ITrack) => {
        if (this.statisticsByDriver[track.driverName]) {
          this.statisticsByDriver[track.driverName].numberOfFinishedTracks += 1;
          this.statisticsByDriver[track.driverName].totalDrivenDistance += +track.drivenDistance;
          this.statisticsByDriver[track.driverName].completedTasks += +this.getNumberOfCompletedTasks(track.tasks);
          this.statisticsByDriver[track.driverName].totalNumberOfTasks += +track.tasks.length;
        } else {
          this.statisticsByDriver[track.driverName] = {
            driversId: track.driverName,
            numberOfFinishedTracks: 1,
            totalDrivenDistance: track.drivenDistance,
            completedTasks: this.getNumberOfCompletedTasks(track.tasks),
            totalNumberOfTasks: track.tasks.length
          };
        }
      });
      this.prepareDriversDataFroCharts();
    });
  }

  prepareDriversDataFroCharts() {
    this.driversDrivenDistances = { labels: [], dataVals: [] }
    this.driversFinishedTracksNumber = { labels: [], dataVals: [] }
    this.driversPercentageTaskCompleted = { labels: [], dataVals: [] }

    Object.keys(this.statisticsByDriver).map(driversKey => {

      this.driversDrivenDistances.labels.push(driversKey)
      this.driversDrivenDistances.dataVals.push(this.statisticsByDriver[driversKey].totalDrivenDistance)

      this.driversFinishedTracksNumber.labels.push(driversKey)
      this.driversFinishedTracksNumber.dataVals.push(this.statisticsByDriver[driversKey].numberOfFinishedTracks)

      this.driversPercentageTaskCompleted.labels.push(driversKey)
      this.driversPercentageTaskCompleted.dataVals.push(
        this.calculatepercentage(this.statisticsByDriver[driversKey].totalNumberOfTasks, this.statisticsByDriver[driversKey].completedTasks));

    });
  }
  getNumberOfCompletedTasks(allTasks: ITask[]): number {
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
