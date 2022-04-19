-- Drop all tables
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS deleted_messages;
DROP TABLE IF EXISTS edited_messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guilds;
DROP TABLE IF EXISTS channels;

-- Drop all views
DROP VIEW IF EXISTS simple_messages;
DROP VIEW IF EXISTS simple_deleted_messages;
DROP VIEW IF EXISTS simple_edited_messages;

-- Drop all procedures
DROP PROCEDURE IF EXISTS on_message_state_update;
DROP PROCEDURE IF EXISTS update_guild_status;
DROP PROCEDURE IF EXISTS update_guild_name;
DROP PROCEDURE IF EXISTS update_user_tag;
DROP PROCEDURE IF EXISTS update_channel_name;