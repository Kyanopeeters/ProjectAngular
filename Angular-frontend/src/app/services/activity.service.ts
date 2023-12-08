import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityType } from '../models/api/activity-type';
import { ActivityForm } from '../models/api/create-activity';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/api/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  api_url = environment.api_url;

  constructor(private http : HttpClient) { }

    // Get activity by ID

  getActivityById(id : number) : Observable<Activity> {
    return this.http.get<Activity>(this.api_url + "/Activity/" + id);
  }

  // Get ALL activity types
  getActivityType() : Observable<ActivityType[]>{
    return this.http.get<ActivityType[]>(this.api_url + "/Activity/Types")
  }

  // POST activity
  createActivity(newActivity: ActivityForm) : Observable<ActivityForm>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<ActivityForm>(this.api_url + "/Activity/create" , newActivity , {headers: headers});
  }

//   Delete activity
  deleteActivity(id: number): Observable<Activity>{
    return this.http.delete<Activity> (this.api_url + "/Activity/" + id)};

  //PUT Activity 
  updateActivityById(id : number, activity:Activity) : Observable<Activity> {
    return this.http.put <Activity> (this.api_url + "/Activity/" + id, activity);
  }

}