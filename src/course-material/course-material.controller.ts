import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CreateCourseMaterialDto } from './dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course-material.dto';
import { v4 as uuidv4 } from 'uuid';

import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";

@Controller('course-material')
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @Post()
  @UseInterceptors(FileInterceptor('filePath', {
    storage: diskStorage({
      destination: './assets/courseMaterialAttachment',
      filename: (req, file, callBack) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
        const extension = path.parse(file.originalname).ext;
        callBack(null, `${fileName}${extension}`)
      }
    }),
  }))
  create(@Body() createCourseMaterialDto: CreateCourseMaterialDto,@UploadedFile() file) {
    return this.courseMaterialService.create(createCourseMaterialDto,file)
  }

  @Get()
  findAll() {
    return this.courseMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: uuidv4) {
    return this.courseMaterialService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: uuidv4, @Body() updateCourseMaterialDto: UpdateCourseMaterialDto) {
    return this.courseMaterialService.update(id, updateCourseMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: uuidv4) {
    return this.courseMaterialService.remove(id);
  }
}
