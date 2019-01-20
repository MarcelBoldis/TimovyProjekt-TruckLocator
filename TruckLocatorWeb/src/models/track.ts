import { ITask } from "./task";
import { ICoordinate } from "./geolocation";

export interface ITrack {
    id: string;
    addressFinish: string;
    addressStart: string;
    carName: string;
    driverName: string;
    isActive: boolean;
    tasks: Array<ITask>;
    coordinations: Array<ICoordinate>;
    drivenDistance?: number, 
    wayDate?: Date,
    fuelCosts?: {
        price?: number;
        gasStation?: string;
        fuelAmount?: number;
    };
}