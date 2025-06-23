import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface UserPayload {
  id: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('אין טוקן גישה');
  }

  jwt.verify(token, JWT_SECRET!, (err, decoded: any) => {
  if (err) return res.status(403).json('טוקן לא חוקי');
  req.user = decoded as UserPayload;
  next();
});

};

export default authenticateToken;
