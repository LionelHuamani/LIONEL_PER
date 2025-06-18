-- Active: 1748310992851@@127.0.0.1@1433@model
CREATE TABLE customer (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,   
    name VARCHAR(60) NOT NULL,                  
    address VARCHAR(200) NOT NULL,
    type_document CHAR(3) NOT NULL,
	number_document CHAR(15) NOT NULL,              
    phone VARCHAR(20) NOT NULL,                 
    email VARCHAR(250) NOT NULL                 
);

SELECT * FROM customer;

DROP TABLE customer;

CREATE TABLE product (
    id INT IDENTITY(1,1) PRIMARY KEY,   
    name VARCHAR(60) NOT NULL,                  
    description VARCHAR(200) NOT NULL,              
    unit_price DECIMAL(4,2) NOT NULL,                
    state CHAR(1) NOT NULL CHECK (state IN ('A', 'I')),
    stock INT NOT NULL CHECK (stock >= 0)                 
);

SELECT * FROM product;

DROP TABLE product;