import { CourseMaterial } from '../entities/course-material.entity';



export class CreateCourseMaterialAttachmentDto {
  id!: number;

  uuid!: string;

  fileName!: string;

  filePath!: string;

  courseMaterial!: CourseMaterial;

  recordStatus: boolean = true;

  createdAt!: string;

  createdBy!: string;

  updatedAt!: string;

  deletedAt!: string;
}
