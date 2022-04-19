USE scarlet_db;

DROP PROCEDURE IF EXISTS update_channel_name;

DELIMITER $$
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

DELIMITER ;