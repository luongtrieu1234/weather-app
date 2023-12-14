import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  static getDateString = (date: Date = new Date()): string => {
    const today = {
      day: date.getUTCDay(),
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      hour: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    };

    const days: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${Math.log10(today.hour) >= 1 ? today.hour : '0' + today.hour}:${
      Math.log10(today.minutes) >= 1 ? today.minutes : '0' + today.minutes
    } - ${days[today.day]}, ${today.date} ${months[today.month]} ${today.year
      .toString()
      .substring(2)}`;
  };

  getWeather = (city: string): Observable<any> => {
    return this.http
      .get(`${env.weatherApiURL}&q=${city}&appid=${env.apiKey}`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  };

  /**
   * @param location
   * @returns Observable<any>
   */
  getForecast = (location: { lon: number; lat: number }): Observable<any> => {
    return this.http
      .get(
        `${env.onecallApiURL}&lon=${location.lon}&lat=${location.lat}&appid=${env.apiKey}`,
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  };

  /**
   * Http Error handler
   * @param error
   * @returns Observable
   */
  private handleError(error: HttpErrorResponse) {
    error.status === 0
      ? console.error('An error occurred:', error.error)
      : console.error(
          `Api returned code ${error.status}, body was: `,
          error.error
        );
        alert("City not found!");
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}