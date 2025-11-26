import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { CredentialsService } from './credentials.service';

const log = new Logger('HasAccessTokenGuard');

/**
 * Guard that checks if user has an access token.
 * Redirects to login page if no token is found.
 */
@Injectable({
  providedIn: 'root',
})
export class HasAccessTokenGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const credentials = this.credentialsService.credentials;

    if (credentials && credentials.token) {
      log.debug('Access token found, allowing access');
      return true;
    }

    log.debug('No access token found, redirecting to login...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
