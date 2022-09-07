import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { CreateCourseMaterialDto } from './dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course-material.dto';
import { CourseMaterial } from './entities/course-material.entity';
import { v4 as uuidv4 } from 'uuid';
import { CourseMaterialAttachment } from './entities/course-material-attachment.entity';

@Injectable()
export class CourseMaterialService {
  constructor(
    @InjectRepository(CourseMaterial)
    private courseMaterialRepository: EntityRepository<CourseMaterial>,
    @InjectRepository(CourseMaterialAttachment)
    private courseMaterialAttachmentRepository: EntityRepository<CourseMaterialAttachment>,
  ) {}

  async create(
    createCourseMaterialDto: CreateCourseMaterialDto,
    @UploadedFile() file,
  ) {
    try {
      //this function will generate uuid
      createCourseMaterialDto.uuid = uuidv4();
      //these are generating Date for date field
      createCourseMaterialDto.createdAt = new Date();
      createCourseMaterialDto.updatedAt = new Date();
      createCourseMaterialDto.deletedAt = new Date();

      // this will create the data
      const course = this.courseMaterialRepository.create(
        createCourseMaterialDto,
      );

      // this will save the data
      const createdCourse = await this.courseMaterialRepository
        .persist(course)
        .flush();

      if (file) {
        const courseAttachment: object = {
          uuid: uuidv4(),
          fileName: file.originalname,
          filePath: file.path,
          recordStatus: true,
          createdAt: new Date(),
          createdBy: createCourseMaterialDto.createdBy,
          updatedAt: new Date(),
          deletedAt: new Date(),
          courseMaterial: course.id,
        };
        console.log('this is course object : ', courseAttachment);

        this.createForFile(courseAttachment);
      }
      return course;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a incorrect attempt to access data',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async createForFile(file) {
    try{
      const courseFile = this.courseMaterialAttachmentRepository.create(file);

      const courseSave = await this.courseMaterialAttachmentRepository
        .persist(courseFile)
        .flush();

      return courseSave;
    }catch{
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:'Access denied'
      },HttpStatus.UNAUTHORIZED
      )
    }
  }

  async findAll() {
    try {
      const courseMaterial = await this.courseMaterialRepository.findAll();
      const courseMaterialAttachment =
        await this.courseMaterialAttachmentRepository.findAll();

      return courseMaterial;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a incorrect attempt to access data',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findOne(id: uuidv4) {
    try{
      
    console.log('this is uuid : ', id);
    const search = await this.courseMaterialRepository.findOneOrFail({
      createdBy: id,
    });
    console.log(search);

    return `This action returns a #${search} course`;
    }catch{
      throw new HttpException("Access denied",HttpStatus.FORBIDDEN)
    }
  }

  async update(id: uuidv4, updateCourseMaterialDto: UpdateCourseMaterialDto) {
  try{
    
    updateCourseMaterialDto.updatedAt = new Date();
    console.log(updateCourseMaterialDto);
    const findCourse = await this.courseMaterialRepository.findOne({
      uuid: id,
    });

    wrap(findCourse).assign(updateCourseMaterialDto);
    console.log('this is find Query :', findCourse);

    await this.courseMaterialRepository.persist(findCourse).flush();

    return `This action updates a #${findCourse} course`;

  }catch{
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a incorrect attempt to access data',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  }

  async remove(id: uuidv4) {
    try{
      
    const findCourse = await this.courseMaterialRepository.findOne({
      uuid: id,
    });
    findCourse.recordStatus = false;
    findCourse.updatedAt = new Date();
    await this.courseMaterialRepository.persist(findCourse).flush();
    const querySearcher=String(findCourse.id);
    
    const courseMaterialAttachment=await this.courseMaterialAttachmentRepository.findOne({courseMaterial:querySearcher})
    courseMaterialAttachment.recordStatus = false;
    await this.courseMaterialAttachmentRepository.persist(courseMaterialAttachment).flush();



    return `This action updates a #${findCourse} course`;
 
    }
   catch{
    throw new HttpException({
      status:HttpStatus.BAD_REQUEST,
      error:'Access Denied',
    },HttpStatus.BAD_REQUEST);
   }
}
}