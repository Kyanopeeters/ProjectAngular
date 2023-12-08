import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityForm } from '../models/api/create-activity';
import { ActivityType } from '../models/api/activity-type';
import { Observable, of, tap } from 'rxjs';
import { ActivityService } from '../services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-activity-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-modal.component.html',
  styleUrl: './activity-modal.component.css'
})
export class ActivityModalComponent implements OnInit {
  tripID: number = -1;
  currentUserID: string = "";
  constructor(private activityService: ActivityService, private route: ActivatedRoute, private router: Router, private location: Location,
  private tripService: TripService, private userService: UserService) {}

  ngOnInit(): void {
    this.tripActivityType$ = this.activityService.getActivityType();
    this.route.params.subscribe(params => {
      this.tripID = +params['tripId'];
    });
  
    this.userService.whoIsLoggedIn().subscribe(
      (sub) => {
        console.log(sub);
        this.currentUserID = sub;
  
        // Once the user information is available, fetch the trip and perform the check
        this.tripService.getTripById(this.tripID).subscribe(
          (trip: Trip) => {
            console.log(trip.userId);
  
            // Check if the user IDs match, if not, navigate to unauthorized page
            if (this.currentUserID !== trip.userId) {
              this.router.navigate(['/unauthorized']); // Navigate to an unauthorized page
            }
  
            // Assign the trip to the observable
            this.trip$ = of(trip);
          },
          (error) => {
            console.error('Error getting trip:', error);
            this.router.navigate(['/unauthorized']);
          }
        );
      },
      (error) => {
        console.error('Error getting user info:', error);
        this.router.navigate(['/unauthorized']);
      }
    );
  }

  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()
  trip$: Observable<Trip> = new Observable<Trip>();

  activity: ActivityForm = {
    name: "",
    tripId: 0,
    startTime: new Date,
    endTime: new Date,
    transportType: "",
    city: "",
    postalCode: "",
    streetName: "",
    streetNr: "",
    price: 0,
    distance: 0,
    comment: "",
    activityTypeId: ""
  }

  

  onSubmit = async () => {
    this.activity.tripId = this.tripID;
    console.log(this.tripID);
    await this.activityService.createActivity(this.activity).subscribe(
      (response) => {
        // Activity posted
        console.log('Form posted successfully:', response);
        this.router.navigate(["trip", this.tripID]);
      },
      (error) => {
        // Error:
        console.error('Error posting form:', error);
      }
    );
  }

  back(): void {
    this.location.back()
  }

}
