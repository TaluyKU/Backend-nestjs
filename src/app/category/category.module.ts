import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongodbService } from 'src/app/mongodb/mongodb.service';
import { MongodbModule } from 'src/app/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
