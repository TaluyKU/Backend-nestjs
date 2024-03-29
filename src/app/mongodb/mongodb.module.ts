import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { PlaceSchema } from 'src/models/place.schema';
import { CategorySchema } from 'src/models/category.schema';
import { TransportationSchema } from 'src/models/transportation.schema';
import { FavoriteSchema } from 'src/models/favorite.schema';
import { RatingSchema } from 'src/models/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Place', schema: PlaceSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Transportation', schema: TransportationSchema },
      { name: 'Favorite', schema: FavoriteSchema },
      { name: 'Rating', schema: RatingSchema },
    ]),
  ],
  providers: [MongodbService],
  exports: [MongooseModule],
})
export class MongodbModule {}
