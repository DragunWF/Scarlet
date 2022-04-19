-- For clearing the logs every month and to save space...

DROP EVENT IF EXISTS monthly_clear_logs;

DELIMITER $$
CREATE EVENT monthly_clear_logs
ON SCHEDULE
	EVERY 1 MONTH STARTS "2022-01-01"
DO BEGIN
  DELETE FROM messages;
  DELETE FROM deleted_messages;
  DELETE FROM edited_messages;
END $$

DELIMITER ;