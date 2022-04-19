CREATE OR REPLACE VIEW simple_messages AS
SELECT
	u.author_tag AS name,
  m.message_content AS content,
  m.date_sent,
  m.time_sent
FROM messages m
JOIN users u USING (author_id)
ORDER BY time_sent, date_sent DESC;

SELECT * FROM simple_messages;
