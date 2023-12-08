import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripForm } from '../models/api/create-trip'
import { TripType } from '../models/api/trip-type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  api_url = environment.api_url;

  constructor(private http : HttpClient) { }

  getPublicTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.api_url + "/Trip");
  }

  getMyTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>( this.api_url + "/Trip/user")
  }

  getTripById(id : number) : Observable<Trip> {
    return this.http.get<Trip>(this.api_url + "/Trip/" + id);
  }

  getTripByGuid(guid : string) : Observable<Trip> {
    return this.http.get<Trip>(this.api_url + "/Trip/byGuid/" + guid);
  }

  createTrip(newTrip: TripForm): Observable<TripForm>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');


    return this.http.post<TripForm>( this.api_url + "/Trip/create" , newTrip , {headers: headers})
  }

  getTripTypes(): Observable<TripType[]>
  {

    return this.http.get<TripType[]>(this.api_url + "/TripTypes/")
  }

  updateTripById(id : number, trip:Trip) : Observable<Trip> {
    return this.http.put <Trip> (this.api_url + "/Trip/" + id, trip);
  }

  deleteTrip(id: number): Observable<Trip>{
    return this.http.delete<Trip> (this.api_url + "/Trip/" + id)
  }

  searchTrip(searchstring: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.api_url + "/Trip/search?Name=" + searchstring)
  }
}
