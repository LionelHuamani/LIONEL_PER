CREATE TABLE customer (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,   
    name VARCHAR(60) NOT NULL,                  
    address VARCHAR(200) NOT NULL,              
    phone VARCHAR(20) NOT NULL,                 
    email VARCHAR(250) NOT NULL                 
);

SELECT * FROM customer;

DROP TABLE customer;
