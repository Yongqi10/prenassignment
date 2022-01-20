CREATE DATABASE Movies;

CREATE TABLE movie (
    movie_id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- need extension for uuid in pg
-- create extension if not exists "uuid-ossp";
CREATE TABLE users (

    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(225) NOT NULL,
    password VARCHAR(225) NOT NULL,
    name VARCHAR(225) NOT NULL
    );

    -- inser user

    INSERT INTO users(username,password,name) VALUES('yongqi','s123','yongqi');