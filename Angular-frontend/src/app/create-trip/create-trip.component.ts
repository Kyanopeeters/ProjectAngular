import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripType } from '../models/api/trip-type';
import { TripService } from '../services/trip.service';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activity-type';
import { ActivityService } from '../services/activity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TripForm } from '../models/api/create-trip';
import { UserService } from '../services/user.service';
import { CountryForm } from '../models/api/create-country';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})

export class CreateTripComponent implements OnInit {
  // Initalisation of variables
  userIdData : string = "";
  nextAvailableId: number = 0;

  selectedCountry: CountryForm = { id: 0, countryId: 0, cityName: '' }; 
  selectedCountryId!: string; 

  constructor(private tripService: TripService,
    private countryService: CountryService, 
    private activityService: ActivityService, 
    private userService: UserService,
    private router: Router,
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

  // Submit a trip
  onSubmit = async () => {
    try {
      // User id of this trip & function addCountry
      this.trip.userId = this.userIdData;
      this.addCountry();

      // Create a trip
      await this.tripService.createTrip(this.trip).subscribe(
        createdTrip => {
           console.log('Trip created successfully:', createdTrip);
          
          // Navigate to my trips page
          this.router.navigate(['/myTrips']); 
        },
        // In case of errors, show the error
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
      id: this.nextAvailableId,
      cityName : this.selectedCountry.cityName,
      countryId: +this.selectedCountryId!
    });
  }
  
  // Initialisation of a trip object
  trip: TripForm = {
    name: "",
    userId: this.userIdData,
    tripTypeId: 0,
    departDate: new Date,
    returnDate: new Date,
    country: [],
    isPublic: false,
  }
  
  // Add extra fields
  addNewLocationFields() {
    // Function addcountry()
    this.addCountry();

    // Input fields not copying
    this.trip.country[this.nextAvailableId] = {id: 0, countryId: 0, cityName: ''};

    // Id + 1
    this.nextAvailableId++;
    
  }

  // Remove extra fields
  removeLocationFields() {
    if (this.trip.country.length > 0) {
      this.trip.country.pop();
      this.nextAvailableId--;
    }
  }
  
};
