import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { Student } from './student.interface';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService) { }

    @Get('')
    getStudents() {
        return this.studentService.getStudents();
    }

    // ParseIntPipe: Example of query, parameters validation
    @Get(':id')
    getStudentById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const student = this.studentService.getStudentById(id);

        student ? res.send(student) : res.send(`Student with id ${id} not found`);
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createStudent(@Body() student: Student, @Res() res: Response) {
        res.send(this.studentService.postStudent(student))
    }

}
