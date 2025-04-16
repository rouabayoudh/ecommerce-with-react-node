import { Category } from '@/products/schemas/categories.schema';
import { CategoriesService } from '@/products/services/categories.service';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable, Logger } from '@nestjs/common';
import { subcategories, topLevelCategories } from './category.seed-data';

@Injectable()
export class CategorySeeder extends BaseSeeder<Category> {
  constructor(private readonly categoryService: CategoriesService) {
    super(Category.name, categoryService);
  }

  async seed() {
    Logger.log('Seeding top-level categories...');
    const createdCategories =
      await this.categoryService.createMany(topLevelCategories);

    const parentCategory: any = createdCategories.find(
      (category: any) => category.name === 'parentCategory',
    );
    const parentCategoryId = parentCategory.id;

    Logger.log('Seeding subcategories...');
    const subcategoriesWithParent = subcategories.map((subcategory) => ({
      ...subcategory,
      parentCategory: parentCategoryId,
    }));

    await this.categoryService.createMany(subcategoriesWithParent);

    Logger.log('Seeding categories and subcategories complete.');
  }
}
