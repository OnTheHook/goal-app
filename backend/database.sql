-- for help \?

-- to list database \l

-- to connect to a database \c

-- create database CREATE DATABASE database_name

-- list all tables \d

-- details of specific table \d table_name

-- CREATE TABLE products (
--     id INT, 
--     name VARCHAR(50),
--     price INT,
--     on_sale boolean
-- );

-- CREATE TABLE restaurants (
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     location VARCHAR(50) NOT NULL,
--     price_range INT NOT NULL check(price_range >=1 and price_range <=5)
-- );

-- INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'new york', 3);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    -- Add other user details as needed
);

CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    goal_name VARCHAR(100) NOT NULL,
    goal_description TEXT,
    -- Add other goal details as needed
);

CREATE TABLE user_goals (
    user_id INT REFERENCES users(user_id),
    goal_id INT REFERENCES goals(goal_id),
    PRIMARY KEY (user_id, goal_id)
);

CREATE TABLE progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT,
    goal_id INT,
    progress_date DATE NOT NULL,
    progress_status VARCHAR(20) NOT NULL,
    -- Add other progress details as needed
    FOREIGN KEY (user_id, goal_id) REFERENCES user_goals(user_id, goal_id)
);