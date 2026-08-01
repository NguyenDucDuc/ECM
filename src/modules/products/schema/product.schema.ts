import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  thumbUrl: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [mongoose.Schema.Types.Mixed], default: [] })
  attributes: any[];

  @Prop({ type: [mongoose.Schema.Types.Mixed], default: [] })
  tierVariations: any[];

  @Prop({ type: [mongoose.Schema.Types.Mixed], default: [] })
  skus: any[];

  @Prop({ default: 0 })
  ratingAvg: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  soldCount: number;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);