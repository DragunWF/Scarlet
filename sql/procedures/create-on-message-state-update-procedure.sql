USE scarlet_db;

DROP PROCEDURE IF EXISTS on_message_state_update;

DELIMITER $$
CREATE PROCEDURE on_message_state_update
(
	message_id BIGINT
)
BEGIN
	DELETE FROM messages m
    WHERE m.message_id = message_id;
END $$

DELIMITER ;