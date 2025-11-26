import { Component, Input } from '@angular/core';
import { GithubRepository } from '../../github.service';

@Component({
  selector: 'app-projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss'],
})
export class ProjectsGridComponent {
  @Input() repositories: GithubRepository[] = [];
  @Input() isLoading = false;
}
