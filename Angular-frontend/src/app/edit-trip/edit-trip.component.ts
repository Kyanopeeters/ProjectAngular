import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../models/api/country';
import { ActivityType } from '../models/api/activity-type';
import { TripType } from '../models/api/trip-type';
import { CountryService } from '../services/country.service';
import { ActivityService } from '../services/activity.service';
import { Router } from '@angular/router';
import { EditTripForm } from '../models/api/edit-trip';
import { UserService } from '../services/user.service';
import { EditCountryForm } from '../models/api/edit-country';



@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  userIdData: string = "";
  nextAvailableId: number = 0;

  selectedCountry: EditCountryForm = { id: 0, cityName: '', countryId:0 ,  name: ''};
  

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private activityService: ActivityService,
    private router: Router,
    private userService: UserService,
  ) { }


  tripType$: Observable<TripType[]> = new Observable<TripType[]>()
  tripCountry$: Observable<Country[]> = new Observable<Country[]>()
  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()


  newCountries: EditTripComponent[] = [];
  tripId = +this.route.snapshot.paramMap.get('id')!;

  departdate: Date = new Date;
  returnDate: Date = new Date;
  tripTypeId: number = 0;
  tripCountryId: number = 0;
  idTripType: number = 0;
  cityName: string = '';

  tripTypes: TripType[] = [];


  ngOnInit(): void {
    this.tripType$ = this.tripService.getTripTypes();
    this.tripCountry$ = this.countryService.getCountries();
    this.tripActivityType$ = this.activityService.getActivityType();

    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.tripService.getTripById(tripId).subscribe((trip) => {

      this.trip = trip
      this.departdate = trip.departDate
      this.returnDate = trip.returnDate
      console.log("trip")
      console.log(trip)

    });

    this.userService.whoIsLoggedIn().subscribe(
      (sub) => {
        this.userIdData = sub;
      },
      (error) => {
        console.error('error', error);
      }
    )
  }

  trip: EditTripForm = {
    id: this.tripId,
    userId: this.userIdData,
    name: "",
    departDate: this.departdate,
    returnDate: this.returnDate,
    isPublic: false,
    tripType: { id: this.idTripType, name: '' },
    tripTypeId: this.idTripType,
    tripCountries: [{id: 0, cityName: this.cityName, countryId: 0, name: this.cityName}],
    activities: [],
    guidLink: '',

  }



  onSubmit() {
    // get the tripID and assign userId
    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.trip.userId = this.userIdData;

    try {
      this.addNewCountry();

      this.trip.tripTypeId = this.trip.tripType.id
      console.log(this.trip.tripCountries)

      this.tripService.updateTripById(tripId, this.trip).subscribe(
        editedTrip => {
          console.log('Trip updated successfully:', editedTrip);
          this.router.navigate(['/trip', tripId]);
        },

        error => {
          console.error('Failed to update trip:', error);
        }
      );
    }
    catch (error) {
      console.error('Failed to update trip:', error);
    }
  }

  checkoutForm: EditTripForm = {
    id: this.tripId,
    name: this.trip.name,
    userId: this.userIdData,
    tripType: { id:  this.tripTypeId
      , name: '' },
    departDate: this.departdate,
    returnDate: this.returnDate,
    tripTypeId: 0,
    tripCountries: [],
    isPublic: this.trip.isPublic,
    activities: [],
    guidLink: ''

  }


  addNewCountry() {
    this.checkoutForm.tripCountries.push({
      id: this.selectedCountry.id,
      cityName: this.selectedCountry.cityName,
      countryId: this.selectedCountry.countryId,
      name:this.selectedCountry.name
    });

  }

  extraCountryFields() {
    this.addNewCountry();

    this.nextAvailableId = this.trip.tripCountries.length;

    // Input fields not copying
    this.trip.tripCountries[this.nextAvailableId] = {id: 0, countryId: 0, cityName: '', name:''};
    console.log(this.trip.tripCountries);

    // Id + 1
    this.nextAvailableId++;
    
  }

    // Remove extra fields
    removeLocationFields() {
      console.log(this.nextAvailableId)
      if (this.trip.tripCountries.length > 1) {
        this.trip.tripCountries.pop();
        this.nextAvailableId--;
      }
      console.log(this.nextAvailableId)
    }
}
