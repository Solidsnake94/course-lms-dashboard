import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getAll(): any[] {
    return this.coursesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.coursesService.getById(id);
  }
}
