ALTER TABLE users
  ALTER COLUMN enabled SET DEFAULT FALSE;

INSERT INTO users (username, password, enabled) VALUES ('admin', 'admin', TRUE);
INSERT INTO users (username, password, enabled) VALUES ('editor', 'editor', TRUE);
INSERT INTO users (username, password, enabled) VALUES ('senior_reviewer', 'reviewer', TRUE);
INSERT INTO users (username, password, enabled) VALUES ('middle_reviewer', 'reviewer', TRUE);
INSERT INTO users (username, password, enabled) VALUES ('junior_reviewer', 'reviewer', TRUE);
INSERT INTO users (username, password, enabled) VALUES ('curious_user', 'user', TRUE);

INSERT INTO authorities (authority) VALUES ('ROLE_ADMIN');
INSERT INTO authorities (authority) VALUES ('ROLE_EDITOR');
INSERT INTO authorities (authority) VALUES ('ROLE_REVIEWER');
INSERT INTO authorities (authority) VALUES ('ROLE_USER');
INSERT INTO authorities (authority) VALUES ('ROLE_GUEST');

INSERT INTO users_authorities (user_id, authority_id) VALUES (1, 7);
INSERT INTO users_authorities (user_id, authority_id) VALUES (2, 8);
INSERT INTO users_authorities (user_id, authority_id) VALUES (3, 9);
INSERT INTO users_authorities (user_id, authority_id) VALUES (4, 9);
INSERT INTO users_authorities (user_id, authority_id) VALUES (5, 9);
INSERT INTO users_authorities (user_id, authority_id) VALUES (6, 10);

INSERT INTO statuses (name) VALUES ('created');
INSERT INTO statuses (name) VALUES ('approved');
INSERT INTO statuses (name) VALUES ('rejected');
INSERT INTO statuses (name) VALUES ('displayed');
INSERT INTO statuses (name) VALUES ('archived');

INSERT INTO categories (name) VALUES ('global');
INSERT INTO categories (name) VALUES ('sport');
INSERT INTO categories (name) VALUES ('art');
INSERT INTO categories (name) VALUES ('politics');
INSERT INTO categories (name) VALUES ('entertainment');