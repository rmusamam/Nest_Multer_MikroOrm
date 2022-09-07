import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Course } from '../../course/entities/course.entity';
import { Folder } from './folder.entity';

@Entity()
export class CourseMaterial {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' }) 
  uuid!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @ManyToOne({ entity: () => Course })
  course!: Course;

  @ManyToOne({ entity: () => Folder })
  folder!: Folder;

  @Property({ default: true })
  recordStatus: boolean = true;

  @Property({ columnType: 'date', defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ columnType: 'text' })
  createdBy!: string;

  @Property({ columnType: 'date',defaultRaw: `now()` })
  updatedAt!: Date;

  @Property({ columnType: 'date',defaultRaw: `now()` })
  deletedAt!: Date;

}
