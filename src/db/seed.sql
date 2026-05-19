INSERT INTO authors (name, email, bio) VALUES
  ('Juan Pérez', 'juan@mail.com', 'Desarrollador Full Stack'),
  ('María García', 'maria@mail.com', 'Diseñadora y desarrolladora'),
  ('Carlos López', 'carlos@mail.com', 'Backend developer');

INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Mi primer post', 'Contenido del primer post', true),
  (1, 'Segundo post', 'Contenido del segundo post', false),
  (2, 'Post de María', 'Contenido del post de María', true);