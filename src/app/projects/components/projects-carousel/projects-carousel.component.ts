import { Component, Input } from '@angular/core';
import { GithubRepository } from '../../github.service';

@Component({
  selector: 'app-projects-carousel',
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss'],
})
export class ProjectsCarouselComponent {
  @Input() featuredRepositories: GithubRepository[] = [];
  currentSlide = 0;

  setSlide(index: number): void {
    this.currentSlide = index;
  }
}
