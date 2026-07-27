import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/repositories/base-abstract.repository';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoryDocument> {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {
    super(categoryModel);
  }
}
