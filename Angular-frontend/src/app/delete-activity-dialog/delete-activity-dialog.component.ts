import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Activity } from '../models/api/activity';
import { ActivityService } from '../services/activity.service';
import { DetailsActivityDialogComponent } from '../details-activity-dialog/details-activity-dialog.component';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-delete-activity-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatDialogClose],
  templateUrl: './delete-activity-dialog.component.html',
  styleUrl: './delete-activity-dialog.component.css'
})
export class DeleteActivityDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private activityService : ActivityService, private tripService : TripService, public dialogRef: MatDialog, private router: Router) {}

  deleteActivity(activityId: number) {
    // To delete an activity
    if (activityId !== null) {
      this.activityService.deleteActivity(activityId).subscribe(
        // In case of successful deletion
        
        response => {
          console.log('Server response:', response);
          console.log('Activity has been successfully deleted!');
          this.dialogRef.closeAll();
        },
        // In case of errors
        error => {
          console.error('Activity deletion error:', error);
        }
      );
    } else {
      console.log('No activity has been selected!');
    }
    

  }
}

