export interface loginUser {
  username: string;
  password: string;
}

export interface newUser {
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  address?: string;
  profileImageUrl?: string;
  role?: "admin" | "moderator" | "user";
  isVerifiedAuthor?: boolean;
}

export interface user extends newUser {
  id: number;
}

export interface basicUserData {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profileImageUrl?: string;
  role?: "admin" | "moderator" | "user";
  isVerifiedAuthor?: boolean;
}
// interface JwtPayload {
//   id: number;
//   username: string;
//   role?: string;
// }

export interface userLike {
  id: number;
  username: string;
}
