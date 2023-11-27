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
  trips$ : Observable<Trip[]> 
  = new Observable<Trip[]>();

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
  }
  
  deleteTrip(id: number) {
    if (confirm('Weet je zeker dat je deze trip wilt verwijderen?')) {
      this.tripService.deleteTrip(id).subscribe(
        response => {
          console.log('Server response:', response);
          console.log('Trip has been successfully deleted!');
          this.getAllMyTrips();
        },
        error => {
          console.error('Trip deletion error:', error);
        }
      );
    }
  }
  
}
