export interface IDriversDetail {
    driversId: string,
    numberOfFinishedTracks?: number,
    totalDrivenDistance?: number,
    completedTasks?: number,
    totalNumberOfTasks?: number,
    priceForFuel?: number,
    fuelAmount?: number,
}
export interface IDriversStatistics {
    [driversKey: string] : IDriversDetail;
} 


export interface ITruckDetail {
    truckId: string,
    totalDrivenDistance?: number,
    fuelAmount?: number,
    numberOfFinishedTracks?: number,
}
export interface ITrucksStatistics {
    [truckKey: string] : ITruckDetail;
} 


export interface ILabelAndDataForCharts {
    labels: string[];
    dataVals: number[];
} 