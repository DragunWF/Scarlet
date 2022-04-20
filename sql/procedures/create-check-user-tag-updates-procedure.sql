DROP PROCEDURE IF EXISTS check_user_tag_updates;

DELIMITER $$
CREATE PROCEDURE check_user_tag_updates
(
	author_id BIGINT,
    new_tag VARCHAR(37)
)
BEGIN
	UPDATE users u
    SET u.author_tag =
		CASE
			WHEN u.author_tag != new_tag THEN new_tag
            ELSE u.author_tag
		END
    WHERE u.author_id = author_id;
END $$

DELIMITER ;