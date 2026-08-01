import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: '6884c4e8e5b3e4e2a6d6b123',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsMongoId({ message: 'categoryId không hợp lệ' })
  categoryId?: string;

  @ApiProperty({
    example: 'iPhone 16 Pro Max',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  name?: string;

  @ApiProperty({
    example: 'iphone-16-pro-max',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Slug phải là chuỗi' })
  slug?: string;

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
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'IsPublished phải là boolean' })
  isPublished?: boolean;

  @ApiProperty({
    example: 4.8,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'RatingAvg phải là số' })
  ratingAvg?: number;

  @ApiProperty({
    example: 100,
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
}