import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { CourseListPageComponent } from './course-list-page.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseApiService } from '../course-api.service';
import { getTestCourseListItems } from '../testing/test-courses';
import { asyncData } from '../testing/async-helpers';
import { TestCourseApiService } from '../testing/test-course-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseModule } from '../course.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CourseListComponent } from '../course-list/course-list.component';
import { take } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

let component: CourseListPageComponent;
let fixture: ComponentFixture<CourseListPageComponent>;

describe('CourseListPageComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CourseModule, NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA],
      });
    }),
  );

  compileAndCreate();

  tests();
});

function compileAndCreate(): void {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [{ provide: CourseApiService, useClass: TestCourseApiService }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CourseListPageComponent);
          component = fixture.componentInstance;
        });
    }),
  );
}

function tests(): void {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT have courseListItems before ngOnInit', () => {
    const courseListItemsRows = fixture.nativeElement.querySelectorAll('tr');
    expect(courseListItemsRows.length).toBe(0, 'should NOT have courseListItems before ngOnInit');
  });

  it('should NOT have courseListItems after NgOnInit', () => {
    fixture.detectChanges();
    const courseListItemsRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(courseListItemsRows.length).toBe(0, 'should NOT have courseListItems after ngOnInit');
  });

  describe('after get courseListItems', () => {
    beforeEach(
      waitForAsync(() => {
        fixture.detectChanges(); // ngOnInit
        fixture.whenStable().then(() => fixture.detectChanges());
      }),
    );

    it('should DISPLAY courseListItems', () => {
      const courseListItemsRows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(courseListItemsRows.length).toBe(2, 'should display 2 courseListItems');
    });

    describe('after setting course filter and search value ', () => {
      it('should DISPLAY filtered courseListItems', () => {
        const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
        matSelect.click();
        fixture.detectChanges();

        const matOptions = fixture.debugElement.queryAll(By.css('.mat-option'));
        expect(matOptions.length).toBe(3, 'after clicking select should have display 3 filters ');

        matOptions[1].nativeElement.click();
        fixture.detectChanges();

        const searchInput = fixture.debugElement.query(By.css('input[matInput]')).nativeElement;
        const filteredText = 'credit';
        searchInput.value = filteredText;
        searchInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const courseListItemsRows = fixture.nativeElement.querySelectorAll('tbody tr');
          expect(courseListItemsRows.length).toBe(1, 'should display 1 courseListItem');
          const listItemText: string = courseListItemsRows[0].textContent;
          expect(listItemText.toLowerCase()).toContain(filteredText);
        });
      });
    });
  });
}
