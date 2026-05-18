export const isValidAuthor = ({ name, email }) => {
  if (!name || name.trim() === '') return 'El nombre es obligatorio';
  if (!email || email.trim() === '') return 'El email es obligatorio';
  return null;
};

export const isValidPost = ({ title, content, author_id }) => {
  if (!title || title.trim() === '') return 'El título es obligatorio';
  if (!content || content.trim() === '') return 'El contenido es obligatorio';
  if (!author_id) return 'El author_id es obligatorio';
  return null;
};