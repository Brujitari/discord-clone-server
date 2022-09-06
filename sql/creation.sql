DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS relationships;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS users;

DROP EXTENSION IF EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(30) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  bio VARCHAR(250),
  img TEXT,
  token TEXT,
  exp_token DATE,
  active BOOLEAN DEFAULT false,
  disabled BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS relationships (
  user_request_id uuid REFERENCES users
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  user_accept_id uuid REFERENCES users
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT orders_id PRIMARY KEY (user_request_id, user_accept_id)
);

CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  img TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS channels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  community_id uuid REFERENCES communities
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS members (
  user_id uuid REFERENCES users
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  community_id uuid REFERENCES communities
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT members_id PRIMARY KEY (user_id, community_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  message VARCHAR(5000) NOT NULL,
  time DATE NOT NULL,
  channel_id uuid REFERENCES channels
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  sender_id TEXT NOT NULL,
  receiver_id TEXT
);

