import { Router } from 'express';
import * as postsController from '../controllers/posts.js';
import { validatePost, validatePostUpdate } from '../middlewares/validate.js';

const router = Router();

router.get('/', postsController.getAllPosts);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.get('/:id', postsController.getPostById);
router.post('/', validatePost, postsController.createPost);
router.put('/:id', validatePostUpdate, postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;