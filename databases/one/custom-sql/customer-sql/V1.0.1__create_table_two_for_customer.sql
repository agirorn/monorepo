CREATE TABLE IF NOT EXISTS two (
    id SERIAL,
    name text,
    custom_column: text,
    CONSTRAINT two_pkey PRIMARY KEY (id)
);
