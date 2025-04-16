import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from 'src/utils/generics/validation-pipes/validation.pipe';

import { CreatePermissionDto } from '../dtos/permission-dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/permission-dtos/update-permission.dto';
import { Permission, PopulatedPermission } from '../schemas/Permission.schema';
import { PermissionService } from '../services/permission.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  //------------------------- CREATE METHODS ---------------------
  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  //------------------------- FIND METHODS ---------------------

  @Get(':id')
  async getPermissionById(
    @Param('id', new MongoIdValidationPipe()) permissionId: string,
    @Query('populateFields') populateFields?: boolean,
  ): Promise<Permission | PopulatedPermission> {
    if (populateFields) {
      return await this.permissionService.findOneAndPopulate(permissionId);
    }
    return await this.permissionService.findOne(permissionId);
  }

  //---------------------
  @Get()
  async getAllPermissions(
    @Query('populateFields') populateFields?: boolean,
  ): Promise<(Permission | PopulatedPermission)[]> {
    if (populateFields) {
      return await this.permissionService.findAllAndPopulate();
    }
    return await this.permissionService.findAll();
  }

  //---------------------
  @Get('user/:userId')
  async getPermissionsByUserId(
    @Param('userId', new MongoIdValidationPipe()) userId: string,
  ): Promise<Permission[]> {
    return await this.permissionService.getPermissionsByUserId(userId);
  }

  //------------------------- UPDATE METHODS ---------------------

  @Patch(':id')
  async updatePermission(
    @Param('id', new MongoIdValidationPipe()) permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.updatePermission(
      permissionId,
      updatePermissionDto,
    );
  }

  //------------------------- DELETE METHODS ---------------------

  @Delete(':id')
  async deletePermission(
    @Param('id', new MongoIdValidationPipe()) permissionId: string,
  ): Promise<void> {
    return await this.permissionService.deleteOne(permissionId);
  }
}
