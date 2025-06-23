import pool from "../db";
import { loginUser, newUser, user, basicUserData } from "../model/userModel";

export async function getUserByUsername(
  username: string
): Promise<user | null> {
  const sql = "SELECT * FROM users WHERE username = ?";
  const values = [username];
  try {
    const [rows] = await pool.execute(sql, values);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as user; // Return the first user found
    }
    return null; // No user found
  } catch (err) {
    console.error("Error fetching user by username:", err);
    return null;
  }
}

export async function addUser(user: newUser): Promise<user | null> {
  const sql = `
    INSERT INTO users (
      username, fullname, email, password, address, profileImageUrl, role, isVerifiedAuthor
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user.username,
    user.fullname,
    user.email,
    user.password,
    user.address ?? null,
    user.profileImageUrl ?? null,
    user.role ?? "user",
    user.isVerifiedAuthor ?? false,
  ];

  try {
    const [result] = await pool.execute(sql, values);
    return user as user; // Return the user object with the same structure
  } catch (err) {
    console.error("Error adding user:", err);
    return null;
  }
}

export async function updateUser(
  userId: number,
  updatedUser: Partial<user>
): Promise<user | null> {
  const sql = `
    UPDATE users SET
      username = COALESCE(?, username),
      fullname = COALESCE(?, fullname),
      email = COALESCE(?, email),
      password = COALESCE(?, password),
      address = COALESCE(?, address),
      profileImageUrl = COALESCE(?, profileImageUrl),
      role = COALESCE(?, role),
      isVerifiedAuthor = COALESCE(?, isVerifiedAuthor)
    WHERE id = ?
  `;

  const values = [
    updatedUser.username,
    updatedUser.fullname,
    updatedUser.email,
    updatedUser.password,
    updatedUser.address,
    updatedUser.profileImageUrl,
    updatedUser.role,
    updatedUser.isVerifiedAuthor,
    userId,
  ];

  try {
    const [result] = await pool.execute(sql, values);
    if ((result as any).affectedRows > 0) {
      return { ...updatedUser, id: userId } as user; // Return the updated user object
    }
    return null; // No user found or no changes made
  } catch (err) {
    console.error("Error updating user:", err);
    return null;
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  const sql = "DELETE FROM users WHERE id = ?";
  const values = [userId];

  try {
    const [result] = await pool.execute(sql, values);
    return (result as any).affectedRows > 0; // Return true if a user was deleted
  } catch (err) {
    console.error("Error deleting user:", err);
    return false; // Return false on error
  }
}

export async function getBasicUserInfo(
  userId: number
): Promise<basicUserData | null> {
  const sql = `
    SELECT id, username, fullname, email, profileImageUrl, role, isVerifiedAuthor
    FROM users WHERE id = ?
  `;
  const values = [userId];

  try {
    const [rows] = await pool.execute(sql, values);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as basicUserData; // Return the first user found
    }
    return null; // No user found
  } catch (err) {
    console.error("Error fetching basic user info:", err);
    return null;
  }
}
