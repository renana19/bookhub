export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  forumId: number;
  createdAt: Date;
}
export interface NewPost {
  title: string;
  content: string;
  userId: number;
  forumId: number;
}