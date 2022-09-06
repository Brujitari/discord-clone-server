DELETE FROM users
WHERE username = 'Nati';

INSERT INTO users (
  username, email, password, bio, img, token, exp_token, active, disabled
) VALUES (
  'Nati', 'nati@gmail.com', '1234', 'bvyjgvde', 'http://www.wjonrowg.okrwngmorm', 'token', '02-10-2023', true, false
);