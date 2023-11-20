import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activities } from '../models/activities';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() activities: Activities = { id: 0, name: "", startTime: new Date('2000-01-01T00:00:00'), endTime: new Date('2000-01-01T00:00:00'), amountPeople: 0, transportType: "",  distance: 0 };

}

// ngOnInit(): void {
// }