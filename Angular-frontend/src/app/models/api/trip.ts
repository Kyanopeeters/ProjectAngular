import { Activity } from "./activity";

import { TripType } from "./trip-type";

import { Country } from "./country";

export interface Trip {
    id: number,
    name: string,
    userId: string,
    activities: Activity[],
    tripType: TripType,
    departDate: Date,
    returnDate: Date,
    tripCountries: Country[],
    isPublic: boolean
}