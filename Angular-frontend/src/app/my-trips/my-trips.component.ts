import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  private deleteTripId: number | null = null;
  selectedTrip: Trip | null = null;

  trips$ : Observable<Trip[]>  = new Observable<Trip[]>();

  constructor(private tripService: TripService, private router : Router) { }

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
