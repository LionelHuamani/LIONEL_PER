-- Active: 1746857006820@@127.0.0.1@1433@model
-- insertamos datos en customer
INSERT INTO customer (name, address, type_document, number_document, phone, email)
VALUES 
('Juan Perez', 'Av. Las Palmas 123', 'DNI','62273282','989654921', 'juanperez@example.com'),
('Maria Lopez', 'Jr. Los Sauces 456', 'INE','233912345678234','987654321','marialopez@example.com'),
('Carlos Ramos', 'Calle Las Gardenias 789', 'INE','45678234', '998877665', 'carlosramos@example.com');


INSERT INTO product (name, description, unit_price, state,stock) 
VALUES 
    ('Martillo', 'Martillo de acero con mango de madera', 12, 'A','20'),
    ('Destornillador', 'Destornillador de punta Phillips con mango ergonómico', 49, 'A','30'),
    ('Taladro', 'Taladro de 12 voltios con batería de litio', 79, 'A','55'),
    ('Sierra', 'Sierra circular de 7.25 pulgadas con hoja de metal', 19, 'A','50'),
    ('Clavos', 'Clavos de acero galvanizado de 2 pulgadas', 99, 'A','140'),
    ('Tornillos', 'Tornillos para madera de 2 pulgadas, cabeza plana', 7.99, 'I','130');