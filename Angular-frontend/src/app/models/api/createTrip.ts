import { Activity } from "./activity";

export interface Trip {
    id: number,
    name: string,
    departDate: Date,
    city: string,
    returnDate: Date,
    activity: Activity[]
}