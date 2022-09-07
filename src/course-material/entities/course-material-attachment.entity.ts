import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CourseMaterial } from './course-material.entity';

@Entity()
export class CourseMaterialAttachment {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' })
  uuid!: string;

  @Property({ columnType: 'text' })
  fileName!: string;

  @Property({ columnType: 'text' })
  filePath!: string;

  @ManyToOne({ entity: () => CourseMaterial })
  courseMaterial!: CourseMaterial;

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
