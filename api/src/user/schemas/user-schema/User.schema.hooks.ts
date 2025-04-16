import * as bcrypt from 'bcrypt';
import { Query } from 'mongoose';

interface UserUpdate {
  password?: string;
  salt?: string;
}

/**
 * Pre-save hook function that is executed before saving a user document.
 * It hashes the password and generates a salt for the user.
 *
 * @param next - The next function to be called after the hook is executed.
 * @returns Promise<void>
 */
export const preSaveHook = async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Pre-update hook function for the User schema.
 * This function is executed before updating a user document.
 * It hashes the password and sets the salt value if the password is being updated.
 *
 * @param next - The next function to be called in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the hook is completed.
 */
export const preUpdateHook = async function (next) {
  const query = this as Query<any, any>;
  const update = query.getUpdate() as UserUpdate;

  if (update.password) {
    try {
      const salt = await bcrypt.genSalt();
      update.password = await bcrypt.hash(update.password, salt);
      update.salt = salt;
      query.setUpdate(update);
    } catch (err) {
      return next(err);
    }
  }
  next();
};
