import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityType } from '../models/api/activityType';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http : HttpClient) { }

  // Get ALL sctivity types
  getActivityType() : Observable<ActivityType[]>{
    return this.http.get<ActivityType[]>("https://localhost:6587/api/Activity/Types")
  }
}
