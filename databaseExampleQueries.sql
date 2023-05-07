-- Creating a table

CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  type varcher(30) NOT NULL,
  price varchar(30) NOT NULL,
  description varchar(300)
);

-- Insterting product
INSERT INTO products
(name, type, price, description)
VALUES
('Scarpa', 'shoes', '149.9', 'Scarpa is a slightly prestressed climbing shoe.'),
('La Sportiva', 'shoes', '144.9', 'La Sportiva is a slightly prestressed climing shoe.'),
('Red Chili', 'shoes', '104.9', 'Red Chili is a strongly prestressed climbing shoe.'),
('eb', 'shoes', '119.9', 'eb is a strongly prestressed climbing shoe.'),
('Arcteryx', 'chalkbag', '25.0', 'Arcteryx is a big chalkbag, suitable for indoor and outdoor climbing.'),
('Black Diamond', 'chalkbag', '19.0', 'Black Diamond is a small chalkbag, suitable for indoor and outdoor climbing.'),
('Mammut', 'chalkbag', '40.0', 'Mammut is a medium sized chalkbag, suitable for indoor and outdoor climbing.'),
('Red Chili Bag', 'chalkbag', '16.0', 'Red Chili Bag is a small chalkbag, suitable for indoor and outdoor climbing.'),
('Forearm Trainer', 'other', '6.5', 'The forearm trainer is used to increase your forearm strength.'),
('Chalk Powder', 'other', '10.0', 'Chalk powder is used to keep your hands from slipping.'),
('Finger Tape', 'other', '8.0', 'Finger tape is used to protect your fingers from injuries.'),
('Brush', 'other', '8.5', 'A brush is used for cleaning the holds.');


-- Get all products
SELECT * FROM products
