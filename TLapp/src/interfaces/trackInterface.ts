export interface TrackInterface {
    direction: string,
    date: string,
    description: string,
    image: string,
    truckDriver: string,
    truck: string,
    tasks: TasksInterface[],
    coordinations: CoordinationsInterface,
    fuelCosts: FuelCostsInterface
}

export interface TasksInterface{
    isDone: boolean,
    description: string,
    place: string,
    fullAdress,
}

export interface CoordinationsInterface{
    lat: any
    long: any
}

// prerobit tak ,aby sa tam dalo dat viac tankovani...
export interface FuelCostsInterface{
    gasStation: string,
    price: number,
    fuelAmount: number
}