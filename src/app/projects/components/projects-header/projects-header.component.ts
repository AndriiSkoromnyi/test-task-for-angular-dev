import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.scss'],
})
export class ProjectsHeaderComponent {
  @Input() githubProfileUrl: string | null = null;
  @Output() logout = new EventEmitter<void>();

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
