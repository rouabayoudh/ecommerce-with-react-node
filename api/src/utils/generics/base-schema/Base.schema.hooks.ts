import { Schema } from 'mongoose';

/**
 * Applies base schema hooks to the provided schema.
 * These hooks update the timestamp fields (updatedAt and createdAt) before saving or updating the document.
 *
 * @param {Schema} schema - The schema to apply the hooks to.
 */
export function applyBaseSchemaHooks(schema: Schema) {
  schema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });

  schema.pre('updateOne', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });

  schema.pre('updateMany', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });
}
