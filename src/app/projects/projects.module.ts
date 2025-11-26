import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AddUsernamePipe } from './add-username.pipe';
import { ProjectsHeaderComponent } from './components/projects-header/projects-header.component';
import { ProjectsIntroComponent } from './components/projects-intro/projects-intro.component';
import { ProjectsCarouselComponent } from './components/projects-carousel/projects-carousel.component';
import { ProjectsGridComponent } from './components/projects-grid/projects-grid.component';
import { ProjectsWeatherComponent } from './components/projects-weather/projects-weather.component';
import { ProjectsFooterComponent } from './components/projects-footer/projects-footer.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    AddUsernamePipe,
    ProjectsHeaderComponent,
    ProjectsIntroComponent,
    ProjectsCarouselComponent,
    ProjectsGridComponent,
    ProjectsWeatherComponent,
    ProjectsFooterComponent,
  ],
  imports: [CommonModule, TranslateModule, ProjectsRoutingModule],
  exports: [
    ProjectsComponent,
    AddUsernamePipe,
    ProjectsHeaderComponent,
    ProjectsIntroComponent,
    ProjectsCarouselComponent,
    ProjectsGridComponent,
    ProjectsWeatherComponent,
    ProjectsFooterComponent,
  ],
})
export class ProjectsModule {}
