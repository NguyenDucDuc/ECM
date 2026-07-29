import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Điện tử',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name?: string;

  @ApiProperty({
    example: 'dien-tu',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Slug phải là chuỗi' })
  slug?: string;

  @ApiProperty({
    example: '6884c4e8e5b3e4e2a6d6b123',
    description: 'ID của danh mục cha',
    required: false,
  })
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsMongoId({ message: 'parentId không hợp lệ' })
  parentId?: string;

  @ApiProperty({
    example: '6884c4e8e5b3e4e2a6d6b111/6884c4e8e5b3e4e2a6d6b123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Path phải là chuỗi' })
  path?: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'Level phải là số nguyên' })
  level?: number;
}