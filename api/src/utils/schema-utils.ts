// Import other schemas here

import { AppEntity } from 'src/user/schemas/AppEntity.schema';
import { Permission } from 'src/user/schemas/Permission.schema';
import { Role } from 'src/user/schemas/Role.schema';
import { User } from 'src/user/schemas/user-schema/User.schema';

import { Attachment } from '@/attachment/attachment.shema';
import { Category } from '@/products/schemas/categories.schema';
import { Product } from '@/products/schemas/product.schemas';

export function getAllSchemaNames(): string[] {
  return [
    AppEntity.name,
    Role.name,
    User.name,
    Permission.name,
    Category.name,
    Attachment.name,
    Product.name,
  ];
}
