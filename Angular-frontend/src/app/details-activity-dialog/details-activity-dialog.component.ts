import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
//import { DialogData } from '../details-trip/details-trip.component';
import { Activity } from '../models/api/activity';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DeleteActivityDialogComponent } from '../delete-activity-dialog/delete-activity-dialog.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-activity-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './details-activity-dialog.component.html',
  styleUrl: './details-activity-dialog.component.css'
})
export class DetailsActivityDialogComponent {
  userId : string = "";

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private router : Router) {}

 
  ngOnInit() : void {
    this.userService.whoIsLoggedIn().subscribe(
      (sub) => {
        this.userId = sub;
      },
      (error) => {
        console.error('error', error);
      }
    )
  }
  
  updateActivityById(id: number, activity:Activity)
  {
    this.router.navigate(['/activiteitbewerken', id]);
  }



openDialog(activity: Activity) {
  this.dialog.open(DeleteActivityDialogComponent, {
    data: {activity},
  });
}
}
