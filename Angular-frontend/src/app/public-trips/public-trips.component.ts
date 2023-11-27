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
  trips$ : Observable<Trip[]> = new Observable<Trip[]>();

  constructor(private tripService: TripService, private router : Router) {}

  ngOnInit(): void {
    this.trips$ = this.tripService.getPublicTrips();
  }

  detail(id : number) {
    this.router.navigate(['/trip', id]);
  }
}
