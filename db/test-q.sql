
const values = [YOUR STRING];

UPDATE orders
SET est_time = $1 <-----values
WHERE orders.id = 1, values; <-- i forgot this

-- UPDATE table_name
-- SET column1 = value1
-- WHERE condition;
