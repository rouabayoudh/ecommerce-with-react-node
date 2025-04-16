import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { AppEntityService } from './app-entity.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { CreatePermissionDto } from '../dtos/permission-dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/permission-dtos/update-permission.dto';
import { Permission, PopulatedPermission } from '../schemas/Permission.schema';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  private populatedFields: string[] = ['role', 'entity'];

  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
    private readonly roleService: RoleService,
    private readonly appEntityService: AppEntityService,
    private readonly userService: UserService,
  ) {
    super(permissionModel, Permission);
  }

  private async validateRole(roleId: string): Promise<void> {
    const permissionRole = await this.roleService.findOne(roleId);
    if (!permissionRole) {
      throw new BadRequestException('Role Or Entity Not Found');
    }
  }

  private async validateRelatedEntity(entityId: string): Promise<void> {
    const entity = await this.appEntityService.findOne(entityId);
    if (!entity) {
      throw new BadRequestException('Role Or Entity Not Found');
    }
  }

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    await this.validateRole(createPermissionDto.role);

    await this.validateRelatedEntity(createPermissionDto.entity);
    return await this.createOne(createPermissionDto);
  }

  async updatePermission(
    permissionId: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    if (updatePermissionDto.role) {
      await this.validateRole(updatePermissionDto.role);
    }

    if (updatePermissionDto.entity) {
      await this.validateRelatedEntity(updatePermissionDto.entity);
    }
    return await this.updateOne(permissionId, updatePermissionDto);
  }

  async getPermissionsByUserId(userId: string): Promise<Permission[]> {
    // Get roles of the user
    const user = await this.userService.findOne(userId);
    if (!user || !user.roles) {
      throw new NotFoundException(`User Not Found`);
    }

    // Get permissions for the roles
    const permissions = await this.permissionModel.find({
      role: { $in: user.roles },
    });
    return permissions;
  }

  async findOneAndPopulate(
    criteria: string | FilterQuery<Permission>,
  ): Promise<PopulatedPermission> {
    return await this.findOne<PopulatedPermission>(
      criteria,
      this.populatedFields,
    );
  }

  async findAllAndPopulate(): Promise<PopulatedPermission[]> {
    return await this.findAll<PopulatedPermission>(this.populatedFields);
  }

  async findFilteredAndPopulate(
    filter: FilterQuery<Permission>,
  ): Promise<PopulatedPermission[]> {
    return await this.find<PopulatedPermission>(filter, this.populatedFields);
  }
}
