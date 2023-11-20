import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/api/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http : HttpClient) { }

    //get ALL countries
    getCountries() : Observable<Country[]>{
      return this.http.get<Country[]>("https://localhost:6587/api/Country");
    }
}
