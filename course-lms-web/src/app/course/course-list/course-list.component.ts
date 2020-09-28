import { CourseListItem } from './../course.model';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export type CourseTableColumn = 'id' | 'image' | 'name' | 'status';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  tableColumns: CourseTableColumn[] = ['id', 'image', 'name', 'status'];

  @Input() courses: CourseListItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
