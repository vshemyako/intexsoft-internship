CREATE SEQUENCE hibernate_sequence INCREMENT BY 1 MINVALUE 1 NO MAXVALUE START WITH 1;

CREATE TABLE users (
  id       INTEGER DEFAULT NEXTVAL('hibernate_sequence') UNIQUE,
  username TEXT    NOT NULL,
  password TEXT    NOT NULL,
  enabled  BOOLEAN NOT NULL
);

CREATE TABLE authorities (
  id        INTEGER DEFAULT NEXTVAL('hibernate_sequence') UNIQUE,
  authority TEXT NOT NULL
);

CREATE TABLE users_authorities (
  user_id      INTEGER,
  authority_id INTEGER,
  CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
  CONSTRAINT authority_id_fk FOREIGN KEY (authority_id) REFERENCES authorities (id) ON UPDATE CASCADE,
  CONSTRAINT user_authority_pk PRIMARY KEY (user_id, authority_id)
);

CREATE TABLE statuses (
  id   INTEGER DEFAULT NEXTVAL('hibernate_sequence') UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE categories (
  id   INTEGER DEFAULT NEXTVAL('hibernate_sequence') UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE news (
  id            INTEGER DEFAULT NEXTVAL('hibernate_sequence') UNIQUE,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  article       TEXT NOT NULL,
  author_id     INTEGER,
  status_id     INTEGER,
  start_display TIMESTAMP,
  end_display   TIMESTAMP,
  CONSTRAINT author_id_fk FOREIGN KEY (author_id) REFERENCES users (id) ON UPDATE CASCADE,
  CONSTRAINT status_id_fk FOREIGN KEY (status_id) REFERENCES statuses (id) ON UPDATE CASCADE
);

CREATE TABLE news_categories (
  news_id     INTEGER,
  category_id INTEGER,
  CONSTRAINT news_id_fk FOREIGN KEY (news_id) REFERENCES news (id) ON UPDATE CASCADE,
  CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id) ON UPDATE CASCADE,
  CONSTRAINT news_categories_pk PRIMARY KEY (news_id, category_id)
);

