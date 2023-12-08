import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environment';
@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  p: number = 1;
  private deleteTripId: number | null = null;
  selectedTrip: Trip | null = null;
  url: string = "";
  guid: string = "";

  trips$ : Observable<Trip[]>  = new Observable<Trip[]>();

  constructor(private tripService: TripService, private router : Router, private location: Location) { }

  ngOnInit(): void {
    this.getAllMyTrips();
  }

  getAllMyTrips()
  {
    this.trips$ =  this.tripService.getMyTrips();
  }

  detail(id : number) {
    this.router.navigate(['/trip', id]);
    console.log(id);

  }

  share(id: number){
    this.tripService.getTripById(id).subscribe(trip => {
      this.selectedTrip = trip;

      if (this.selectedTrip && this.selectedTrip.guidLink) {
        // Replace voor de gehoste versie!!!!!
        //const baseUrl = "http://localhost:4200";
        const baseUrl = "https://project-angular-two.vercel.app"
        // Construct the URL by appending the trip's GUID
        const tripUrl = `${baseUrl}/trip/${this.selectedTrip.guidLink}`;
    
        // Prepare the external URL
        this.url = tripUrl;
      } else {
        console.error('Selected trip or its GUID is missing.');
      }
    });
    
  }


  // Get the right trip(information) and the id of the trip to delete
  setDelete(id: number) {
    this.deleteTripId = id;
    console.log(id);
    // Get the selected trip by id
    this.tripService.getTripById(id).subscribe(trip => {
      this.selectedTrip = trip;
      console.log(trip);
    });
  }
  
  
  // To delete a trip
  deleteTrip() {
    if (this.deleteTripId !== null) {
      console.log(this.deleteTripId);
      this.tripService.deleteTrip(this.deleteTripId).subscribe(
        // In case of successful deletion
        response => {
          console.log('Server response:', response);
          console.log('Trip has been successfully deleted!');
          this.getAllMyTrips();
        },
        // In case of errors
        error => {
          console.error('Trip deletion error:', error);
        }
      );
  
      // Reset deleteTripId after deletion
      this.deleteTripId = null;
    } else {
      console.log('No trip has been selected!');
    }
  }
}
