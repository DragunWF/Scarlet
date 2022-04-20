-- Drop all tables
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS deleted_messages;
DROP TABLE IF EXISTS edited_messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS guilds;

-- Drop all views
DROP VIEW IF EXISTS simple_messages;
DROP VIEW IF EXISTS simple_deleted_messages;
DROP VIEW IF EXISTS simple_edited_messages;

-- Drop all procedures
DROP PROCEDURE IF EXISTS on_message_state_update;
DROP PROCEDURE IF EXISTS update_guild_status;
DROP PROCEDURE IF EXISTS update_guild_name;
DROP PROCEDURE IF EXISTS check_user_tag_updates;
DROP PROCEDURE IF EXISTS insert_new_info;
DROP PROCEDURE IF EXISTS update_channel_name;

-- Drop all events
DROP EVENT IF EXISTS monthly_clear_logs