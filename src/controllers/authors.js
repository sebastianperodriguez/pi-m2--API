import * as authorsService from '../services/authors.js';

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener authors' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener author' });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const author = await authorsService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: 'Email ya existe' });
    res.status(500).json({ error: 'Error al crear author' });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const author = await authorsService.updateAuthor(req.params.id, req.body);
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar author' });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    await authorsService.deleteAuthor(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar author' });
  }
};