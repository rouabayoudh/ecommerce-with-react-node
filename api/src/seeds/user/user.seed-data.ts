import { CreateUserDto } from '@/user/dtos/user-dtos/create-user.dto';

export const userSeeds = (roleIds: string[]): CreateUserDto[] => [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'hashed_password_1',
    firstName: 'Admin',
    lastName: 'User',
    roles: [roleIds[0]],
    phone: 1234567890,
  },
  {
    username: 'user01',
    email: 'user01@example.com',
    password: 'hashed_password_2',
    firstName: 'Regular',
    lastName: 'User',
    roles: [roleIds[1]],
    phone: 2345678901,
  },
  {
    username: 'user02',
    email: 'user02@example.com',
    password: 'hashed_password_3',
    firstName: 'Another',
    lastName: 'User',
    roles: [roleIds[2]],
    phone: 3456789012,
  },
  {
    username: 'user03',
    email: 'user03@example.com',
    password: 'hashed_password_4',
    firstName: 'Test',
    lastName: 'User',
    roles: [roleIds[1]],
    phone: 4567890123,
  },
  {
    username: 'user04',
    email: 'user04@example.com',
    password: 'hashed_password_5',
    firstName: 'Sample',
    lastName: 'User',
    roles: [roleIds[2]],
    phone: 5678901234,
  },
  {
    username: 'user05',
    email: 'user05@example.com',
    password: 'hashed_password_6',
    firstName: 'Example',
    lastName: 'User',
    roles: [roleIds[0]],
    phone: 6789012345,
  },
];
