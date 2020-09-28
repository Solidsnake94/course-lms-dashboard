import { Component, OnInit } from '@angular/core';
import { CourseDetails, CourseStatus } from '../course.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseApiService } from '../course-api.service';

@Component({
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss'],
})
export class CourseDetailsPageComponent implements OnInit {
  CourseStatus = CourseStatus;
  courseDetails$: Observable<CourseDetails>;
  readonly = true;

  constructor(
    private route: ActivatedRoute,
    private courseApi: CourseApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseDetails$ = this.courseApi.getDetails(id);
  }
}
