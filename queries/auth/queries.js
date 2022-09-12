const { sql } = require("slonik");

const selectFullUser = ({ email }) => {
  return sql`
    SELECT * FROM users
    WHERE email = ${email};
  `;
};

const insertUser = ({ email, password, username }) => {
  return sql`
    INSERT INTO users (
      email, password, username
    ) VALUES (
      ${email}, ${password}, ${username}
    );
  `;
};

module.exports = {
  selectFullUser,
  insertUser,
};
