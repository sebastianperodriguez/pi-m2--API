import * as postsService from '../services/posts.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener post' });
  }
};

export const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await postsService.getPostsByAuthor(req.params.authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts del author' });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await postsService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await postsService.updatePost(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    await postsService.deletePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar post' });
  }
};