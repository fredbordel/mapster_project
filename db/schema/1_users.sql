-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username TEXT NOT NULL
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);
