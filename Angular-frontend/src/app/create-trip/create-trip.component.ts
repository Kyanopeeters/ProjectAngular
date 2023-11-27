import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripType } from '../models/api/trip-type';
import { TripService } from '../services/trip.service';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activityType';
import { ActivityService } from '../services/activity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TripForm } from '../models/api/createTrip';
import { UserService } from '../services/user.service';
import { CountryForm } from '../models/api/createCountry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})

export class CreateTripComponent implements OnInit {
  userIdData : string = "";

  constructor(private tripService: TripService,
    private countryService: CountryService, 
    private activityService: ActivityService, 
    private userService: UserService,
    private router: Router
    ){}

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
      console.log(this.trip.userId)
      await this.tripService.createTrip(this.trip).subscribe(
        createdTrip => {

          this.addCountry(this.selectedCountry); // Voeg het geselecteerde land toe aan de trip
          this.onCountrySelect(this.selectedCountryId); // Voer acties uit met het geselecteerde land ID
          console.log('Trip created successfully:', createdTrip);
          this.router.navigate(['/myTrips']); // Navigeer naar de 'mytrips' pagina

        },
        error => {
          console.error('Failed to create trip:', error);
        });
      console.log(this.trip)
    } catch (error) {
      console.log("failed to create trip" , error)
    }
    
  }

  tripType$: Observable<TripType[]> = new Observable<TripType[]>()
  tripCountry$: Observable<Country[]> = new Observable<Country[]>()
  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()

  addCountry(country: CountryForm) {
    this.trip.country.push(country);
    // this.newCountry = { name: '', cityName: '' }; // Clearing the form after adding country

  }
  selectedCountry: CountryForm = { id: 0, countryId: 0, cityName: '' }; // Initialiseer een object van het type CountryForm

  selectedCountryId: number | undefined; // Variabele om de geselecteerde ID bij te houden

  onCountrySelect(selectedId: number | undefined) {
    if (selectedId !== undefined) {
      console.log('Geselecteerde land ID:', selectedId);
      // Doe iets met het geselecteerde land ID
    }
    console.log(selectedId);
  }
  
  trip: TripForm = {
    name: "",
    userId: this.userIdData,
    tripTypeId: 0,
    departDate: new Date,
    returnDate: new Date,
    country: [],
    // country: this.countries,
    isPublic: true,
    // activities: this.activity
  }


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

};
