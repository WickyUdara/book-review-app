CREATE TABLE IF NOT EXISTS public.read_books
(
    id integer NOT NULL DEFAULT nextval('read_books_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    author_name character varying(50) COLLATE pg_catalog."default",
    review text COLLATE pg_catalog."default",
    isbn character varying(50) COLLATE pg_catalog."default",
    rating integer,
    CONSTRAINT read_books_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.read_books
    OWNER to postgres;