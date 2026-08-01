import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: '6884c4e8e5b3e4e2a6d6b123',
    description: 'ID danh mục',
  })
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsMongoId({ message: 'categoryId không hợp lệ' })
  categoryId: string;

  @ApiProperty({
    example: 'iPhone 16 Pro Max',
    description: 'Tên sản phẩm',
  })
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @ApiProperty({
    example: 'iphone-16-pro-max',
    description: 'Slug sản phẩm',
  })
  @IsString({ message: 'Slug phải là chuỗi' })
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @ApiProperty({
    example: 'Mô tả sản phẩm',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description phải là chuỗi' })
  description?: string;

  @ApiProperty({
    example: 'https://example.com/thumb.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'ThumbUrl phải là chuỗi' })
  thumbUrl?: string;

  @ApiProperty({
    example: ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Images phải là mảng' })
  images?: string[];

  @ApiProperty({
    example: [],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Attributes phải là mảng' })
  attributes?: any[];

  @ApiProperty({
    example: [],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'TierVariations phải là mảng' })
  tierVariations?: any[];

  @ApiProperty({
    example: [],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Skus phải là mảng' })
  skus?: any[];

  @ApiProperty({
    example: 4.8,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'RatingAvg phải là số' })
  ratingAvg?: number;

  @ApiProperty({
    example: 120,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ReviewCount phải là số' })
  reviewCount?: number;

  @ApiProperty({
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'SoldCount phải là số' })
  soldCount?: number;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'IsPublished phải là boolean' })
  isPublished?: boolean;
}