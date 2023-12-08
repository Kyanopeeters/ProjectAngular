import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'rxjs';
import { ActivityType } from '../models/api/activity-type';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../models/api/activity';
import { EditActivityForm } from '../models/api/edit-activity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.css'
})
export class EditActivityComponent implements OnInit {

  constructor(private activityService: ActivityService, private route: ActivatedRoute,  private location: Location, private router: Router    ) { }

  activityType$: Observable<ActivityType[]> = new Observable<ActivityType[]>()

  startTime: Date = new Date;
  endTime: Date = new Date;  
  tripTypeId: number = 0;


  ngOnInit(): void {


    this.activityType$ = this.activityService.getActivityType();
    const activityId = +this.route.snapshot.paramMap.get('id')!;

    this.activityService.getActivityById(activityId).subscribe((activity) => {

      this.activity = activity
      this.startTime = activity.startTime
      this.endTime = activity.endTime

      console.log("activity")
      console.log(activity)

    });

  }
  activityId = +this.route.snapshot.paramMap.get('id')!;
  idTripType: number = 0;


  activity: EditActivityForm ={
    id:this.activityId,
    name: "", 
    tripId: 0,
    startTime: this.startTime,
    endTime: this.endTime,
    transportType: "",
    city: "",
    postalCode: "",
    streetName: "",
    streetNr: "",
    country:'',
    price: 0,
    distance: 0,
    comment: "",
    activityTypeId: this.tripTypeId,
    activityType: {id: this.tripTypeId, name:""}
  }

  onSubmit() {
    const activityId = +this.route.snapshot.paramMap.get('id')!;
    try {

      this.activityService.updateActivityById(activityId, this.activity).subscribe(
        editedActivity => {
          console.log('Activity updated successfully:', editedActivity);
          this.router.navigate(['/trip', this.activity.tripId]);
        },

        error => {
          console.error('Failed to update activity:', error);
        }
      );
    }
    catch (error) {
      console.error('Failed to update activity:', error);
    }
  }

  back(): void {
    this.location.back()
  }

}
