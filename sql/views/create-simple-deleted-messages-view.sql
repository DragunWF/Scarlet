CREATE OR REPLACE VIEW simple_deleted_messages AS
SELECT
	author_tag AS name,
    message_content AS content,
    date_deleted,
    time_deleted
FROM deleted_messages;

SELECT * FROM simple_deleted_messages;