import { Activity } from "./activity";
import { CountryForm } from "./createCountry";
import { ActivityForm } from "./createActivity";

export interface TripForm {
    tripTypeId: number,
    userId: string,
    name: string,
    departDate: Date,
    country: CountryForm[],
    returnDate: Date,
    isPublic: boolean
    // activities: ActivityForm
}
