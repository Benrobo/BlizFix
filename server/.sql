CREATE DATABASE blizfix;


CREATE TABLE users(
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    pwd_hash TEXT NOT NULL,
    user_img TEXT NOT NULL,
    refresh_token TEXT,
    user_role INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- User role
-- User 1
-- Admin 2 

CREATE TABLE posts(
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    img TEXT NOT NULL,
    user_id TEXT NOT NULL,
    likes INT NOT NULL,
    dislikes INT NOT NULL,
    body TEXT NOT NULL,
    views INT NOT NULL,
    solution TEXT NOT NULL,
    user_role INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);