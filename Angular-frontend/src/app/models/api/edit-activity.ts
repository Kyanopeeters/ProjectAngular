import { ActivityType } from "./activity-type";

export interface EditActivityForm {
    id: number,
    name: string, 
    activityTypeId: number, 
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
    activityType:ActivityType
}