import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Điện tử',
    description: 'Tên danh mục',
  })
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  name: string;

  @ApiProperty({
    example: 'dien-tu',
    description: 'Slug của danh mục',
  })
  @IsString({ message: 'Slug phải là chuỗi' })
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

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
    description: 'Đường dẫn của danh mục',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Path phải là chuỗi' })
  path?: string;

  @ApiProperty({
    example: 1,
    description: 'Cấp của danh mục',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'Level phải là số nguyên' })
  level?: number;
}