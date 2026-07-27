import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoriesQueryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query() query: GetCategoriesQueryDto) {
    return this.categoriesService.findAllCategories(query);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.findCategoryById(id);
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}