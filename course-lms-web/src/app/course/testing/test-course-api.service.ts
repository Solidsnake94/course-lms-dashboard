import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseApiService } from '../course-api.service';
import { CourseDetails, CourseListItem } from '../course.model';
import { getTestCourseDetail, getTestCourseListItems } from './test-courses';
import { asyncData } from './async-helpers';

@Injectable()
export class TestCourseApiService extends CourseApiService {
  resource = '';

  courseListItems = getTestCourseListItems();
  courseDetail = getTestCourseDetail();

  getAll(): Observable<CourseListItem[]> {
    return asyncData(this.courseListItems);
  }

  getDetails(courseId: string): Observable<CourseDetails> {
    return asyncData(this.courseDetail);
  }
}
