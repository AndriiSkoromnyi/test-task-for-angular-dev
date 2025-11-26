import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasAccessTokenGuard } from '@app/auth';

const routes: Routes = [
  // Lazy-loaded projects module
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule),
    canActivate: [HasAccessTokenGuard],
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
