import { CreateProductDto } from '@/products/dto/product/create-product.dto';

export const productSeeds = (categoryIds: string[]): CreateProductDto[] => [
  {
    name: 'Product 1',
    description: 'Description for product 1',
    price: 100,
    category: categoryIds[0],
  },
  {
    name: 'Product 2',
    description: 'Description for product 2',
    price: 200,
    category: categoryIds[1],
  },
  {
    name: 'Product 3',
    description: 'Description for product 3',
    price: 300,
    category: categoryIds[2],
  },
  {
    name: 'Product 4',
    description: 'Description for product 4',
    price: 400,
    category: categoryIds[0],
  },
  {
    name: 'Product 5',
    description: 'Description for product 5',
    price: 500,
    category: categoryIds[1],
  },
  {
    name: 'Product 6',
    description: 'Description for product 6',
    price: 600,
    category: categoryIds[2],
  },
];
