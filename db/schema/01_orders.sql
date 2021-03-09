-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
  food_items_by_id INTEGER ARRAY,
  order_time TIMESTAMP,
  order_fulfilled BOOLEAN DEFAULT FALSE,
  est_time VARCHAR(255) DEFAULT NULL

);


