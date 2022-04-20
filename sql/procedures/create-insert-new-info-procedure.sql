DROP PROCEDURE IF EXISTS insert_new_info;

DELIMITER $$
CREATE PROCEDURE insert_new_info
(
	new_guild_id BIGINT,
	new_guild_name VARCHAR(100),
	new_channel_id BIGINT,
	new_channel_name VARCHAR(100),
	new_author_id BIGINT,
	new_author_tag VARCHAR(37)
)
BEGIN
	INSERT IGNORE INTO guilds
    SET guild_id = new_guild_id,
		new_guild_name = new_guild_name;
	
    INSERT IGNORE INTO channels
    SET guild_id = new_guild_id,
		channel_id = new_channel_id,
		channel_name = new_channel_name;
	
    INSERT IGNORE INTO users
    SET author_id = new_author_id,
		author_tag = new_author_tag;
END $$

DELIMITER ;