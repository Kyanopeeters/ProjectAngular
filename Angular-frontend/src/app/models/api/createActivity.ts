export interface ActivityForm {
    name: string, 
    tripId: number,
    startTime: Date,
    endTime: Date,
    transportType: string,
    city: string,
    postalCode: string,
    streetName: string,
    streetNr: string,
    price: number,
    distance: number,
    comment: string,
    activityTypeId: string

}