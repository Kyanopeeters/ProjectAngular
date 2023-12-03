import { CountryForm } from "./create-country";

export interface TripForm {
    tripTypeId: number,
    userId: string,
    name: string,
    departDate: Date,
    country: CountryForm[],
    returnDate: Date,
    isPublic: boolean
}
