export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
}

export interface PostData {
  id: number;
  title: string;
  content: string;
  userId: number;
  forumId: number;
  createdAt: string;
}

export interface ForumData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  bookId: number;
  createdBy: number;
  isRecommendation: boolean;
  created_at: string;
    updatedAt: string;
}
export interface UserData {
  id: number;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  passwordHash: string;
  role: 'user' | 'moderator' | 'admin';
  profileImage: string;
    isVerified: boolean;
    

}

