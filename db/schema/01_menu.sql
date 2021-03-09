-- Drop and recreate Menu table (Example)
DROP TABLE IF EXISTS menu CASCADE;

CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  nation VARCHAR(255) NOT NULL,
  food_item VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER,
  image_url VARCHAR(255),
  active BOOLEAN DEFAULT TRUE
);
