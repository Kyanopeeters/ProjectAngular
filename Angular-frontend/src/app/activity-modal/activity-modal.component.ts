import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityForm } from '../models/api/createActivity';
import { ActivityType } from '../models/api/activityType';
import { Observable } from 'rxjs';
import { ActivityService } from '../services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-modal.component.html',
  styleUrl: './activity-modal.component.css'
})
export class ActivityModalComponent implements OnInit {
  tripID: number = -1;
  
  constructor(private activityService: ActivityService, private route: ActivatedRoute, private router: Router, private location: Location
  ) {}

  ngOnInit(): void {
    this.tripActivityType$ = this.activityService.getActivityType();
    this.route.params.subscribe(params => {
      this.tripID = +params['tripId']; 
      
    });
  }

  tripActivityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()

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
    price: "",
    distance: "",
    comment: "",
    activityTypeId: 0
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
