const concatFoodItems = (items) => {
  const flatten = new Set(items);
  const food_items = [...flatten];
  let foodString = "";

  if (food_items.length === 1) {
    foodString = food_items[0];
    return foodString;
  }

  for (let i = 0; i < food_items.length; i++) {
    if (i === food_items.length - 1) {
      foodString += ` and ${food_items[i]}`;
    } else {
      foodString += ` ${food_items[i]},`;
    }
  }
  return foodString;
};

module.exports = concatFoodItems;
