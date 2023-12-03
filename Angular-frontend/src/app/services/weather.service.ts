import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { countryInfo } from '../models/api/country-info';
import { Weather } from '../models/api/weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http : HttpClient) { }

  apikey: string = "f640269beb7bf7b00b8855c8603ac97b";
  

  // GET iso 3166 of country and lat and lang
  getCountryInfo(country: string): Observable<countryInfo> {
    return this.http.get<{ cca2: string, latlng: number[] }[]>(`https://restcountries.com/v3.1/translation/${country}?fields=cca2,latlng`)
      .pipe(
        map(response => {
          console.log(response)
          // Assuming the response has the expected structure
          const firstItem = response[0];
          console.log(firstItem)
          // Check if the structure is as expected
          if (firstItem && typeof firstItem.cca2 === 'string' && firstItem && Array.isArray(firstItem.latlng) && firstItem.latlng.length === 2) {
            return { code: firstItem.cca2, latlng: firstItem.latlng } as countryInfo;
          } else {
            throw new Error('Unexpected response structure');
          }
        }),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  // getWeather( lat: number, lng: number): Observable<Weather>{
  //   return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=&appid=${this.apikey}&units=metric`)
  //   // .pipe(
  //   //   map(response => {
    //     console.log(response)
    //     return response;
    //   }),
    //   catchError(error => {
    //     console.error('Api error:', error );
    //     throw error;
    //   })
    // );
  

// huidig weer voor een land
  // getWeather( lat: number, lng: number): Observable<Weather>{
  //   return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=nl&appid=${this.apikey}&units=metric`)
  // }

  // huidig weer voor een stad
  getWeather(city: string, countrycode: string): Observable<Weather>{
    return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countrycode}&lang=nl&appid=${this.apikey}&units=metric`)
    .pipe(
        map(response => {
          console.log(response)
          return response;
        }),
        catchError(error => {
          console.error('Api error:', error );
          throw error;
        })
      );
  }
}
