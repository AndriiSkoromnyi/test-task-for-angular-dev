import { Pipe, PipeTransform } from '@angular/core';
import { CredentialsService } from '@app/auth';

/**
 * Pipe that appends the current username to the provided text.
 * Usage: {{ 'Some text' | addUsername }}
 * Output: 'Some text - username'
 */
@Pipe({
  name: 'addUsername',
})
export class AddUsernamePipe implements PipeTransform {
  constructor(private credentialsService: CredentialsService) {}

  transform(value: string): string {
    const credentials = this.credentialsService.credentials;
    const username = credentials ? credentials.username : 'Guest';
    return `${value} - ${username}`;
  }
}
