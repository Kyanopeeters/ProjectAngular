import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-trips',
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css']
})
export class PublicTripsComponent {
  p: number = 1;
  trips$ : Observable<Trip[]> = new Observable<Trip[]>();

  searchString: string = "";


  constructor(private tripService: TripService, private router : Router) {}

  ngOnInit(): void {
    this.trips$ = this.tripService.getPublicTrips();
  }

  detail(id : number) {
    this.router.navigate(['/trip', id]);
  }

  search() {
    console.log(this.searchString)
    this.trips$ = this.tripService.searchTrip(this.searchString);
  }
}
