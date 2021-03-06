-- Menu table seeds here (Example)
INSERT INTO order (user_id, menu_id, order_time) VALUES (1, 1, now());
INSERT INTO order (user_id, menu_id, order_time) VALUES (2, 2, now());
INSERT INTO order (user_id, menu_id, order_time) VALUES (3, 3, now());








CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
  order_time TIMESTAMP,
  order_fulfilled BOOLEAN DEFAULT FALSE
);
