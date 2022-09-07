import { IsBoolean, IsNotEmpty, IsString } from "class-validator"
import { v4 as uuidv4 } from 'uuid';

export class CreateCourseDto {
    @IsNotEmpty()
    uuid:uuidv4

    @IsNotEmpty()
    @IsString()
    courseName:string
    
    @IsNotEmpty()
    @IsString()
    description:string

    @IsBoolean()
    recordStatus:boolean

    @IsNotEmpty()
    @IsString()
    created_by:string

    @IsNotEmpty()
    @IsString()
    endingDate:Date

    startingDate!: Date;

    createdAt:Date;

    updatedAt!: Date;

    deletedAt!: Date;

}
