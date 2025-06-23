export interface loginUser {
  username: string;
  password: string;
}

export interface newUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
  address?: string;
  profileImageUrl?: string;
  role?: "admin" | "author" | "user";
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
  role?: "admin" | "author" | "user";
  isVerifiedAuthor?: boolean;
}
// interface JwtPayload {
//   id: number;
//   username: string;
//   role?: string;
// }
