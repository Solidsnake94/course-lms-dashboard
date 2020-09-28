import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { CourseApiService } from '../course-api.service';
import { CourseListItem } from '../course.model';

enum CourseFilterType {
  NAME = 'NAME',
  STATUS = 'STATUS',
  INSTRUCTOR = 'INSTRUCTOR',
}

export type CourseFilterPredicate = (
  course: CourseListItem,
  searchValue: string,
) => boolean;

@Component({
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.scss'],
})
export class CourseListPageComponent implements OnInit, OnDestroy {
  CourseFilterType = CourseFilterType;

  filterTypeControl = new FormControl(CourseFilterType.STATUS);
  filterSearchControl = new FormControl('');
  visibleCourses$: Observable<CourseListItem[]>;

  private destroy$ = new Subject<void>();
  private allCourses$ = this.courseApi.getAll();

  constructor(private courseApi: CourseApiService) {}

  ngOnInit(): void {
    const filterType$: Observable<CourseFilterType> = this.filterTypeControl.valueChanges.pipe(
      startWith(CourseFilterType.STATUS),
    );
    const filterSearch$: Observable<string> = this.filterSearchControl.valueChanges.pipe(
      startWith(''),
    );
    this.visibleCourses$ = combineLatest([
      this.allCourses$,
      filterType$,
      filterSearch$,
    ]).pipe(
      map((dependencies) => this.filterCourses(...dependencies)),
      startWith([]),
      takeUntil(this.destroy$),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFilters(): void {
    this.filterSearchControl.reset();
  }

  private filterCourses(
    courses: CourseListItem[],
    type: CourseFilterType | undefined,
    searchValue: string,
  ): CourseListItem[] {
    if (!type || !searchValue) {
      return courses;
    }
    switch (type) {
      case CourseFilterType.INSTRUCTOR:
        return courses.filter((c) =>
          this.filterByInstructorPredicate(c, searchValue),
        );
      case CourseFilterType.NAME:
        return courses.filter((c) =>
          this.filterByNamePredicate(c, searchValue),
        );
      case CourseFilterType.STATUS:
        return courses.filter((c) =>
          this.filterByStatusPredicate(c, searchValue),
        );

      default:
        return courses;
    }
  }

  private filterByStatusPredicate: CourseFilterPredicate = (
    course,
    searchValue,
  ) => course.status.toLowerCase().includes(searchValue.toLowerCase());

  private filterByInstructorPredicate: CourseFilterPredicate = (
    course,
    searchValue,
  ) =>
    course.instructors
      .map((i) => i.name.toLowerCase())
      .includes(searchValue.toLowerCase());

  private filterByNamePredicate: CourseFilterPredicate = (
    course,
    searchValue,
  ) => course.name.toLowerCase().includes(searchValue.toLowerCase());
}
