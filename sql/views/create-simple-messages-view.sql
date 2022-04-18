USE scarlet_db;

CREATE OR REPLACE VIEW simple_messages AS
SELECT
	author_tag AS name,
    message_content AS content,
    date_sent,
    time_sent
FROM messages;

SELECT * FROM simple_messages;
