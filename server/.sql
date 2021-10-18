CREATE DATABASE blizfix;


CREATE TABLE users(
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    pwd_hash TEXT NOT NULL,
    user_img TEXT NOT NULL,
    profession TEXT NOT NULL,
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
    image_url bytea NOT NULL,
    image_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    likes INT NOT NULL,
    dislikes INT NOT NULL,
    slug TEXT NOT NULL,
    views INT NOT NULL,
    description TEXT NOT NULL,
    user_role INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE reaction(
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    like_count INT NOT NULL,
    user_role INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- JOIN USER AND POSTS TABLE
SELECT posts.id,users.id,user_img,posts.id,posts.created_at,title,slug,description,image_url,image_id,likes,views FROM posts INNER JOIN users ON users.id=posts.user_id ORDER BY posts.created_at