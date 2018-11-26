export interface GeolocationsModel {
    id: number;
    geolocations: Geolocation[];
}

export interface Geolocation {
    long: number;
    lat: number;
}

