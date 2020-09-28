export interface Course {
  id: number;
  name: string;
  status: CourseStatus;
  instructors: Instructor[];
}

export interface Instructor {
  name: string;
  image: string;
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface CourseListItem extends Course {
  imageUrl: string;
}

export interface CourseDetails extends Course {
  images: string[];
}
