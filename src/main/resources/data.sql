-- Active: 1748310992851@@127.0.0.1@1433@model
-- insertamos datos en customer
INSERT INTO customer (name, address, type_document, number_document, phone, email)
VALUES 
('Juan Perez', 'Av. Las Palmas 123', 'DNI','62273282','989654921', 'juanperez@example.com'),
('Maria Lopez', 'Jr. Los Sauces 456', 'INE','233912345678234','987654321','marialopez@example.com'),
('Carlos Ramos', 'Calle Las Gardenias 789', 'INE','45678234', '998877665', 'carlosramos@example.com');


INSERT INTO product (name, description, category, unit_price, registration_date, state, stock) 
VALUES 
    ('Martillo', 'Martillo de acero con mango de madera', 'Herramientas', 12.55, '2025-06-26', 'A', 20),
    ('Destornillador', 'Destornillador de punta Phillips con mango ergonómico', 'Herramientas', 49.59, '2025-06-25', 'A', 30),
    ('Taladro', 'Taladro de 12 voltios con batería de litio', 'Herramientas', 79.99, '2025-06-24', 'A', 55),
    ('Sierra', 'Sierra circular de 7.25 pulgadas con hoja de metal', 'Herramientas', 19.59, '2025-06-27', 'A', 50),
    ('Clavos', 'Clavos de acero galvanizado de 2 pulgadas', 'Ferretería', 99.79, '2025-06-28', 'A', 140),
    ('Tornillos', 'Tornillos para madera de 2 pulgadas, cabeza plana', 'Ferretería', 7.99, '2025-06-29', 'I', 130);