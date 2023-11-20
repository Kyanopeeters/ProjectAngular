import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripType } from '../models/api/trip-type';
import { TripService } from '../services/trip.service';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activityType';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})




export class CreateTripComponent implements OnInit {

  tripType$: Observable<TripType[]> = new Observable<TripType[]>()
  tripCountry$: Observable<Country[]> = new Observable<Country[]>()
  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()

  // locations: Location[] = [];
  showLocationFields: boolean = false;


  toggleLocationFields() {
    this.showLocationFields = !this.showLocationFields;
  }

  // addLocation() {
  //   this.locations.push(new Location());
  // }

  // nieuweLocaties:AanmakenTripComponent[] =[];
  // toevoegenNieuweLocatie(){
  //   this.nieuweLocaties.push(new AanmakenTripComponent())
  // }

  // nieuweDeelnemers:AanmakenTripComponent[] =[];
  // toevoegenNieuweDeelnemer(){
  //   this.nieuweDeelnemers.push(new AanmakenTripComponent())
  // }

  // nieuweActiviteiten:AanmakenTripComponent[] =[];
  // toevoegenNieuweActiviteit(){
  //   this.nieuweActiviteiten.push(new AanmakenTripComponent())
  // }

  constructor(private tripService: TripService,
    private countryService: CountryService, 
    private activityService: ActivityService
    ){}

  ngOnInit(): void {
    this.tripType$ = this.tripService.getTripTypes();
    this.tripCountry$ = this.countryService.getCountries();
    this.tripActivityType$ = this.activityService.getActivityType();

  }
};
