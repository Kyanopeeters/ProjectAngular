import { TripType } from "./trip-type";
import { EditCountryForm } from "./edit-country";
import { Activity } from "./activity";

export interface EditTripForm {
    id:number,
    userId: string,
    name: string,
    departDate: Date,
    returnDate: Date,
    isPublic: boolean,
    tripType: TripType,
    tripTypeId: number,
    tripCountries:EditCountryForm[], 
    activities: Activity[],
    guidLink: string,

    
}
