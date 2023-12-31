import { ActivityType } from "./activity-type";

export interface Activity {
    id: number,
    name: string, 
    activityType: ActivityType, 
    comment: string,
    startTime: Date,
    endTime: Date,
    transportType: string,
    city: string,
    country: string,
    postalCode: string,
    streetName: string,
    streetNr: string,
    price: number,
    distance: number,
    tripId: number,
    activityTypeId:number

}