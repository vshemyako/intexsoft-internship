ALTER TABLE users_authorities DROP CONSTRAINT user_id_fk;
ALTER TABLE users_authorities DROP CONSTRAINT authority_id_fk;

ALTER TABLE users_authorities
  ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE users_authorities
  ADD CONSTRAINT authority_id_fk FOREIGN KEY (authority_id) REFERENCES authorities (id) ON DELETE CASCADE;