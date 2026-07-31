import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dtos/base-query.dto';

export class GetProductsQueryDto extends BaseQueryDto {
    @ApiProperty({
        required: false,
        example: '6884c4e8e5b3e4e2a6d6b123',
        description: 'Lọc theo categoryId',
    })
    @Transform(({ value }) => (value === '' ? undefined : value))
    @IsOptional()
    @IsMongoId({ message: 'categoryId không hợp lệ' })
    categoryId?: string;
}
