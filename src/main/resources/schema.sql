-- Crear la tabla
CREATE TABLE customer (
    id INT IDENTITY(1,1) PRIMARY KEY,
    dni CHAR(8) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    state CHAR(1) NOT NULL
);

CREATE TABLE product (
    id INT IDENTITY(1,1) PRIMARY KEY,   
    name VARCHAR(60) NOT NULL,                  
    description VARCHAR(200) NOT NULL,              
    unit_price DECIMAL(4,2) NOT NULL,                 
    state CHAR(1) NOT NULL                 
);

SELECT * FROM product;

DROP TABLE product;