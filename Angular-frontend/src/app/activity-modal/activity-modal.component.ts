import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityForm } from '../models/api/createActivity';
import { ActivityType } from '../models/api/activityType';
import { Observable } from 'rxjs';
import { ActivityService } from '../services/activity.service';
@Component({
  selector: 'app-activity-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-modal.component.html',
  styleUrl: './activity-modal.component.css'
})
export class ActivityModalComponent implements OnInit {
  @Input() tripID: number = -1;
  
  constructor(private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.tripActivityType$ = this.activityService.getActivityType();
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
    console.log(this.activity);
    console.log(this.activity.activityTypeId);
    console.log('Form submitted!');
    await this.activityService.createActivity(this.activity).subscribe(
      (response) => {
        // Handle success
        console.log('Form posted successfully:', response);
      },
      (error) => {
        // Handle error
        console.error('Error posting form:', error);
      }
    );
  }

  closeModal() {
    // TODO: manier om de modal te sluiten na de submit toevoegen
  }
}
