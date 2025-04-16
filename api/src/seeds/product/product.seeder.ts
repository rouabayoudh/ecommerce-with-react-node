import { Product } from '@/products/schemas/product.schemas';
import { CategoriesService } from '@/products/services/categories.service';
import { ProductsService } from '@/products/services/products.service';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable } from '@nestjs/common';
import { productSeeds } from './product.seed-data';

@Injectable()
export class ProductSeeder extends BaseSeeder<Product> {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {
    super(Product.name, productService);
  }

  async seed() {
    const categories = await this.categoryService.findAll();
    const categoryIds = categories.map((category) => category.id.toString());

    await this.seedData(productSeeds(categoryIds));
  }
}
