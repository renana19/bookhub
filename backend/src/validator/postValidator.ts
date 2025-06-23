import { newPost } from '../model/postModel';

export interface ValidationResult {
  success: boolean;
  errors?: string[];
}


export function validatePost(newPost: newPost): ValidationResult {
  const errors: string[] = [];

  // Check if title is provided
  if (!newPost.title || newPost.title.trim() === '') {
    errors.push('Title is required.');
  }

  // Check if content is provided
  if (!newPost.content || newPost.content.trim() === '') {
    errors.push('Content is required.');
  }

  // Check if userId is provided and is a positive integer
  if (!newPost.userId || typeof newPost.userId !== 'number' || newPost.userId <= 0) {
    errors.push('A valid user ID is required.');
  }

  // Check if forumId is provided and is a positive integer
  if (!newPost.forumId || typeof newPost.forumId !== 'number' || newPost.forumId <= 0) {
    errors.push('A valid forum ID is required.');
  }

  // Return errors or success message
  return errors.length > 0 ? { success: false, errors } : { success: true };
}