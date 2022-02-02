import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient
  ) {}

  getWeather(longitude, latitude): Observable<any>
  {
    const apiKey = '7d8e907eb21852f74b48f2ae29c78f5f';
    const url = `https://cors-anywhere.herokuapp.com/`
      + `https://api.openweathermap.org/data/2.5/weather`
      + `?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`;
    return this.http.get(url);
  }
}
