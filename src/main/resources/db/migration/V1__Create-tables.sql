

CREATE TYPE book_state AS ENUM (
    'emprestado',
    'devolvido',
    'atrasado'
);


CREATE TABLE roles (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       description VARCHAR(255)
);


CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       nome VARCHAR(150) NOT NULL,
                       email VARCHAR(150) UNIQUE NOT NULL,
                       cpf VARCHAR(14) UNIQUE NOT NULL,
                       role_id BIGINT REFERENCES roles(id)
);


CREATE TABLE clientes (
                          user_id BIGINT
                              PRIMARY KEY
                              REFERENCES users(id)
                                  ON DELETE CASCADE
);


CREATE TABLE funcionarios (
                              user_id BIGINT
                                  PRIMARY KEY
                                  REFERENCES users(id)
                                      ON DELETE CASCADE
);


CREATE TABLE autores (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(150) NOT NULL
);


CREATE TABLE sections (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL
);


CREATE TABLE books (
                       id BIGSERIAL PRIMARY KEY,
                       title VARCHAR(200) NOT NULL,
                       author_id BIGINT REFERENCES autores(id),
                       release_date DATE,
                       isbn VARCHAR(20) UNIQUE,
                       section_id BIGINT REFERENCES sections(id),
                       description VARCHAR(500),
                       image VARCHAR(255),
                       available BOOLEAN DEFAULT TRUE
);


CREATE TABLE emprestimos (
                             id BIGSERIAL PRIMARY KEY,
                             user_id BIGINT REFERENCES users(id),
                             book_id BIGINT REFERENCES books(id),
                             state book_state NOT NULL
);
