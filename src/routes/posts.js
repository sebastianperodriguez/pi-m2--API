import { Router } from 'express';
import * as postsController from '../controllers/posts.js';

const router = Router();

router.get('/', postsController.getAllPosts);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;