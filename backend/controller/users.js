import { json } from "express";

// 📁 controllers/userController.js
import * as userService from "../services/userService.js";

// 📥 שליפת משתמש לפי מזהה
export async function getUser(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// 📋 שליפת כל המשתמשים
export async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// ➕ יצירת משתמש חדש
export async function addUser(req, res) {
  const { username, avatar_url, bio } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const newUser = await userService.createUser({ username, avatar_url, bio });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
}

// ✏️ עדכון משתמש קיים
export async function updateUserProfile(req, res) {
  const { username, avatar_url, bio } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const updated = await userService.updateUser(req.params.id, {
      username,
      avatar_url,
      bio,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
}

// ❌ מחיקת משתמש
export async function removeUser(req, res) {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
