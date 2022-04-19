-- Create Database (Without schema creation)
-- The purpose is to just fill an empty schema

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

----------------------------------------------------
-- Create all tables
----------------------------------------------------
CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.guilds (
  guild_id BIGINT NOT NULL,
  guild_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (guild_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.channels (
  guild_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  channel_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (channel_id),
  INDEX fk_channels_guilds_idx (guild_id ASC) VISIBLE,
  CONSTRAINT fk_channels_guilds
    FOREIGN KEY (guild_id)
    REFERENCES bkwtrdqkijpbr852tmj3.guilds (guild_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.users (
  author_id BIGINT NOT NULL,
  author_tag VARCHAR(37) NOT NULL,
  PRIMARY KEY (author_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.messages (
  message_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  message_content VARCHAR(2000) NOT NULL,
  date_sent DATE NOT NULL,
  time_sent TIME NOT NULL,
  PRIMARY KEY (message_id),
  INDEX fk_messages_channels1_idx (channel_id ASC) VISIBLE,
  INDEX fk_messages_guilds1_idx (guild_id ASC) VISIBLE,
  INDEX fk_messages_users1_idx (author_id ASC) VISIBLE,
  CONSTRAINT fk_messages_channels1
    FOREIGN KEY (channel_id)
    REFERENCES bkwtrdqkijpbr852tmj3.channels (channel_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_messages_guilds1
    FOREIGN KEY (guild_id)
    REFERENCES bkwtrdqkijpbr852tmj3.guilds (guild_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_messages_users1
    FOREIGN KEY (author_id)
    REFERENCES bkwtrdqkijpbr852tmj3.users (author_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.deleted_messages (
  message_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  message_content VARCHAR(2000) NOT NULL,
  date_deleted DATE NOT NULL,
  time_deleted TIME NOT NULL,
  PRIMARY KEY (message_id),
  INDEX fk_deleted_messages_guilds1_idx (guild_id ASC) VISIBLE,
  INDEX fk_deleted_messages_channels1_idx (channel_id ASC) VISIBLE,
  INDEX fk_deleted_messages_users1_idx (author_id ASC) VISIBLE,
  CONSTRAINT fk_deleted_messages_guilds1
    FOREIGN KEY (guild_id)
    REFERENCES bkwtrdqkijpbr852tmj3.guilds (guild_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_deleted_messages_channels1
    FOREIGN KEY (channel_id)
    REFERENCES bkwtrdqkijpbr852tmj3.channels (channel_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_deleted_messages_users1
    FOREIGN KEY (author_id)
    REFERENCES bkwtrdqkijpbr852tmj3.users (author_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bkwtrdqkijpbr852tmj3.edited_messages (
  message_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  before_edit_content VARCHAR(2000) NOT NULL,
  after_edit_content VARCHAR(2000) NOT NULL,
  date_edited DATE NOT NULL,
  time_edited TIME NOT NULL,
  PRIMARY KEY (message_id),
  INDEX fk_edited_messages_guilds1_idx (guild_id ASC) VISIBLE,
  INDEX fk_edited_messages_channels1_idx (channel_id ASC) VISIBLE,
  INDEX fk_edited_messages_users1_idx (author_id ASC) VISIBLE,
  CONSTRAINT fk_edited_messages_guilds1
    FOREIGN KEY (guild_id)
    REFERENCES bkwtrdqkijpbr852tmj3.guilds (guild_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_edited_messages_channels1
    FOREIGN KEY (channel_id)
    REFERENCES bkwtrdqkijpbr852tmj3.channels (channel_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_edited_messages_users1
    FOREIGN KEY (author_id)
    REFERENCES bkwtrdqkijpbr852tmj3.users (author_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

----------------------------------------------------
-- Create all views
----------------------------------------------------
CREATE OR REPLACE VIEW simple_messages AS
SELECT
	u.author_tag AS user,
  g.guild_name AS guild,
  c.channel_name AS channel,
  m.message_content AS content,
  m.date_sent,
  m.time_sent
FROM messages m
JOIN users u USING (author_id)
JOIN guilds g USING (guild_id)
JOIN channels c USING (channel_id)
ORDER BY time_sent, date_sent DESC;

CREATE OR REPLACE VIEW simple_deleted_messages AS
SELECT
	u.author_tag AS user,
  g.guild_name AS guild,
  c.channel_name AS channel,
  dm.message_content AS content,
  dm.date_deleted,
  dm.time_deleted
FROM deleted_messages dm
JOIN users u USING (author_id)
JOIN guilds g USING (guild_id)
JOIN channels c USING (channel_id)
ORDER BY time_deleted, date_deleted DESC;

CREATE OR REPLACE VIEW simple_edited_messages AS
SELECT
	u.author_tag AS user,
  g.guild_name AS guild,
  c.channel_name AS channel,
  em.before_edit_content AS before_edit,
  em.after_edit_content AS after_edit,
  em.date_edited,
  em.time_edited
FROM edited_messages em
JOIN users u USING (author_id)
JOIN guilds g USING (guild_id)
JOIN channels c USING (channel_id)
ORDER BY time_edited, date_edited DESC;

----------------------------------------------------
-- Create all stored procedures
----------------------------------------------------
DELIMITER $$

CREATE PROCEDURE on_message_state_update
(
	message_id BIGINT
)
BEGIN
	DELETE FROM messages m
  WHERE m.message_id = message_id;
END $$

CREATE PROCEDURE update_channel_name
(
	channel_id BIGINT,
  new_name VARCHAR(100)
)
BEGIN
	UPDATE channels c
  SET c.channel_name = new_name
  WHERE c.channel_id = channel_id;
END $$

CREATE PROCEDURE update_guild_name
(
	guild_id BIGINT,
  new_name VARCHAR(100)
)
BEGIN
	UPDATE guilds g
  SET g.guild_name = new_name
  WHERE g.guild_id = guild_id;
END $$

CREATE PROCEDURE update_guild_status
(
	guild_id BIGINT
)
BEGIN
	UPDATE guilds g
  SET status = "deleted"
  WHERE g.guild_id = guild_id;
  
  DELETE FROM channels
  WHERE g.guild_id = guild_id;
END $$

CREATE PROCEDURE update_user_tag
(
	  author_id BIGINT,
    new_tag VARCHAR(37)
)
BEGIN
	UPDATE users u
  SET u.author_tag = new_tag
  WHERE u.author_id = author_id;
END $$

----------------------------------------------------
-- Create all events
----------------------------------------------------
CREATE EVENT monthly_clear_logs
ON SCHEDULE
	EVERY 1 MONTH STARTS "2022-01-01"
DO BEGIN
	DELETE FROM messages;
  DELETE FROM deleted_messages;
  DELETE FROM edited_messages;
END $$

DELIMITER ;

-- Alter table character sets to accept emojis
ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE deleted_messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE edited_messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE channels CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE guilds CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;