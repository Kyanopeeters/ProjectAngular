import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityType } from '../models/api/activity-type';
import { ActivityForm } from '../models/api/create-activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  api_url = environment.api_url;

  constructor(private http : HttpClient) { }

  // Get ALL activity types
  getActivityType() : Observable<ActivityType[]>{
    return this.http.get<ActivityType[]>( this.api_url + "/Activity/Types")
  }

  // POST activity
  createActivity(newActivity: ActivityForm) : Observable<ActivityForm>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<ActivityForm>(this.api_url + "/Activity/create" , newActivity , {headers: headers});
  }
}
