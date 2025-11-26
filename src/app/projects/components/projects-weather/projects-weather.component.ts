import { Component, Input } from '@angular/core';
import { WeatherData } from '../../weather.service';

@Component({
  selector: 'app-projects-weather',
  templateUrl: './projects-weather.component.html',
  styleUrls: ['./projects-weather.component.scss'],
})
export class ProjectsWeatherComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() isLoading = false;

  kelvinToCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }
}
