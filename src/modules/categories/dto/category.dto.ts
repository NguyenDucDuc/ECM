import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsOptional()
  @IsMongoId({ message: 'parent_id không hợp lệ' })
  parent_id?: string;

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
  @IsNumber({}, { message: 'Level phải là số' })
  level?: number;
}
