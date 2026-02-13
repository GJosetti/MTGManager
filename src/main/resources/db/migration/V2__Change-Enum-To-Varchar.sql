ALTER TABLE products
ALTER COLUMN condition TYPE varchar(20)
USING condition::text;

ALTER TABLE sale
ALTER COLUMN payment_method TYPE varchar(20)
USING payment_method::text;

ALTER TABLE sale
ALTER COLUMN status TYPE varchar(20)
USING status::text;

DROP TYPE IF EXISTS payment_method_enum;
DROP TYPE IF EXISTS sale_status_enum;
DROP TYPE IF EXISTS product_condition_enum;