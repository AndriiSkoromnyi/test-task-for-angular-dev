import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService, WeatherData } from './weather.service';
import { GithubService, GithubRepository } from './github.service';
import { CredentialsService, AuthenticationService } from '@app/auth';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  weatherData: WeatherData | null = null;
  isLoadingWeather = false;

  repositories: GithubRepository[] = [];
  featuredRepositories: GithubRepository[] = [];
  isLoadingRepos = false;
  githubProfileUrl: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private githubService: GithubService,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWeatherData();
    this.loadGithubRepositories();
  }

  logout(): void {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  loadGithubRepositories(): void {
    this.isLoadingRepos = true;

    const credentials = this.credentialsService.credentials;
    const username = credentials?.username || 'angular';

    this.githubService
      .getUserRepositories(username)
      .pipe(
        finalize(() => {
          this.isLoadingRepos = false;
        })
      )
      .subscribe(
        (repos) => {
          const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

          if (sortedRepos.length > 0) {
            this.githubProfileUrl = sortedRepos[0].owner.html_url;
          }

          this.featuredRepositories = sortedRepos.slice(0, 4);
          this.repositories = sortedRepos.slice(0, 6);
        },
        (error) => {
          console.error('GitHub API error:', error);
          const mock = this.getMockRepositories();
          this.featuredRepositories = mock.slice(0, 4);
          this.repositories = mock.slice(0, 6);
        }
      );
  }

  loadWeatherData(): void {
    this.isLoadingWeather = true;

    this.weatherService
      .getWeatherByCoordinates(44.34, 10.99)
      .pipe(
        finalize(() => {
          this.isLoadingWeather = false;
        })
      )
      .subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.error('Weather API error:', error);
          this.weatherData = this.getMockWeatherData();
        }
      );
  }

  private getMockRepositories(): GithubRepository[] {
    return [
      {
        id: 1,
        name: 'angular',
        full_name: 'angular/angular',
        description: "The modern web developer's platform",
        html_url: 'https://github.com/angular/angular',
        stargazers_count: 95000,
        forks_count: 25000,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/angular' },
      },
      {
        id: 2,
        name: 'angular-cli',
        full_name: 'angular/angular-cli',
        description: 'CLI tool for Angular',
        html_url: 'https://github.com/angular/angular-cli',
        stargazers_count: 26000,
        forks_count: 12000,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/angular' },
      },
      {
        id: 3,
        name: 'material2',
        full_name: 'angular/material2',
        description: 'Material Design components for Angular',
        html_url: 'https://github.com/angular/material2',
        stargazers_count: 24000,
        forks_count: 6500,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/angular' },
      },
      {
        id: 4,
        name: 'rxjs',
        full_name: 'ReactiveX/rxjs',
        description: 'Reactive Extensions for JavaScript',
        html_url: 'https://github.com/ReactiveX/rxjs',
        stargazers_count: 30000,
        forks_count: 3000,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/ReactiveX' },
      },
      {
        id: 5,
        name: 'ngrx',
        full_name: 'ngrx/platform',
        description: 'Reactive State for Angular',
        html_url: 'https://github.com/ngrx/platform',
        stargazers_count: 8000,
        forks_count: 2000,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/ngrx' },
      },
      {
        id: 6,
        name: 'typescript',
        full_name: 'microsoft/TypeScript',
        description: 'TypeScript is a superset of JavaScript',
        html_url: 'https://github.com/microsoft/TypeScript',
        stargazers_count: 99000,
        forks_count: 12000,
        language: 'TypeScript',
        updated_at: '2024-01-01T00:00:00Z',
        owner: { html_url: 'https://github.com/microsoft' },
      },
    ];
  }

  private getMockWeatherData(): WeatherData {
    return {
      coord: { lon: 10.99, lat: 44.34 },
      weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
      base: 'stations',
      main: {
        temp: 298.48,
        feels_like: 298.74,
        temp_min: 297.56,
        temp_max: 300.05,
        pressure: 1015,
        humidity: 64,
        sea_level: 1015,
        grnd_level: 933,
      },
      visibility: 10000,
      wind: { speed: 0.62, deg: 349, gust: 1.18 },
      rain: { '1h': 3.16 },
      clouds: { all: 100 },
      dt: 1661870592,
      sys: { type: 2, id: 2075663, country: 'IT', sunrise: 1661834187, sunset: 1661882248 },
      timezone: 7200,
      id: 3163858,
      name: 'Zocca',
      cod: 200,
    };
  }
}
