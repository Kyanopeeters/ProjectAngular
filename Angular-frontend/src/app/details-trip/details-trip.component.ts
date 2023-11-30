import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { UserService } from '../services/user.service';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-trip',
  standalone: true,
  imports: [ CommonModule, ActivityModalComponent ],
  templateUrl: './details-trip.component.html',
  styleUrls: ['./details-trip.component.css']
})
export class DetailsTripComponent implements OnInit{
  // @ViewChild('activityModal') activityModal: ElementRef | undefined;

  trip$ : Observable<Trip> = new Observable<Trip>()
  trip : Trip[] = []
  userId : string = "";
  constructor(private userService: UserService, private location: Location, private tripService : TripService, private route : ActivatedRoute, private router : Router) {}
 

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

  updateTripById(id: number, trip:Trip)
  {
    this.router.navigate(['/tripbewerken', id]);
  }

  addActivity(tripId: number) {
    this.router.navigate(["/activiteittoevoegen", tripId]);
  }
}
