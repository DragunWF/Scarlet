DROP PROCEDURE IF EXISTS update_user_tag;

DELIMITER $$
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

DELIMITER ;