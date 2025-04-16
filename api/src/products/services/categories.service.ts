import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { CreateCategoryDto } from '..//dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { Category, PopulatedCategory } from '../schemas/categories.schema';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  private populateFields: string[] = ['parentCategory'];

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {
    super(categoryModel, Category);
  }

  private async validateParentCategory(
    parentCategoryID: string,
  ): Promise<void> {
    const category = await this.findOne(parentCategoryID);
    if (!category) {
      throw new BadRequestException("Parent Category Doesn't Exist");
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    if (createCategoryDto.parentCategory) {
      await this.validateParentCategory(createCategoryDto.parentCategory);
    }

    return await this.createOne(createCategoryDto);
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (updateCategoryDto.parentCategory) {
      await this.validateParentCategory(updateCategoryDto.parentCategory);
    }

    return await this.updateOne(categoryId, updateCategoryDto);
  }

  async findOneAndPopulate(
    criteria: string | FilterQuery<Category>,
  ): Promise<PopulatedCategory> {
    return await this.findOne<PopulatedCategory>(criteria, this.populateFields);
  }

  async findAllAndPopulate(): Promise<PopulatedCategory[]> {
    return await this.findAll<PopulatedCategory>(this.populateFields);
  }

  async findFilteredAndPopulate(
    filter: FilterQuery<Category>,
  ): Promise<PopulatedCategory[]> {
    return await this.find<PopulatedCategory>(filter, this.populateFields);
  }
}
