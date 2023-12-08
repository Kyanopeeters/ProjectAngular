import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripService } from '../services/trip.service';
import { ActivityService } from '../services/activity.service';
import { UserService } from '../services/user.service';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';
import { MatDialog} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { DetailsActivityDialogComponent } from '../details-activity-dialog/details-activity-dialog.component';
import { Activity } from '../models/api/activity';

@Component({
  selector: 'app-details-trip',
  standalone: true,
  imports: [ CommonModule, ActivityModalComponent, WeatherModalComponent, MatButtonModule ],
  templateUrl: './details-trip.component.html',
  styleUrls: ['./details-trip.component.css']
})
export class DetailsTripComponent implements OnInit{
  // @ViewChild('activityModal') activityModal: ElementRef | undefined;

  trip$ : Observable<Trip> = new Observable<Trip>()
  trip : Trip[] = []
  userId : string = "";
  
  constructor(private userService: UserService, private location: Location, private tripService : TripService, private route : ActivatedRoute, private router : Router, private pdfService: PdfService, private dialog: MatDialog) {}

  ngOnInit() : void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId != null) {
      this.trip$ = this.tripService.getTripById(+tripId).pipe(
        catchError((error) => {
          if (error.status === 403) {
            this.router.navigate(['/unauthorized']);
          }
          throw error;
        })
      ); 

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
    this.location.back();
  }

  openDialog(activity: Activity, userId: string) {
    this.dialog.open(DetailsActivityDialogComponent, {
      data: {activity, userId}
    });
  }

  

  updateTripById(id: number, trip:Trip)
  {
    this.router.navigate(['/tripbewerken', id]);
  }

  addActivity(tripId: number) {
    this.router.navigate(["/activiteittoevoegen", tripId]);
  }

  
  generatePDF() {
    const tripId = this.route.snapshot.paramMap.get('id');
  
    if (tripId != null) {
      this.pdfService.generatePDF(+tripId);
    }
  }

  findRange(startDate: Date, stopDate: Date) {
    var dateArray = new Array();
    var result = new Date(startDate);
    var stopDateFormat = new Date(stopDate)
    while (result <= stopDateFormat) {
      dateArray.push(new Date (result));
      result.setDate(result.getDate() + 1)
    }
    return dateArray;
  }
}
