import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { MongoIdValidationPipe } from 'src/utils/generics/validation-pipes/validation.pipe';

import { RoleDto } from '../dtos/role.dto';
import { Role } from '../schemas/Role.schema';
import { RoleService } from '../services/role.service';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  //-------------------------- CREATE ROLE ------------------------
  @Post()
  async createRole(@Body() roleDto: RoleDto): Promise<Role> {
    return await this.roleService.createOne(roleDto);
  }

  //-------------------------- FIND ROLE ------------------------

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  //-------------------
  @Get(':id')
  async getRoleById(
    @Param('id', new MongoIdValidationPipe()) roleId: string,
  ): Promise<Role> {
    return await this.roleService.findOne(roleId);
  }

  //-------------------
  @Get('name/:name')
  async getRoleByName(@Param('name') roleName: string): Promise<Role[]> {
    const filter: FilterQuery<Role> = { name: roleName };
    return await this.roleService.find(filter);
  }

  //-------------------------- UPDATE ROLE ------------------------

  @Patch(':id')
  async updateRole(
    @Body() updateRole: RoleDto,
    @Param('id', new MongoIdValidationPipe()) roleId: string,
  ): Promise<Role> {
    return await this.roleService.updateOne(roleId, updateRole);
  }

  //---------------
  @Patch('undelete/:id')
  async undeleteRole(
    @Param('id', new MongoIdValidationPipe()) roleId: string,
  ): Promise<Role> {
    return await this.roleService.undeleteRole(roleId);
  }

  //-------------------------- DELETE ROLE ------------------------

  @Delete(':id')
  async deleteRole(
    @Param('id', new MongoIdValidationPipe()) roleId: string,
  ): Promise<void> {
    return await this.roleService.deleteOne(roleId);
  }
}
