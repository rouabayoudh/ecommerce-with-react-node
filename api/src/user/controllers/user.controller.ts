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
import { FilterQuery } from 'mongoose';
import { MongoIdValidationPipe } from 'src/utils/generics/validation-pipes/validation.pipe';

import { BaseController } from '@/utils/generics/base-controller';
import { SearchFilterPipe } from '@/utils/pipes/search-filter.pipe';

import { CreateUserDto } from '../dtos/user-dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/user-dtos/update-user.dto';
import { PopulatedUser, User } from '../schemas/user-schema/User.schema';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController extends BaseController<User> {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {
    super(userService);
  }

  //------------------------------ CREATE METHODS --------------------------------- \\

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.validate({
      dto: createUserDto,
      allowedIds: {
        roles: (
          await this.roleService.find({ _id: { $in: createUserDto.roles } })
        ).map((role) => role.id),
      },
    });
    return await this.userService.createOne(createUserDto);
  }

  //------------------------------ COUNT METHODS --------------------------------- \\

  @Get('count')
  async countUsers(
    @Query(
      new SearchFilterPipe<User>({
        allowedFields: ['firstName', 'lastName', 'username'],
      }),
    )
    filter: FilterQuery<User>,
  ) {
    return await this.count(filter);
  }

  //------------------------------ FIND METHODS --------------------------------- \\
  @Get()
  async getUsers(
    @Query(
      new SearchFilterPipe<User>({
        allowedFields: ['firstName', 'lastName', 'username'],
      }),
    )
    filter?: FilterQuery<User>,
    @Query('populateFields') populateFields?: boolean,
  ) {
    if (populateFields) {
      return await this.userService.findAndPopulate(filter);
    }
    return await this.userService.find(filter);
  }

  //--------------------
  @Get(':id')
  async getUserById(
    @Param('id', new MongoIdValidationPipe()) userId: string,
    @Query('populateFields')
    populateFields?: boolean,
  ): Promise<PopulatedUser | User> {
    if (populateFields) {
      return await this.userService.findOneAndPopulate(userId);
    }
    return await this.userService.findOne(userId);
  }

  //------------------------------ UPDATE METHODS --------------------------------- \\

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id', new MongoIdValidationPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateOne(userId, updateUserDto);
  }

  //------------------------------ DELETE METHODS --------------------------------- \\

  @Delete(':id')
  async deleteUser(@Param('id', new MongoIdValidationPipe()) userId: string) {
    return await this.userService.deleteOne(userId);
  }
}
