import { Request } from 'express';
export const globalSearch = (req: Request, res: Response) => {
  const searchTerm = req.query.query as string; // 'query' comes from the query string

  if (!searchTerm || searchTerm.trim() === '') {
    return { sql: '', params: [] };
  }

  const params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

  const sql = `
    (SELECT 'book' AS type, id, title AS name FROM books WHERE title LIKE ?)
    UNION
    (SELECT 'forum' AS type, id, title AS name FROM forums WHERE title LIKE ?)
    UNION
    (SELECT 'user' AS type, id, username AS name FROM users WHERE username LIKE ?)
  `;

  return { sql, params };
};
