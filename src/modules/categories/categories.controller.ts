import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoriesQueryDto } from './dto/get-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async getCategories(@Query() query: GetCategoriesQueryDto) {
    return this.categoriesService.findAllCategories(query);
  }
}
