
const createMenuElement = function (data) {

  const $menu = $(`
  <div class="item-menu">
    <div class="image">
    <img src="${data.image_url}">
    </div>
    <h3>${data.food_item}</h3>
    <p>${data.nation}</p>
    <p>${data.description}</p>
    <div class="cart-container">
      <p>$${data.price}</p>
      <div class="quantity">
        <button class="plus-btn" type="button" name="button">
          <i class="fas fa-plus"></i>
        </button>
        <input type="text" name="name" value="1" width= "54px">
        <button class="minus-btn" type="button" name="button" >
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="add-cart">
      <span id=${data.id} onclick="addToCart(this.id)" ><i class="fab fa-opencart"></i>Add to cart</span>
    </div>
  </div>`);
  return $menu;
};

const fetchMenu = () => {
  const url = `/api/menu`;

  $.ajax({
    url: url,
    type: "GET",
    success: (data) => {
      //Declared a global menu variable for use in checkout flow
      _menu = data.menu;

      for (const items of data.menu) {
        $("#item-container").append(createMenuElement(items));
      }
    },
    error: (error) => {
      console.log(error.responseText);
    },
  });
};
