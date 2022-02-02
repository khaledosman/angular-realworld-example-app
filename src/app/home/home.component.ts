import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ArticleListConfig, GpsLocationService, TagsService, UserService, WeatherService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private gpsLocationService: GpsLocationService,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) { }

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;
  weatherData = [];
  weather: Observable<any>;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
        this.cd.markForCheck();
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
      this.cd.markForCheck();
    });


    this.weather = of(this.weatherData);
    this.gpsLocationService.getPosition().then(pos => {
        console.log(pos);
        this.weatherService.getWeather(pos.lng, pos.lat).subscribe(data => {
          const weatherData = {
            name: data.weather[0].main,
            temp: data.main.temp,
          };
          console.log(weatherData);
          this.weatherData.forEach((val, index) => {
            this.weatherData.splice(index, 1);
          });
          this.weatherData.push(weatherData.name);
          this.weatherData.push(weatherData.temp + ' C');
          this.cdr.detectChanges();
        });
    });
  }

  trackByFn(index, item) {
    return index;
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
