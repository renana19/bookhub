// import {
//     fetchAllForums,
//     fetchForumById,
//     insertForum,
//     removeForum
//   } from '../service/forumsData.js';
  
//   export const getAllForums = async (req, res) => {
//     try {
//       const forums = await fetchAllForums();
//       res.json(forums);
//     } catch (err) {
//       res.status(500).json({ error: 'שגיאה בשליפת פורומים' });
//     }
//   };
  
//   export const getForumById = async (req, res) => {
//     try {
//       const forum = await fetchForumById(req.params.id);
//       if (!forum) return res.status(404).json({ error: 'פורום לא נמצא' });
//       res.json(forum);
//     } catch (err) {
//       res.status(500).json({ error: 'שגיאה בשליפת פורום' });
//     }
//   };
  
//   export const createForum = async (req, res) => {
//     try {
//       const newId = await insertForum(req.body);
//       res.status(201).json({ id: newId, ...req.body });
//     } catch (err) {
//       res.status(500).json({ error: 'שגיאה ביצירת פורום' });
//     }
//   };
  
//   export const deleteForum = async (req, res) => {
//     try {
//       const success = await removeForum(req.params.id);
//       if (success) {
//         res.json({ message: 'הפורום נמחק בהצלחה' });
//       } else {
//         res.status(404).json({ error: 'פורום לא נמצא' });
//       }
//     } catch (err) {
//       res.status(500).json({ error: 'שגיאה במחיקת פורום' });
//     }
//   };
  