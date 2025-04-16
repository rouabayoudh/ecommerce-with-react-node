import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery, Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { CategoriesService } from './categories.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { PopulatedProduct, Product } from '../schemas/product.schemas';

@ApiTags('Product')
@Injectable()
export class ProductsService extends BaseService<Product> {
  private populatedFields: string[] = ['category'];

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {
    super(productModel, Product);
  }

  private async validateCategory(categoryID: string): Promise<void> {
    const category = await this.categoriesService.findOne(categoryID);
    if (!category) {
      throw new BadRequestException("Category Doesn't Exist");
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.category) {
      await this.validateCategory(createProductDto.category);
    }
    return await this.createOne(createProductDto);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (updateProductDto.category) {
      await this.validateCategory(updateProductDto.category);
    }
    return await this.updateOne(id, updateProductDto);
  }

  async findAllAndPopulate(): Promise<PopulatedProduct[]> {
    return await this.findAll<PopulatedProduct>(this.populatedFields);
  }

  async findOneAndPopulate(
    criteria: string | FilterQuery<Product>,
  ): Promise<PopulatedProduct> {
    return await this.findOne<PopulatedProduct>(criteria, this.populatedFields);
  }

  async findFilteredAndPopulate(
    filter: FilterQuery<Product>,
  ): Promise<PopulatedProduct[]> {
    return await this.find<PopulatedProduct>(filter, this.populatedFields);
  }
}
