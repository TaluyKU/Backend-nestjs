import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
