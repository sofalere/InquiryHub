CREATE TYPE method_type AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'DELETE');

CREATE TABLE bins (
  id serial PRIMARY KEY,
  endpoint text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  method method_type NOT NULL,
  path text NOT NULL,
  mongo_id text UNIQUE NOT NULL,
  bin_id integer NOT NULL REFERENCES bins (id)
);
