export interface IDriversDetail {
    driversId: string,
    numberOfFinishedTracks?: number,
    totalDrivenDistance?: number,
    completedTasks?: number,
    totalNumberOfTasks?: number
}
export interface IDriversStatistics {
    [driversKey: string] : IDriversDetail;
} 
export interface ILabelAndDataForCharts {
    labels: string[];
    dataVals: number[];
} 