import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs';
import { countryInfo } from '../models/api/country-info';
import { Weather } from '../models/api/weather';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-modal.component.html',
  styleUrl: './weather-modal.component.css'
})
export class WeatherModalComponent implements OnInit {
  @Input() country: string = "";
  @Input() city: string = "";
  @Input() modalId: string = '';
  lat: number = 0;
  lng: number =0;
  code: string = "";
  weatherinfo$: Observable<Weather> = new Observable<Weather>

  constructor(private weather : WeatherService) {}

  ngOnInit(): void {
    this.weather.getCountryInfo(this.country).subscribe(
      (countryInfo: countryInfo) => {
        this.code = countryInfo.code;
        this.lat = countryInfo.latlng[0];
        this.lng = countryInfo.latlng[1];
        //get weather for a city
        this.weatherinfo$ = this.weather.getWeather(this.city, this.code);
      }
    )
  }

}
