import { Folder } from "../entities/folder.entity";
import {v4 as uuidv4} from 'uuid'
import { Course } from "./../../course/entities/course.entity";


export class CreateCourseMaterialDto {
  
    uuid!: uuidv4;
  
    description!: string;
  
    course!: string;
  
    folder!: string;

    recordStatus: boolean = true;
    
    createdBy!: string;

    createdAt:Date

    updatedAt:Date

    deletedAt:Date
  
}
