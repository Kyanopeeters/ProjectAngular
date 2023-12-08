import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/api/country';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  api_url = environment.api_url;

  constructor(private http : HttpClient) { }

    //get ALL countries
    getCountries() : Observable<Country[]>{

      return this.http.get<Country[]>(this.api_url + "/Country");
    }
}
