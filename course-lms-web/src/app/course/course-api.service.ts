import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { CourseListItem, CourseDetails } from './course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  resource = `${environment.api}/courses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseListItem[]> {
    return this.http.get<CourseListItem[]>(this.resource);
  }

  getDetails(courseId: string): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.resource}/${courseId}`);
  }
}
