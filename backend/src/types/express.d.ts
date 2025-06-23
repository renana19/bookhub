import { user } from '../model/userModel'; // <-- Update this path to your actual UserType file

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}

export {};