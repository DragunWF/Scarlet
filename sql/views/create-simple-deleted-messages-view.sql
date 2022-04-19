CREATE OR REPLACE VIEW simple_deleted_messages AS
SELECT
	u.author_tag AS user,
  g.guild_name AS guild,
  c.channel_name AS channel,
  dm.message_content AS content,
  dm.date_deleted,
  dm.time_deleted
FROM deleted_messages dm
JOIN users u USING (author_id)
JOIN guilds g USING (guild_id)
JOIN channels c USING (channel_id)
ORDER BY time_deleted, date_deleted DESC;

SELECT * FROM simple_deleted_messages;