import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Trip } from '../models/api/trip';
import { TripForm } from '../models/api/createTrip'
import { TripType } from '../models/api/trip-type';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http : HttpClient) { }

  getPublicTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>("https://localhost:6587/api/Trip");
  }

  getMyTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>("https://localhost:6587/api/Trip/user")
  }

  getTripById(id : number) : Observable<Trip> {
    return this.http.get<Trip>("https://localhost:6587/api/Trip/" + id);
  }

  createTrip(newTrip: TripForm): Observable<TripForm>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<TripForm>("https://localhost:6587/api/Trip/create" , newTrip , {headers: headers})
  }

  getTripTypes(): Observable<TripType[]>
  {
    return this.http.get<TripType[]>("https://localhost:6587/api/TripTypes/")
  }

  updateTripById(id : number, trip:Trip) : Observable<Trip> {
    return this.http.put <Trip> ("https://localhost:6587/api/Trip/" + id, trip);
  }

  deleteTrip(id: number): Observable<Trip>{
    return this.http.delete<Trip> ("https://localhost:6587/api/Trip/" + id)
  }

  searchTrip(searchstring: string): Observable<Trip[]> {
    return this.http.get<Trip[]>("https://localhost:6587/api/Trip/search?Name=" + searchstring)
  }
}
