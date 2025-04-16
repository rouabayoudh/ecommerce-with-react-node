import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedDatabase } from './seeder';

async function seedDatabaseApp() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await seedDatabase(app);

  process.exit(0);
}

seedDatabaseApp();
