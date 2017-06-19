CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
