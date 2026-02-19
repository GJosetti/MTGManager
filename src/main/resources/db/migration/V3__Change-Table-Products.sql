ALTER TABLE products
    ADD COLUMN product_type VARCHAR(20);

UPDATE products
SET product_type = 'CARD'
WHERE card_id IS NOT NULL;

UPDATE products
SET product_type = 'SEALED'
WHERE card_id IS NULL;
