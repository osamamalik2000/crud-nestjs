import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { Student } from './student.interface';
import { StudentsService } from './students.service';
import { StudentsGuard } from './students.guard';

@Controller('students')
@UseGuards(StudentsGuard)
export class StudentsController {

    constructor(private studentService: StudentsService) { }

    @Get('')
    getStudents(@Query('isActive', ParseBoolPipe) isActive: boolean) {
        return this.studentService.getStudents(isActive);
    }

    // ParseIntPipe: Example of query, parameters validation
    @Get(':id')
    getStudentById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        res.send(this.studentService.getStudentById(id));
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createStudent(@Body() student: Student, @Res() res: Response) {
        res.send(this.studentService.postStudent(student))
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    deleteStudent(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        res.send(this.studentService.deleteStudent(id))
    }

}
