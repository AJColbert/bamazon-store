DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(6, 2) NOT NULL,
	stock_quantity INTEGER(10)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Drill", "Hardware", 32.97, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Saw", "Hardware", 72.97, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Laptop", "Electronics", 332.97, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Ipod", "Electronics", 132.97, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hammer", "Hardware", 19.97, 132);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Couch", "Home", 55.97, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Chair", "Home", 52.97, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Table", "Home", 99.97, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Ipad", "Electronics", 232.97, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Fridge", "Kitchen", 245.97, 3);


SELECT item_id, product_name, price, stock_quantity FROM products;

