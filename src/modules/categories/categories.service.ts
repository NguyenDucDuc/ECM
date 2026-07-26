import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, QueryFilter } from 'mongoose';
import { RedisService } from 'src/core/cache/redis/redis.service';
import { BaseService } from '../../shared/services/base-abstract.service';
import { CategoryDocument } from './schema/category.schema';
import { CategoriesRepository } from './categories.repository';
import { GetCategoriesQueryDto } from './dto/get-category.dto';
import { DEFAULT_TTL } from 'src/shared/constants/redis.constant';
import { parseSortQuery } from 'src/shared/helpers/sort.helper';
import { PaginatedResult } from 'src/shared/repositories/base-interface.repository';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/shared/constants/paginate.constant';

@Injectable()
export class CategoriesService extends BaseService<CategoryDocument> {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly cacheService: RedisService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    super(categoriesRepository);
  }

  async findAllCategories(queryDto: GetCategoriesQueryDto): Promise<PaginatedResult<CategoryDocument>> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search, sort } = queryDto;

    const cachePrefix = 'users:list';
    const cacheKey = `${cachePrefix}:page=${page}:limit=${limit}:search=${search || ''}:sort=${sort || ''}`;
    const cachedData = await this.cacheService.getJson<PaginatedResult<CategoryDocument>>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const filter: QueryFilter<CategoryDocument> = { deletedAt: undefined };
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
    }
    const sortConfig = parseSortQuery(sort);

    const paginateResult = await this.findAllWithPaginate(filter, {
      page,
      limit,
      sort: sortConfig,
    });

    await this.cacheService.setJson(cacheKey, paginateResult, DEFAULT_TTL);

    return paginateResult;
  }
}
