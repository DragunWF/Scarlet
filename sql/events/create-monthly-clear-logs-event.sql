-- For clearing the logs every month and to save space...

DELIMITER $$
CREATE EVENT monthly_clear_logs
ON SCHEDULE
	EVERY 1 MONTH STARTS "2022-01-01"
DO BEGIN
	TRUNCATE messages;
    TRUNCATE deleted_messages;
    TRUNCATE edited_messages;
END $$

DELIMITER ;