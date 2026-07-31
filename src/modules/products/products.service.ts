import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryFilter, Types } from 'mongoose';

import { RedisService } from 'src/core/cache/redis/redis.service';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/shared/constants/paginate.constant';
import { DEFAULT_TTL } from 'src/shared/constants/redis.constant';
import { parseSortQuery } from 'src/shared/helpers/sort.helper';
import { PaginatedResult } from 'src/shared/repositories/base-interface.repository';
import { BaseService } from 'src/shared/services/base-abstract.service';

import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService extends BaseService<ProductDocument> {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cacheService: RedisService,
  ) {
    super(productsRepository);
  }

  async findAllProducts(query: GetProductsQueryDto): Promise<PaginatedResult<ProductDocument>> {
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      search,
      categoryId,
      sort,
    } = query;

    const cacheKey = `products:list:page=${page}:limit=${limit}:search=${search ?? ''}:categoryId=${categoryId ?? ''}:sort=${sort ?? ''}`;

    const cached = await this.cacheService.getJson<PaginatedResult<ProductDocument>>(cacheKey);
    if (cached) return cached;

    const filter: QueryFilter<ProductDocument> = {
      deletedAt: undefined,
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    if (categoryId) {
      filter.categoryId = new Types.ObjectId(categoryId);
    }

    const result = await this.findAllWithPaginate(filter, {
      page,
      limit,
      sort: parseSortQuery(sort),
    });

    await this.cacheService.setJson(cacheKey, result, DEFAULT_TTL);

    return result;
  }

  async findProductById(id: string) {
    const product = await this.findOne({
      _id: id,
      deletedAt: undefined,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createProduct(body: CreateProductDto) {
    const product = await this.create({
      ...body,
      categoryId: new Types.ObjectId(body.categoryId),
    });

    await this.cacheService.delByPattern('products:list:*');

    return product;
  }

  async updateProduct(id: string, body: UpdateProductDto) {
    const updateData = {
      ...body,
      ...(body.categoryId && {
        categoryId: new Types.ObjectId(body.categoryId),
      }),
    };

    const product = await this.update(id, updateData);

    await this.cacheService.delByPattern('products:list:*');

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.hardDelete(id);

    await this.cacheService.delByPattern('products:list:*');

    return product;
  }
}