import { ITrack } from "./track";

export interface IPerson {
    id: string;
    address: string;
    birthDate: Date;
    birthNumber: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    specialisation: string;
    tracks: Array<ITrack>;
    email: string;
    photo: string;
    isActive: boolean;
}
