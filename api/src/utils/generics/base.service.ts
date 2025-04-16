import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { FilterQuery, Model, UpdateWriteOpResult } from 'mongoose';

import { BaseSchema } from './Base.schema';

const baseTransformOpts: ClassTransformOptions = {
  excludePrefixes: ['_'],
};

@Injectable()
export class BaseService<T> {
  constructor(
    @InjectModel('') private baseModel: Model<T>,
    private cls: new () => T,
    private readonly transformOpts?: ClassTransformOptions,
    private readonly leanOpts = {
      virtuals: true,
      defaults: true,
      getters: true,
    },
  ) {
    this.transformOpts = {
      ...transformOpts,
      excludePrefixes: baseTransformOpts.excludePrefixes.concat(
        transformOpts?.excludePrefixes || [],
      ),
    };
  }

  private transform<U = T>(doc: any): U {
    if (!doc) {
      return null;
    }
    return plainToInstance<U, any>(
      this.cls as unknown as new () => U,
      doc.toObject(this.leanOpts),
      this.transformOpts,
    ) as U;
  }

  private transformMany<U = T>(docs: any[]): U[] {
    return docs.map((doc) => this.transform<U>(doc));
  }

  //------------------------------ CREATE METHODS --------------------------------- \\

  async createOne<D extends Omit<T, keyof BaseSchema>>(dto: D): Promise<T> {
    try {
      const doc = await this.baseModel.create(dto);
      return this.transform(doc);
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  //-----------------
  async createMany<D extends Omit<T, keyof BaseSchema>>(
    dtos: D[],
  ): Promise<T[]> {
    try {
      const docs = await this.baseModel.create(dtos);
      return this.transformMany(docs);
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  //----------------
  async findOneOrCreate<D extends Omit<T, keyof BaseSchema>>(
    filter: FilterQuery<T>,
    createDto: D,
  ): Promise<T> {
    try {
      let doc = await this.baseModel
        .findOne({ ...filter, deltedAt: null })
        .exec();
      if (!doc) {
        doc = await this.baseModel.create(createDto);
      }
      return this.transform(doc);
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  //------------------------------ FIND METHODS --------------------------------- \\

  async findOne<U = T>(
    criteria: string | FilterQuery<T>,
    popualteFields?: string[],
  ): Promise<U | null> {
    let doc;
    if (typeof criteria === 'string') {
      doc = this.baseModel.findOne({
        _id: criteria,
        deletedAt: null,
      });
    } else {
      doc = this.baseModel.findOne({ ...criteria, deletedAt: null });
    }
    doc = await doc.populate(popualteFields).exec();
    return doc ? this.transform(doc) : null;
  }

  //--------------------
  async findAll<U = T>(populateFields?: string[]): Promise<U[]> {
    const docs = await this.baseModel
      .find({ deletedAt: null })
      .populate(populateFields)
      .exec();

    return this.transformMany(docs);
  }

  //--------------------
  async find<U = T>(
    filter?: FilterQuery<T>,
    populateFields?: string[],
  ): Promise<U[]> {
    const docs = await this.baseModel
      .find({ ...filter, deletedAt: null })
      .populate(populateFields)
      .exec();

    return this.transformMany(docs);
  }

  //------------------------------ UPDATE METHODS --------------------------------- \\

  async updateOne<D extends Partial<Omit<T, keyof BaseSchema>>>(
    criteria: string | FilterQuery<T>,
    dto: D,
  ): Promise<T | null> {
    try {
      let updatedItem;
      if (typeof criteria === 'string') {
        updatedItem = this.baseModel.findOneAndUpdate(
          { _id: criteria, deletedAt: null },
          dto,
          {
            new: true,
            runValidators: true,
          },
        );
      } else {
        updatedItem = this.baseModel.findOneAndUpdate(
          { ...criteria, deletedAt: null },
          dto,
          {
            new: true,
            runValidators: true,
          },
        );
      }
      const doc = await updatedItem.exec();
      return doc ? this.transform(doc) : null;
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  //------------------
  async updateMany<D extends Partial<Omit<T, keyof BaseSchema>>>(
    filter: FilterQuery<T>,
    updateDto: D,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.baseModel
        .updateMany({ ...filter, deletedAt: null }, updateDto, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  //------------------------------ DELETE METHODS --------------------------------- \\

  async deleteOne(criteria: string | FilterQuery<T>): Promise<void> {
    if (typeof criteria === 'string') {
      await this.baseModel.findOneAndUpdate(
        {
          _id: criteria,
          deletedAt: null,
        },
        { deletedAt: new Date() },
        {
          new: true,
          runValidators: true,
        },
      );
    } else {
      await this.baseModel.findOneAndUpdate(
        { ...criteria, deletedAt: null },
        { deletedAt: new Date() },
        {
          new: true,
          runValidators: true,
        },
      );
    }
  }

  //------------------
  async deleteMany(filter: FilterQuery<T>): Promise<UpdateWriteOpResult> {
    return await this.baseModel
      .updateMany(
        { ...filter, deletedAt: null },
        { deletedAt: new Date() },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  //------------------------------ COUNT METHODS --------------------------------- \\

  async countAll(): Promise<number> {
    return await this.baseModel.countDocuments({ deltedAt: null });
  }

  //----------------
  async count(filter?: FilterQuery<T>): Promise<number> {
    return await this.baseModel.countDocuments({ ...filter, deltedAt: null });
  }
}

//TODO: look in details for leanOpts
//TODO: change the other classes to use this service
//TODO: change the type in all relations
