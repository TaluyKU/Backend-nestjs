import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from 'src/models/place.schema';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  private readonly logger = new Logger(PlaceController.name);

  @Get('/find/:id')
  findPlaceId(@Param('id') id: string) {
    const foundPlace = this.placeService.findPlaceById(id);
    return foundPlace;
  }

  @Get('/all')
  getAllPlace() {
    const allPlace = this.placeService.getAllPlace();
    return allPlace;
  }

  @Post('/create')
  createPlace(@Body() newPlace: Place) {
    const createdPlace = this.placeService.createPlace(newPlace);
    return createdPlace;
  }

  @Post('/favorite')
  addFavoritePlace(@Req() req: Request, @Body() place: { placeId: string }) {
    const newFavoritePlace = this.placeService.addFavoritePlace(
      req,
      place.placeId,
    );
    return newFavoritePlace;
  }

  @Get('/all_favorite')
  findFavoritePlace(@Req() req: Request) {
    const favoritePlaces = this.placeService.findFavoritePlace(req);
    return favoritePlaces;
  }

  @Post('/unfavorite')
  removeFavoritePlace(@Req() req: Request, @Body() place: { placeId: string }) {
    const removedFavoritePlace = this.placeService.removeFavoritePlace(
      req,
      place.placeId,
    );
    return removedFavoritePlace;
  }

  @Get('/is_favorite/:placeId')
  isFavoritePlace(@Req() req: Request, @Param() place: { placeId: string }) {
    const isFavorite = this.placeService.isFavoritePlace(req, place.placeId);
    this.logger.debug(`[GET] isFavorite: ${isFavorite}`);
    return isFavorite;
  }

  @Post('/review/post')
  addReview(
    @Req() req: Request,
    @Body() review: { placeId: string; rating: number; review: string },
  ) {
    const newReview = this.placeService.addReview(
      req,
      review.placeId,
      review.rating,
      review.review,
    );
    return newReview;
  }

  @Post('/review/delete')
  deleteReview(@Req() req: Request, @Body() review: { reviewId: string }) {
    const deletedReview = this.placeService.deleteReviewById(
      req,
      review.reviewId,
    );
    return deletedReview;
  }

  @Get('/review/:placeId')
  async findReview(@Param() place: { placeId: string }) {
    const reviews = await this.placeService.findReviewByPlaceId(place.placeId);
    this.logger.debug(`[GET] reviews: ${place.placeId} ${reviews}`);
    return reviews;
  }

  @Get('/review/summary/:placeId')
  getRatingSummary(@Param('placeId') placeId: string) {
    const ratingSummary = this.placeService.getRatingSummary(placeId);
    return ratingSummary;
  }

  @Get('/search/:query')
  searchPlace(@Param('query') query: string) {
    const foundPlace = this.placeService.searchPlaceByName(query);
    return foundPlace;
  }

  @Get('/popular')
  getPopularPlace() {
    const popularPlaces = this.placeService.getPopularPlace();
    return popularPlaces;
  }

  @Get('/nearby/:lat/:long')
  getNearbyPlace(@Param('lat') lat: number, @Param('long') long: number) {
    const nearbyPlaces = this.placeService.getNearbyPlace(lat, long);
    return nearbyPlaces;
  }

  @Get('/newest')
  getNewestPlace() {
    const newestPlaces = this.placeService.getNewestPlace();
    return newestPlaces;
  }
}
