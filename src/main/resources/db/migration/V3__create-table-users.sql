
create table users (
                       id bigserial primary key ,
                       nome varchar,
                       password varchar,
                       email varchar,
                       cpf varchar,
                       role_id int
);
