CREATE TABLE IF NOT EXISTS two (
    id SERIAL,
    name text,
    ${CUSTOM_COLUMN_NAME} text,
    CONSTRAINT two_pkey PRIMARY KEY (id)
);
