import { loginUser, newUser } from "../model/userModel";

export interface ValidationResult {
  success: boolean;
  errors?: string[];
}

export function validateLogin(newUser: loginUser): ValidationResult {
  const errors: string[] = [];

  // Check if username is provided
  if (!newUser.username || newUser.username.trim() === "") {
    errors.push("Username is required.");
  }
  // Check if password is provided
  if (!newUser.password || newUser.password.trim() === "") {
    errors.push("Password is required.");
  }

  // Return errors or success message
  return errors.length > 0 ? { success: false, errors } : { success: true };
}

export function validateUser(newUser: newUser): ValidationResult {
  const errors: string[] = [];

  // Check if username is provided
  if (!newUser.username || newUser.username.trim() === "") {
    errors.push("Username is required.");
  }

  // Check if fullname is provided
  if (!newUser.fullname || newUser.fullname.trim() === "") {
    errors.push("Full name is required.");
  }

  // Check if email is provided and valid
  if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) {
    errors.push("A valid email address is required.");
  }

  // Check if role is valid
  const validRoles = ["admin", "author", "user"];
  if (newUser.role && !validRoles.includes(newUser.role)) {
    errors.push(`Role must be one of: ${validRoles.join(", ")}`);
  }

  // Return errors or success message
  return errors.length > 0 ? { success: false, errors } : { success: true };
}
