

CREATE TABLE users (
    id       integer, 
    name     varchar(80) not null,
    password varchar(255) not null,
    PRIMARY  KEY(id)
);

INSERT INTO users (id, name, password) VALUES (1, 'ikegaya', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e');



