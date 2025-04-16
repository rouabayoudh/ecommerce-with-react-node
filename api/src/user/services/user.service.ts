import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { PopulatedUser, User } from '../schemas/user-schema/User.schema';

@Injectable()
export class UserService extends BaseService<User> {
  private populatedFields: string[] = ['roles'];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel, User, { excludePrefixes: ['password', 'salt'] });
  }

  async getOneUserWithPassword(
    criteria: string | FilterQuery<User>,
    populateFields?: string[],
  ): Promise<User | null> {
    let user;
    try {
      if (typeof criteria === 'string') {
        user = this.userModel.findOne({ _id: criteria, deletedAt: null });
      } else {
        user = this.userModel.findOne({ ...criteria, deletedAt: null });
      }
      user = await user.populate(populateFields).exec();
      return user;
    } catch (e) {
      throw new BadRequestException('An Error Occured While Getting The User');
    }
  }

  //------------------------------ POPULATE METHODS --------------------------------- \\

  async findAllAndPopulate(): Promise<PopulatedUser[]> {
    return await this.findAll<PopulatedUser>(this.populatedFields);
  }

  async findOneAndPopulate(
    criteria: string | FilterQuery<User>,
  ): Promise<PopulatedUser> {
    return await this.findOne<PopulatedUser>(criteria, this.populatedFields);
  }

  async findAndPopulate(filter: FilterQuery<User>): Promise<PopulatedUser[]> {
    return await this.find<PopulatedUser>(filter, this.populatedFields);
  }
}
