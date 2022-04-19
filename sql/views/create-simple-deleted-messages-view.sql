CREATE OR REPLACE VIEW simple_deleted_messages AS
SELECT
  u.author_tag AS name,
  dm.message_content AS content,
  dm.date_deleted,
  dm.time_deleted
FROM deleted_messages dm
JOIN users u USING (author_id)
ORDER BY time_deleted, date_deleted DESC;

SELECT * FROM simple_deleted_messages;