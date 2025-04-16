import 'express';

declare global {
  namespace Express {
    interface Request {
      uploadPath?: string; // Add the uploadPath property
    }
  }
}
