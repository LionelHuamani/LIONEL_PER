-- Active: 1757555051522@@127.0.0.1@1521@XEPDB1@DEVELOPER
-- insertamos datos en customer
INSERT INTO customer (name, address, type_document, number_document, phone, email, birth_date, state)
VALUES 
('Juan Perez', 'Av. Las Palmas 123', 'DNI', '62273282', '989654921', 'juanperez@example.com', '1990-05-12', 'A'),
('Maria Lopez', 'Jr. Los Sauces 456', 'CNE', '233912345678234', '987654321', 'marialopez@example.com', '1985-08-22', 'A'),
('Carlos Ramos', 'Calle Las Gardenias 789', 'CNE', '45678234', '998877665', 'carlosramos@example.com', '1992-03-30', 'A');


INSERT INTO product (name, description, category, unit_price, registration_date, state, stock) 
VALUES 
    ('Martillo', 'Martillo de acero con mango de madera', 'Herramientas', 12.55, '2025-06-26', 'A', 20),
    ('Destornillador', 'Destornillador de punta Phillips con mango ergonómico', 'Herramientas', 49.59, '2025-06-25', 'A', 30),
    ('Taladro', 'Taladro de 12 voltios con batería de litio', 'Herramientas', 79.99, '2025-06-24', 'A', 55),
    ('Sierra', 'Sierra circular de 7.25 pulgadas con hoja de metal', 'Herramientas', 19.59, '2025-06-27', 'A', 50),
    ('Clavos', 'Clavos de acero galvanizado de 2 pulgadas', 'Ferretería', 99.79, '2025-06-28', 'A', 140),
    ('Tornillos', 'Tornillos para madera de 2 pulgadas, cabeza plana', 'Ferretería', 7.99, '2025-06-29', 'I', 130);


INSERT INTO customer (name, address, type_document, number_document, phone, email, birth_date, state)
VALUES ('Juan Pérez', 'Av. Los Olivos 123', 'DNI', '12345678', '987654321', 'juan.perez@email.com', TO_DATE('1985-05-20','YYYY-MM-DD'), 'A');

-- Inserción en la tabla product
INSERT INTO product (name, description, unit_price, state)
VALUES ('Laptop HP', 'Laptop HP 15 pulgadas, i5, 8GB RAM', 2500.00, 'A');

INSERT INTO sale (customer_id, sale_date, total, state)
VALUES (1, SYSTIMESTAMP, 2500.00, 'A');

-- Inserción en la tabla sale_detail
INSERT INTO sale_detail (sale_id, product_id, quantity, subtotal, state)
VALUES (1, 1, 1, 2500.00, 'A');