import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { v4 as uuidv4 } from 'uuid';

// import { EntityRepository } from 'mikro-orm';


@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: EntityRepository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    createCourseDto.uuid=uuidv4()
    createCourseDto.startingDate=new Date()
    createCourseDto.createdAt=new Date()
    createCourseDto.updatedAt=new Date()
    createCourseDto.deletedAt=new Date()

    const course = this.courseRepository.create(createCourseDto);
    // // wrap(book.author, true).__initialized = true;
    await this.courseRepository.persist(course).flush();

    // return course;

    return `This action adds a new #${course}`;
  }

  async findAll() {

    return await this.courseRepository.findAll();

    // return `This action returns all course`;
  }

  async findOne(id: number) {
    console.log('this is uuid : ',id)
    const search=await this.courseRepository.findOneOrFail({id});
    console.log(search);
    
    return `This action returns a #${search} course`;
  }

  async update(id: uuidv4, updateCourseDto: UpdateCourseDto) {

    updateCourseDto.updatedAt= new Date()
    console.log(updateCourseDto)
    const findCourse = await this.courseRepository.findOne({uuid:id});

    wrap(findCourse).assign(updateCourseDto);
    console.log('this is find Query :',findCourse)

    await this.courseRepository.persist(findCourse).flush();

    return `This action updates a #${findCourse} course`;
  }

  async remove(id: uuidv4) {

    const findCourse = await this.courseRepository.nativeDelete({uuid:id});

    console.log('this is find Query :',findCourse)

    // await this.courseRepository.persist(findCourse).remove();
    // await this.courseRepository.persist(findCourse).remove();


    return `This action removes a #${id} course`;
  }
}
