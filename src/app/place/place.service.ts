import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from 'src/models/place.schema';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { Favorite } from 'src/models/favorite.schema';
import { Rating } from 'src/models/rating.schema';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly PlaceModel: Model<Place>,
    @InjectModel('Favorite')
    private readonly FavoriteModel: Model<Favorite>,
    @InjectModel('Rating') private readonly RatingModel: Model<Rating>,
    private readonly authService: AuthService,
  ) {}

  private readonly logger = new Logger(PlaceService.name);

  async getAllPlace() {
    const places = await this.PlaceModel.find().exec();
    // this.logger.debug(`[GET] All Place: ${places}`);
    return places;
  }

  async findPlaceById(id: string) {
    const places = await this.PlaceModel.findById(id).exec();
    this.logger.debug(`[GET] Place By Id: ${places}`);
    return places;
  }

  async addPlace(place: Place) {
    const newPlace = await this.PlaceModel.create(place);
    this.logger.debug(`[CREATE] Place: ${newPlace}`);
    return newPlace;
  }

  async addFavoritePlace(request: Request, placeId: string) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    const user = await this.authService.getUserInfo(request);
    console.log('placeId:', placeId);

    try {
      const newFavoritePlace = await this.FavoriteModel.create({
        userId: user.id,
        placeId: placeId,
      });
      this.logger.debug(`[CREATE] Favorite Place: ${newFavoritePlace}`);
      return newFavoritePlace;
    } catch (error) {
      this.logger.error(`[CREATE] Favorite Place Error: ${error}`);
      throw new Error(error);
    }
  }

  async findFavoritePlace(request: Request) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    const user = await this.authService.getUserInfo(request);

    const favoritePlaces = await this.FavoriteModel.find({
      userId: user.id,
    });

    const placeIds = favoritePlaces.map((place) => place.placeId);

    const places = await this.PlaceModel.find({
      _id: { $in: placeIds },
    });

    return places;
  }

  async removeFavoritePlace(request: Request, placeId: string) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    const user = await this.authService.getUserInfo(request);

    const deletedFavoritePlace = await this.FavoriteModel.findOneAndDelete({
      userId: user.id,
      placeId: placeId,
    });

    return deletedFavoritePlace;
  }

  async isFavoritePlace(request: Request, placeId: string) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    const user = await this.authService.getUserInfo(request);

    try {
      const favoritePlace = await this.FavoriteModel.findOne({
        userId: user.id,
        placeId: placeId,
      });

      if (!favoritePlace) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.logger.error(`[GET] Favorite Place Error: ${error}`);
      throw new Error(error);
    }
  }

  async addReview(
    request: Request,
    placeId: string,
    rating: number,
    review: string,
  ) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    try {
      const user = await this.authService.getUserInfo(request);
      const place = await this.PlaceModel.findById(placeId);
      if (!place) {
        throw new Error('Place not found');
      }
      const newRating = await this.RatingModel.create({
        userId: user.id,
        placeId: placeId,
        rating: rating,
        comment: review,
      });
      this.logger.debug(`[CREATE] Review: ${newRating}`);
      return newRating;
    } catch (error) {
      this.logger.error(`[CREATE] Review Error: ${error}`);
      throw new Error(error);
    }
  }

  async findReviewByPlaceId(placeId: string) {
    try {
      const Reviews = await this.RatingModel.find({
        placeId: placeId,
        deletedAt: null,
      }).exec();
      return Reviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteReviewById(request: Request, id: string) {
    try {
      // Check if user is the owner of the review
      const user = await this.authService.getUserInfo(request);
      const review = await this.RatingModel.findById(id);
      if (user.id !== review.userId) {
        throw new Error('Unauthorized');
      }

      // Delete the review
      review.deletedAt = new Date();
      await review.save();
      return review;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchPlaceByName(name: string) {
    try {
      const results = await this.PlaceModel.aggregate([
        {
          $search: {
            index: 'place',
            compound: {
              should: [
                {
                  autocomplete: {
                    query: name,
                    path: 'name',
                    fuzzy: {
                      maxEdits: 2,
                    },
                    score: { boost: { value: 3 } },
                  },
                },
                {
                  text: {
                    query: name,
                    path: 'alternativeNames',
                    fuzzy: {
                      maxEdits: 2,
                    },
                    score: { boost: { value: 2 } },
                  },
                },
              ],
            },
          },
        },
        {
          $match: {
            deletedAt: null,
          },
        },
      ]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  async calculateAverageRating(placeId: string) {
    try {
      const results = await this.RatingModel.aggregate([
        {
          $match: {
            placeId: placeId,
            deletedAt: null,
          },
        },
        {
          $group: {
            _id: '$placeId',
            averageRating: { $avg: '$rating' },
          },
        },
      ]);
      const updatedPlace = await this.PlaceModel.findByIdAndUpdate(
        placeId,
        {
          averageRating: results[0].averageRating,
        },
        { new: true },
      );
      return updatedPlace;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sumReviewsCountLastMonth(placeId: string) {
    try {
      const results = await this.RatingModel.aggregate([
        {
          $match: {
            placeId: placeId,
            deletedAt: null,
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        },
        {
          $group: {
            _id: '$placeId',
            reviewsCountLastMonth: { $sum: 1 },
          },
        },
      ]);
      const updatedPlace = await this.PlaceModel.findByIdAndUpdate(
        placeId,
        {
          reviewsCountLastMonth: results[0].reviewsCountLastMonth,
        },
        { new: true },
      );
      return updatedPlace;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPopularPlace() {
    try {
      const results = await this.RatingModel.aggregate([
        {
          $group: {
            _id: '$placeId',
            averageRating: { $avg: '$rating' },
            reviewsCountLastMonth: {
              $sum: {
                $cond: [
                  {
                    $gte: [
                      '$createdAt',
                      new Date(new Date().setMonth(new Date().getMonth() - 1)),
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            reviewsCountLastMonth: -1,
            averageRating: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

      const placeIds = results.map((result) => result._id);

      const places = await this.PlaceModel.find({
        _id: { $in: placeIds },
      });

      return places;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNearbyPlace(latitude: number, longitude: number) {
    try {
      const results = await this.PlaceModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 1000,
          },
          $limit: 10,
        },
      ]);

      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNewestPlace() {
    try {
      const places = await this.PlaceModel.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      return places;
    } catch (error) {
      throw new Error(error);
    }
  }
}
