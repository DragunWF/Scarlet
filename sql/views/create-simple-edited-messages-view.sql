CREATE OR REPLACE VIEW simple_edited_messages AS
SELECT
	u.author_tag AS user,
  g.guild_name AS guild,
  c.channel_name AS channel,
  em.before_edit_content AS before_edit,
  em.after_edit_content AS after_edit,
  em.date_edited,
  em.time_edited
FROM edited_messages em
JOIN users u USING (author_id)
JOIN guilds g USING (guild_id)
JOIN channels c USING (channel_id)
ORDER BY time_edited, date_edited DESC;

SELECT * FROM simple_edited_messages;