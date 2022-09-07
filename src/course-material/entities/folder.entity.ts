import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Course } from './../../course/entities/course.entity';
import { User } from './user.entity';

@Entity()
export class Folder {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' })
  uuid!: string;

  @Property({ columnType: 'text' })
  folderName!: string;

  @ManyToOne({ entity: () => User })
  teacher!: User;

  @ManyToOne({ entity: () => Course })
  course!: Course;

  @Property({ default: true })
  recordStatus: boolean = true;

  @Property({ columnType: 'date' })
  createdAt!: string;

  @Property({ columnType: 'text' })
  createdBy!: string;

  @Property({ columnType: 'date' })
  updatedAt!: string;

  @Property({ columnType: 'date' })
  deletedAt!: string;

}
