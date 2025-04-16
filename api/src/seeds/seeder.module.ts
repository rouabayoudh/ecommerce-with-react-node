import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

import { ProductsModule } from '@/products/products.module';
import { CategorySeeder } from './product/category.seeder';
import { ProductSeeder } from './product/product.seeder';
import { AppEntitySeeder } from './user/appentity.seeder';
import { PermissionSeeder } from './user/permission.seeder';
import { RoleSeeder } from './user/role.seeder';
import { UserSeeder } from './user/user.seeder';

@Module({
  imports: [UserModule, ProductsModule],
  providers: [
    UserSeeder,
    RoleSeeder,
    CategorySeeder,
    ProductSeeder,
    AppEntitySeeder,
    PermissionSeeder,
  ],
})
export class SeederModule {}
