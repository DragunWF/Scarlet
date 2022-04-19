CREATE OR REPLACE VIEW simple_edited_messages AS
SELECT
	author_tag AS name,
    before_edit_content AS before_edit,
    after_edit_content AS after_edit,
    date_edited,
    time_edited
FROM edited_messages;

SELECT * FROM simple_edited_messages;