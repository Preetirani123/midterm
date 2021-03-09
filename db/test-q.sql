SELECT sum(food_items_by_id) as total_orders, food_items_by_id as food
FROM orders
GROUP BY orders.id;
