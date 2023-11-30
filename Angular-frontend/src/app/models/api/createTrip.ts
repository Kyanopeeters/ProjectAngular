import { CountryForm } from "./createCountry";

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
