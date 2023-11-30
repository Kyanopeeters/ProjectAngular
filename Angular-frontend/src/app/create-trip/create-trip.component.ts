import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripType } from '../models/api/trip-type';
import { TripService } from '../services/trip.service';
import { Observable, count } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activityType';
import { ActivityService } from '../services/activity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TripForm } from '../models/api/createTrip';
import { UserService } from '../services/user.service';
import { CountryForm } from '../models/api/createCountry';
import { Router, TitleStrategy } from '@angular/router';
import { Countries } from '../models/countries';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})

export class CreateTripComponent implements OnInit {
  userIdData : string = "";
  i: number = 0;

  constructor(private tripService: TripService,
    private countryService: CountryService, 
    private activityService: ActivityService, 
    private userService: UserService,
    private router: Router
    ){}

    
  tripType$: Observable<TripType[]> = new Observable<TripType[]>()
  tripCountry$: Observable<Country[]> = new Observable<Country[]>()
  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()

  ngOnInit(): void {
    this.tripType$ = this.tripService.getTripTypes();
    this.tripCountry$ = this.countryService.getCountries();
    this.tripActivityType$ = this.activityService.getActivityType();

    this.userService.whoIsLoggedIn().subscribe(
      (sub) => {
        this.userIdData = sub;
      },
      (error) => {
        console.error('error', error);
      }
    )
  }

  onSubmit = async () => {
    try {
      this.trip.userId = this.userIdData;
      this.addCountry();
      await this.tripService.createTrip(this.trip).subscribe(
        createdTrip => {
           console.log('Trip created successfully:', createdTrip);
          
          // Navigate to my trips page
          this.router.navigate(['/myTrips']); 
        },
        error => {
          console.error('Failed to create trip:', error);
        });
      console.log(this.trip)
    } catch (error) {
      console.log("failed to create trip" , error)
    }
  }

  // function addCountry
  addCountry() {
    this.trip.country.push({
      id: 0,
      cityName : this.selectedCountry.cityName,
      countryId: +this.selectedCountryId!
    });
  }

  selectedCountry: CountryForm = { id: 0, countryId: 0, cityName: '' }; 
  selectedCountryId!: string; 

  onCountrySelect(selectedId: number | undefined) {
    if (selectedId !== undefined) {
      console.log('Geselecteerde land ID:', selectedId);
    }
  }
  
  trip: TripForm = {
    name: "",
    userId: this.userIdData,
    tripTypeId: 0,
    departDate: new Date,
    returnDate: new Date,
    country: [],
    isPublic: false,
  }

  
  addNewLocationFields() {
    // this.selectedCountryId = '';
    this.selectedCountry = { id: 0, countryId: 0, cityName: '' };
    this.addCountry();
    
  }

};
