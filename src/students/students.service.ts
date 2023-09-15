import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from './student.interface';
import { isNumber } from 'class-validator';

@Injectable()
export class StudentsService {
    private students: Student[] = [
        { id: 1, firstName: 'Osama', lastName: 'Malik', contactNumber: '7088511786', contactEmail: 'itsosamamalik@gmail.com', isActive: true }
    ];

    getStudents(isActive) {
        return this.students.filter(student => student.isActive == isActive);
    }

    getStudentById(id: number) {
        const student = this.students.find(item => {
            return item.id == id;
        });
        if (student) {
            return student;
        }
        throw new HttpException(`Student with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    postStudent(student: Student) {
        // Id should be 0 
        if (student?.id != 0) {
            throw new HttpException('Bad request: Id can not be a non zero value', HttpStatus.BAD_REQUEST)
        }
        // Student can not have same email or mobile number
        let studentPresent = false;
        this.students.map((item: Student) => {
            if (item.contactEmail == student.contactEmail || item.contactNumber == student.contactNumber)
                studentPresent = true;
        });
        if (studentPresent) {
            throw new HttpException('Student with given Email or Number already exist.', HttpStatus.CONFLICT)
        }

        // Add to DB on successful addition
        student.id = this.students.length + 1;
        this.students.push(student);
        return student;
    }

    updateStudent(student: Student) {
        // Id should be 0 
        if (student?.id == 0) {
            throw new HttpException('Bad request: Id can not be zero', HttpStatus.BAD_REQUEST)
        }
        // if student found replace it
        let studentPresentIndex = null;
        this.students.map((item: Student, index) => {
            if (item.id == student.id) {
                item = student;
                studentPresentIndex = index;
            }
        });
        // if index is not number that means element does not exist so throw exception
        if (!isNumber(studentPresentIndex)) {
            throw new HttpException('Student with given id not found.', HttpStatus.CONFLICT)
        }
        // update student in array with current body
        else {
            this.students[studentPresentIndex] = student;
        }

        return student;
    }

    deleteStudent(id) {
        const student = this.students.find(item => {
            return item.id == id;
        });

        if (student) {
            student.isActive = false;
            return student;
        }

        throw new HttpException('Student with id ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
}
