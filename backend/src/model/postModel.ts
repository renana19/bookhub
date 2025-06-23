

export interface newPost {
  title: string;
  content: string;
  userId: number;
  forumId: number;
  createdAt: Date;
}
export interface post extends newPost {
    id: number;
    
}
