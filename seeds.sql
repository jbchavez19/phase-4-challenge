INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (email, name, password)
VALUES
  ('theone@gmail.com', 'The One', 'pass1'),
  ('joe@gmail.com', 'Joe Simmons', 'pass2')
;

INSERT INTO
  reviews (album_id, user_id, review)
VALUES
  (1, 1, 'So good, love the buzz Malibu gives me!'),
  (1, 2, '@theone it''s not a drink you fool! :angry:'),
  (2, 1, '... is where I sit!'),
  (4, 2, 'love this <3')
;
