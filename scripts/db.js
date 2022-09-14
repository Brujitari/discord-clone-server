const { sql } = require("slonik");

const create = async (db) => {
    await db.query(sql`
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
  `);
};

const populate = async (db) => {
    await db.query(sql`
            DELETE FROM users
            WHERE username = 'Nati';
            DELETE FROM communities
            WHERE name = 'Natlandia';
            
            INSERT INTO users (
                username, email, password, bio, img, token, exp_token, active, disabled
              ) VALUES (
                'Nati', 'nati@gmail.com', '1234', 'bvyjgvde', 'http://www.wjonrowg.okrwngmorm', 'token', '02-10-2023', true, false
              );

              
            INSERT INTO communities (
              name, description, img
            ) VALUES (
              'Natlandia', 'Increíble comunidad', 'https://imgs.search.brave.com/Mh7ivmm1EJrRvvNCmlWkIHJDC7rK8OcBbMC0Nc9qN_o/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC43/cWhxRi1udDh5cHJ5/ZzUycE9uSXJnSGFF/SyZwaWQ9QXBp'
            );
      `);
};

const main = async () => {
    try {
        const db = await require("../configs/db");

        await create(db);
        console.info("> creation completed");

        await populate(db);
        console.info("> population completed");
    } catch (error) {
        console.info("> db error: ", error.message);
    }
};

main();
