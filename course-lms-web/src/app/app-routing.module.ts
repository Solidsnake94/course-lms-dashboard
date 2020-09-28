import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsPageComponent } from './course/course-details-page/course-details-page.component';
import { CourseListPageComponent } from './course/course-list-page/course-list-page.component';

const routes: Routes = [
  { path: '', component: CourseListPageComponent },
  { path: ':id', component: CourseDetailsPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
