import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from './student.interface';

@Injectable()
export class StudentsService {
    private students: Student[] = [
        { id: 1, firstName: 'Osama', lastName: 'Malik', contactNumber: '7088511786', contactEmail: 'itsosamamalik@gmail.com', isActive: true }
    ];

    getStudents() {
        return this.students;
    }

    getStudentById(id: number) {
        return this.students.find(item => {
            return item.id == id;
        });
    }

    postStudent(student: Student) {
        // Id should be 0 
        if(student?.id != 0){
            throw new HttpException('Bad request: Id can not be a non zero value', HttpStatus.BAD_REQUEST)
        }
        // Student can not have same email or mobile number
        let studentPresent = false;
        this.students.map((item: Student) => {
            if(item.contactEmail == student.contactEmail || item.contactNumber == student.contactNumber)
                studentPresent = true;
        });
        if(studentPresent){
            throw new HttpException('Student with given Email or Number already exist.', HttpStatus.CONFLICT)
        }

        // Add to DB on successful addition
        student.id = this.students.length+1;
        this.students.push(student);
        return student;
    }
}
