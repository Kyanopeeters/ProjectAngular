import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, count } from 'rxjs';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activity-type';
import { TripType } from '../models/api/trip-type';
import { CountryService } from '../services/country.service';
import { ActivityService } from '../services/activity.service';





@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  constructor(
    private tripService:TripService, 
    private route: ActivatedRoute, 
    private countryService: CountryService, 
    private activityService: ActivityService){}

  trip?: Trip;
  tripType$: Observable<TripType[]> = new Observable<TripType[]>()
  tripCountry$: Observable<Country[]> = new Observable<Country[]>()
  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()


  newCountries:EditTripComponent[] =[];
  newParticipants:EditTripComponent[] =[];
  newActivities:EditTripComponent[] =[];


  ngOnInit(): void {
    this.tripType$ = this.tripService.getTripTypes();
    this.tripCountry$ = this.countryService.getCountries();
    this.tripActivityType$ = this.activityService.getActivityType();


    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.tripService.getTripById(tripId).subscribe((trip) => {
      console.log(trip.tripCountries)
      this.trip = trip 
    });
  }


  



  addNewCountry(){
   // this.newCountries.push(new EditTripComponent())
  }

  addNewParticipant(){
   // this.newParticipants.push(new EditTripComponent())
  }

  addNewActivity(){
   // this.newActivities.push(new EditTripComponent())
  }

}
