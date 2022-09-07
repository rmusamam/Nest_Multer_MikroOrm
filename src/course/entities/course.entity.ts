import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Course {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  courseName!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Property()
  recordStatus!: boolean;

  @Property({ columnType: 'text' })
  createdBy!: string;

  @Property({ length: 6, defaultRaw: `now()` })
  startingDate!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  deletedAt!: Date;

  @Property({ length: 6 })
  endingDate!: Date;

  @Property({ columnType: 'uuid' })
  uuid!: string;

}
