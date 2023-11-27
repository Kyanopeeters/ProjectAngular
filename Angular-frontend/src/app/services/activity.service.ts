import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityType } from '../models/api/activityType';
import { ActivityForm } from '../models/api/createActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http : HttpClient) { }

  // Get ALL sctivity types
  getActivityType() : Observable<ActivityType[]>{
    return this.http.get<ActivityType[]>("https://localhost:6587/api/Activity/Types")
  }

  // POST activity
  createActivity(newActivity: ActivityForm) : Observable<ActivityForm>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<ActivityForm>("https://localhost:6587/api/Activity/create" , newActivity , {headers: headers});
  }
}
