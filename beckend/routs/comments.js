
import express from 'express'
import {comment} from '../controller/comments.js'
import authenticateToken from '../service/authMiddleware.js';
const commentsRout=express.Router();
const commentController=new comment();
commentsRout.get('/',authenticateToken,commentController.getAll);
commentsRout.put('/:id',authenticateToken,commentController.update);
commentsRout.delete('/:id',authenticateToken,commentController.delete);
commentsRout.post('/',authenticateToken,commentController.add);
export default commentsRout;