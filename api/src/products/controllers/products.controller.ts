import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@/utils/generics/validation-pipes/validation.pipe';

import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { PopulatedProduct, Product } from '../schemas/product.schemas';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  //------------------- CREATE METHODS ---------------------
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  //------------------- FIND METHODS ---------------------

  @Get()
  async getAllProducts(
    @Query('populateFields')
    populateFields?: boolean,
  ): Promise<(Product | PopulatedProduct)[]> {
    if (populateFields) {
      return await this.productService.findAllAndPopulate();
    }
    return await this.productService.findAll();
  }

  //-------------------
  @Get(':id')
  async getProductById(
    @Param('id', new MongoIdValidationPipe()) id: string,
    @Query('populateFields')
    populateFields?: boolean,
  ): Promise<Product | PopulatedProduct> {
    if (populateFields) {
      return await this.productService.findOneAndPopulate(id);
    }
    return await this.productService.findOne(id);
  }

  //------------------- UPDATE METHODS ---------------------

  @Patch(':id')
  updateProduct(
    @Param('id', new MongoIdValidationPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  //------------------- DELETE METHODS ---------------------

  @Delete(':id')
  async deleteProduct(
    @Param('id', new MongoIdValidationPipe()) id: string,
  ): Promise<void> {
    await this.productService.deleteOne(id);
  }
}
