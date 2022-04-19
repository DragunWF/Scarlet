DROP PROCEDURE IF EXISTS update_guild_name;

DELIMITER $$
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

DELIMITER ;