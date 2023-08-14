import { IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber } from "class-validator";

export class Student {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    @IsNotEmpty()
    firstName: string;
    lastName: string;
    @IsNotEmpty()
    @IsMobilePhone()
    contactNumber: string;
    @IsNotEmpty()
    @IsEmail()
    contactEmail: string;
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}