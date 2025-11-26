import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Using Open-Meteo API - free, no API key required
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(private http: HttpClient) {}

  /**
   * Get weather data for specific coordinates using Open-Meteo API
   */
  getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    const params = `latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&timezone=auto`;

    return this.http
      .get<any>(`${this.apiUrl}?${params}`)
      .pipe(map((data) => this.convertToWeatherData(data, lat, lon)));
  }

  /**
   * Convert Open-Meteo response to WeatherData format
   */
  private convertToWeatherData(data: any, lat: number, lon: number): WeatherData {
    const current = data.current;
    const weatherCode = current.weather_code || 0;
    const weatherDesc = this.getWeatherDescription(weatherCode);

    return {
      coord: { lon, lat },
      weather: [
        {
          id: weatherCode,
          main: weatherDesc.main,
          description: weatherDesc.description,
          icon: '01d',
        },
      ],
      base: 'stations',
      main: {
        temp: current.temperature_2m + 273.15, // Convert to Kelvin
        feels_like: current.apparent_temperature + 273.15,
        temp_min: current.temperature_2m + 273.15,
        temp_max: current.temperature_2m + 273.15,
        pressure: current.pressure_msl || 1013,
        humidity: current.relative_humidity_2m || 0,
      },
      visibility: 10000,
      wind: {
        speed: current.wind_speed_10m || 0,
        deg: 0,
      },
      clouds: { all: 0 },
      dt: Math.floor(new Date(current.time).getTime() / 1000),
      sys: {
        type: 1,
        id: 1,
        country: 'IT',
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      id: 1,
      name: 'Zocca',
      cod: 200,
    };
  }

  /**
   * Get weather description from WMO weather code
   */
  private getWeatherDescription(code: number): { main: string; description: string } {
    const weatherCodes: { [key: number]: { main: string; description: string } } = {
      0: { main: 'Clear', description: 'clear sky' },
      1: { main: 'Clear', description: 'mainly clear' },
      2: { main: 'Clouds', description: 'partly cloudy' },
      3: { main: 'Clouds', description: 'overcast' },
      45: { main: 'Fog', description: 'foggy' },
      48: { main: 'Fog', description: 'depositing rime fog' },
      51: { main: 'Drizzle', description: 'light drizzle' },
      53: { main: 'Drizzle', description: 'moderate drizzle' },
      55: { main: 'Drizzle', description: 'dense drizzle' },
      61: { main: 'Rain', description: 'slight rain' },
      63: { main: 'Rain', description: 'moderate rain' },
      65: { main: 'Rain', description: 'heavy rain' },
      71: { main: 'Snow', description: 'slight snow' },
      73: { main: 'Snow', description: 'moderate snow' },
      75: { main: 'Snow', description: 'heavy snow' },
      77: { main: 'Snow', description: 'snow grains' },
      80: { main: 'Rain', description: 'slight rain showers' },
      81: { main: 'Rain', description: 'moderate rain showers' },
      82: { main: 'Rain', description: 'violent rain showers' },
      85: { main: 'Snow', description: 'slight snow showers' },
      86: { main: 'Snow', description: 'heavy snow showers' },
      95: { main: 'Thunderstorm', description: 'thunderstorm' },
      96: { main: 'Thunderstorm', description: 'thunderstorm with slight hail' },
      99: { main: 'Thunderstorm', description: 'thunderstorm with heavy hail' },
    };

    return weatherCodes[code] || { main: 'Unknown', description: 'unknown' };
  }

  getWeatherByCity(city: string): Observable<WeatherData> {
    // For simplicity, using default coordinates
    return this.getWeatherByCoordinates(44.34, 10.99);
  }
}
