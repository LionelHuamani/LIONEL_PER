-- Crear el registro si es que no se duplican datos unicos o se insertan datos nulos
INSERT INTO customer (name, address, phone, email)
VALUES 
('Juan Perez', 'Av. Las Palmas 123', '987654321', 'juanperez@example.com'),
('Maria Lopez', 'Jr. Los Sauces 456', '912345678', 'marialopez@example.com'),
('Carlos Ramos', 'Calle Las Gardenias 789', '998877665', 'carlosramos@example.com');


INSERT INTO product (name, description, unit_price, state) 
VALUES 
    ('Martillo de 16 onzas', 'Martillo de acero con mango de madera', 12.99, 'A'),
    ('Destornillador Phillips', 'Destornillador de punta Phillips con mango ergonómico', 4.99, 'A'),
    ('Taladro inalámbrico', 'Taladro de 12 voltios con batería de litio', 79.99, 'A'),
    ('Sierra circular', 'Sierra circular de 7.25 pulgadas con hoja de metal', 119.99, 'A'),
    ('Clavos de acero', 'Clavos de acero galvanizado de 2 pulgadas', 9.99, 'A'),
    ('Tornillos para madera', 'Tornillos para madera de 2 pulgadas, cabeza plana', 7.99, 'A