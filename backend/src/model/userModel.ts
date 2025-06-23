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
// interface JwtPayload {
//   id: number;
//   username: string;
//   role?: string;
// }