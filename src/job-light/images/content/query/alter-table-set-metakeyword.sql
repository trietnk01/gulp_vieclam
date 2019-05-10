UPDATE employer SET meta_keyword = LOWER(fullname);
UPDATE employer SET meta_description = LOWER(fullname);
UPDATE recruitment SET meta_keyword = LOWER(fullname);
UPDATE recruitment SET meta_description = LOWER(fullname);