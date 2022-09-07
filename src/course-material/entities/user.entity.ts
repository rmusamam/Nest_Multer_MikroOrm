import { Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' })
  uuid!: string;

  @Property({ columnType: 'text' })
  tftId!: string;

  @Property({ columnType: 'text' })
  fullname!: string;

  @Property({ columnType: 'text' })
  fathername!: string;

  @Property({ columnType: 'date' })
  dob!: string;

  @Property({ length: 15 })
  phone!: string;

  @Property({ length: 30 })
  email!: string;

  @Property({ columnType: 'uuid' })
  password!: string;

  @Property({ length: 6 })
  gender!: string;

  @Property()
  status!: boolean;

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
