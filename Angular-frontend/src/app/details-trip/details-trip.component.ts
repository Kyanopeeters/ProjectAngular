import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { UserService } from '../services/user.service';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
@Component({
  selector: 'app-details-trip',
  standalone: true,
  imports: [ CommonModule, ActivityModalComponent ],
  templateUrl: './details-trip.component.html',
  styleUrls: ['./details-trip.component.css']
})
export class DetailsTripComponent implements OnInit{

  trip$ : Observable<Trip> = new Observable<Trip>()
  trip : Trip[] = []
  userId : string = "";
  constructor(private userService: UserService, private location: Location, private tripService : TripService, private route : ActivatedRoute) {}
 

  ngOnInit() : void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId != null) {
      this.trip$ = this.tripService.getTripById(+tripId);
    }
    
    this.userService.whoIsLoggedIn().subscribe(
      (sub) => {
        this.userId = sub;
      },
      (error) => {
        console.error('error', error);
      }
    )
  
  }
  

  back(): void {
    this.location.back()
  }
}
