CREATE TABLE IF NOT EXISTS one (
    id SERIAL,
    name TEXT NOT NULL,
    real_name TEXT,
    CONSTRAINT one_pkey PRIMARY KEY (id)
);
