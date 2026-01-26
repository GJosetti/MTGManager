
CREATE TYPE payment_method_enum AS ENUM (
    'CASH',
    'CREDIT_CARD',
    'DEBIT_CARD',
    'PIX'
);

CREATE TYPE sale_status_enum AS ENUM (
    'OPEN',
    'FINISHED',
    'CANCELED'
);

CREATE TYPE product_condition_enum AS ENUM (
    'NM',
    'SP',
    'MP',
    'HP',
    'DMG'
);

-- =========================
-- TABELAS
-- ========================

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(255),
                       email VARCHAR(255),
                       password VARCHAR(255),
                       cpf VARCHAR(20),
                       role_id BIGINT
);


CREATE TABLE cards (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(255),
                       mana_cost VARCHAR(50),
                       oracle_text TEXT,
                       type_line VARCHAR(255),
                       rarity VARCHAR(50),
                       set VARCHAR(20),
                       collector_number VARCHAR(20),
                       image_url TEXT
);


CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,

                          card_id BIGINT,

                          condition product_condition_enum,
                          language VARCHAR(20),
                          foil BOOLEAN,

                          quantity BIGINT,

                          buy_price DECIMAL,
                          sell_price DECIMAL,

                          last_price_update TIMESTAMP,

                          CONSTRAINT fk_products_card
                              FOREIGN KEY (card_id)
                                  REFERENCES cards(id)
);

CREATE TABLE sale (
                      id BIGSERIAL PRIMARY KEY,

                      client_id BIGINT,

                      total_value DECIMAL,
                      created_at TIMESTAMP,

                      payment_method payment_method_enum,
                      status sale_status_enum,

                      CONSTRAINT fk_sale_client
                          FOREIGN KEY (client_id)
                              REFERENCES users(id)
);


CREATE TABLE sale_item (
                           id BIGSERIAL PRIMARY KEY,

                           sale_id BIGINT,
                           product_id BIGINT,

                           unit_price BIGINT,
                           quantity BIGINT,

                           CONSTRAINT fk_sale_item_sale
                               FOREIGN KEY (sale_id)
                                   REFERENCES sale(id),

                           CONSTRAINT fk_sale_item_product
                               FOREIGN KEY (product_id)
                                   REFERENCES products(id)
);
