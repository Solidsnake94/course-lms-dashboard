import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  getAll(): any[] {
    return [
      {
        id: 1,
        name: 'Fundamentals of Credit',
        imageUrl: 'https://picsum.photos/100/100',
        status: 'DRAFT',
        instructors: [
          {
            name: 'Roli Jain',
            image: 'https://picsum.photos/300/300',
          },
          {
            name: 'Sebastian Taylor',
            image: 'https://picsum.photos/300/300',
          },
        ],
      },
      {
        id: 2,
        name: 'Accounting Fundamentals',
        status: 'PUBLISHED',
        imageUrl: 'https://picsum.photos/100/100',
        instructors: [
          {
            name: 'Roli Jain',
            image: 'https://picsum.photos/300/300',
          },
        ],
      },
    ];
  }

  getById(id: string) {
    return {
      id: 1,
      name: 'Fundamentals of Credit',
      images: [
        'https://picsum.photos/300/300',
        'https://picsum.photos/300/300',
        'https://picsum.photos/300/300',
      ],
      instructors: [
        {
          name: 'Roli Jain',
          image: 'https://picsum.photos/300/300',
        },
        {
          name: 'Sebastian Taylor',
          image: 'https://picsum.photos/300/300',
        },
      ],
    };
  }
}
