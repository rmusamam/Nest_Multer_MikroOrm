import { Module } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CourseMaterialController } from './course-material.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CourseMaterial } from './entities/course-material.entity';
import { Course } from '../course/entities/course.entity';
import { CourseMaterialAttachment } from './entities/course-material-attachment.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Course, CourseMaterial,CourseMaterialAttachment])],
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService]
})
export class CourseMaterialModule {}
