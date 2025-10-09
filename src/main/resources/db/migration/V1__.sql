alter table users
    add constraint unique_user_name unique (username),
    add constraint unique_email unique (email);