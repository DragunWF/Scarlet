DROP PROCEDURE IF EXISTS update_guild_status;

DELIMITER $$
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

DELIMITER ;