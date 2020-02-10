DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  zoom_level SMALLINT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
