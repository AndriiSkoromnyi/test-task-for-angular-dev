import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  owner: {
    html_url: string;
    avatar_url?: string;
    login?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  /**
   * Get user's public repositories
   * @param username GitHub username
   */
  getUserRepositories(username: string): Observable<GithubRepository[]> {
    return this.http.get<GithubRepository[]>(`${this.apiUrl}/users/${username}/repos?sort=updated&per_page=10`);
  }
}
