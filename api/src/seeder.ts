import { Logger } from '@nestjs/common';
import { CategorySeeder } from './seeds/product/category.seeder';
import { ProductSeeder } from './seeds/product/product.seeder';
import { AppEntitySeeder } from './seeds/user/appentity.seeder';
import { PermissionSeeder } from './seeds/user/permission.seeder';
import { RoleSeeder } from './seeds/user/role.seeder';
import { UserSeeder } from './seeds/user/user.seeder';

export async function seedDatabase(app) {
  const userSeeder = app.get(UserSeeder);

  const isEmpty = await userSeeder.isEmpty();

  if (!isEmpty) {
    Logger.log('Databse already seeded');
    return;
  }
  Logger.log('Seeding the database...');

  const roleSeeder = app.get(RoleSeeder);
  const categorySeeder = app.get(CategorySeeder);
  const prodcutSeeder = app.get(ProductSeeder);
  const appentitySeeder = app.get(AppEntitySeeder);
  const permissionSeeder = app.get(PermissionSeeder);

  try {
    await roleSeeder.seed();
  } catch {
    Logger.error('error while seeding the roles');
  }

  try {
    await userSeeder.seed();
  } catch {
    Logger.error('error while seeding the users');
  }

  try {
    await categorySeeder.seed();
  } catch {
    Logger.error('error while seeding the categories');
  }

  try {
    await prodcutSeeder.seed();
  } catch {
    Logger.error('error while seeding the products');
  }

  try {
    await appentitySeeder.seed();
  } catch {
    Logger.error('error while seeding the app entities');
  }

  try {
    await permissionSeeder.seed();
  } catch {
    Logger.error('error while seeding the permissions');
  }

  Logger.log('Database seeding completed successfully.');
}
