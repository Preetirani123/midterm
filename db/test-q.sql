INSERT INTO orders (user_id, menu_id, food_items_by_id, order_time)
    VALUES (1, 1, ARRAY [1,2], now())
    RETURNING orders.id;
