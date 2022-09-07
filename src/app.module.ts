import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseMaterialModule } from './course-material/course-material.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [CourseModule,MikroOrmModule.forRoot({
    type: 'postgresql',
    host: 'tft-lms-dev.postgres.database.azure.com',
    port: 5432,
    user: 'tft_admin',
    password: '5bpGF2pGYZB6wTs',
    dbName: 'tft_lms',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    driverOptions: {
      connection: {
        ssl: true
      }
    },
    // debug: true,
    // loadStrategy: LoadStrategy.JOINED,
    metadataProvider: TsMorphMetadataProvider,
  }), CourseMaterialModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
