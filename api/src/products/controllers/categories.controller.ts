import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@/utils/generics/validation-pipes/validation.pipe';

import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { Category, PopulatedCategory } from '../schemas/categories.schema';
import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //-------------------------- CREATE METHODS --------------------------
  @Post()
  @ApiBody({ type: CreateCategoryDto })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  //-------------------------- FIND METHODS --------------------------
  @Get(':id')
  async getCategoryById(
    @Param('id', new MongoIdValidationPipe()) id: string,
    @Query('populateFields')
    populateFields?: boolean,
  ): Promise<Category | PopulatedCategory> {
    if (populateFields) {
      return this.categoriesService.findOneAndPopulate(id);
    }
    return this.categoriesService.findOne(id);
  }

  //-------------------
  @Get()
  async getAllCategories(
    @Query('populateFields')
    populateFields?: boolean,
  ): Promise<(Category | PopulatedCategory)[]> {
    if (populateFields) {
      return this.categoriesService.findAllAndPopulate();
    }
    return this.categoriesService.findAll();
  }

  //-------------------------- UPDATE METHODS --------------------------

  @Patch(':id')
  @ApiBody({ type: UpdateCategoryDto })
  async updateCategory(
    @Param('id', new MongoIdValidationPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  //-------------------------- DELETE METHODS --------------------------

  @Delete(':id')
  async deleteCategory(
    @Param('id', new MongoIdValidationPipe()) id: string,
  ): Promise<void> {
    this.categoriesService.deleteOne(id);
  }
}
