 import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent {
  newCountries:EditTripComponent[] =[];

  addNewCountry(){
    this.newCountries.push(new EditTripComponent())
  }

  newParticipants:EditTripComponent[] =[];

  addNewParticipant(){
    this.newParticipants.push(new EditTripComponent())
  }

  newActivities:EditTripComponent[] =[];

  addNewActivity(){
    this.newActivities.push(new EditTripComponent())
  }

}
