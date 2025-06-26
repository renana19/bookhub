export interface comment {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  postId: number;
}

export interface NewCommentData {
  postId: number;
  userId: number;
  content: string;
}