create table users(
    id serial not null primary key,
	name text not null,
    counter int not null
);

-- sudo -u postgres createdb my_users;
-- grant all privileges on database my_users to coder;
