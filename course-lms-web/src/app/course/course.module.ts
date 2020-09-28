import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListPageComponent } from './course-list-page/course-list-page.component';
import { CourseDetailsPageComponent } from './course-details-page/course-details-page.component';

const material = [
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatChipsModule,
];

@NgModule({
  declarations: [
    CourseListComponent,
    CourseListPageComponent,
    CourseDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ...material,
    ReactiveFormsModule,
  ],
})
export class CourseModule {}
