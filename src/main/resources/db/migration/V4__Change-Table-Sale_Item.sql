ALTER TABLE sale_item
ALTER COLUMN unit_price TYPE numeric(38,2)
USING unit_price::numeric;