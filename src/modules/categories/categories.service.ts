import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryFilter, Types } from 'mongoose';

import { RedisService } from 'src/core/cache/redis/redis.service';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/shared/constants/paginate.constant';
import { DEFAULT_TTL } from 'src/shared/constants/redis.constant';
import { parseSortQuery } from 'src/shared/helpers/sort.helper';
import { PaginatedResult } from 'src/shared/repositories/base-interface.repository';
import { BaseService } from 'src/shared/services/base-abstract.service';

import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesQueryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoriesService extends BaseService<CategoryDocument> {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly cacheService: RedisService,
  ) {
    super(categoriesRepository);
  }

  async findAllCategories(query: GetCategoriesQueryDto): Promise<PaginatedResult<CategoryDocument>> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search, sort } = query;
    const cacheKey = `categories:list:page=${page}:limit=${limit}:search=${search ?? ''}:sort=${sort ?? ''}`;

    const cached = await this.cacheService.getJson<PaginatedResult<CategoryDocument>>(cacheKey);
    if (cached) return cached;

    const filter: QueryFilter<CategoryDocument> = { deletedAt: undefined };
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { slug: { $regex: search, $options: 'i' } }];

    const result = await this.findAllWithPaginate(filter, { page, limit, sort: parseSortQuery(sort) });

    await this.cacheService.setJson(cacheKey, result, DEFAULT_TTL);
    return result;
  }

  async findCategoryById(id: string) {
    const category = await this.findOne({ _id: id, deletedAt: undefined });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  private async validateParentCategory(parentId?: string) {
    if (!parentId) return undefined;

    const parent = await this.findOne({
      _id: parentId,
      deletedAt: undefined,
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    return new Types.ObjectId(parentId);
  }

  async createCategory(body: CreateCategoryDto) {
    const category = await this.create({
      ...body,
      parentId: await this.validateParentCategory(body.parentId),
    });

    await this.cacheService.delByPattern('categories:list:*');
    return category;
  }

  async updateCategory(id: string, body: UpdateCategoryDto) {
    const category = await this.update(id, {
      ...body,
      parentId: await this.validateParentCategory(body.parentId),
    });

    await this.cacheService.delByPattern('categories:list:*');
    return category;
  }

  async deleteCategory(id: string) {
    const category = await this.hardDelete(id);

    await this.cacheService.delByPattern('categories:list:*');
    return category;
  }
}