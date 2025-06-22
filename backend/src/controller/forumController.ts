import { Request, Response } from "express";



export const getPopularForums = async (req: Request, res: Response) => {
  // לדוגמה - ממסד נתונים אמיתי
  // const forums = await ForumModel.getPopular();
  
  // דמו:
  const forums = [
    { id: 1, title: "פורום ספרות קלאסית", post_count: 12 },
    { id: 2, title: "פורום מתח", post_count: 9 }
  ];
  
  res.json(forums);
};
