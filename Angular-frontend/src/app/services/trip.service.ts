import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/trip';
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

  createTrip(newTrip: Trip): Observable<Trip>{
    return this.http.post<Trip>("https://localhost:6587/api/Trip" , newTrip)
  }

  getTripTypes(): Observable<TripType[]>
  {
    return this.http.get<TripType[]>("https://localhost:6587/api/TripTypes/")
  }

  updateTripById(id : number, trip:Trip) : Observable<Trip> {
    return this.http.put <Trip> ("https://localhost:6587/api/Trip/" + id, trip);
  }
}
