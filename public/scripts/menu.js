//add an on menu clicked listener
const addMenuClickedListener = () => {
  $('#menu_btn').on('click', () => {
    navToMenu();
  });
};

//shows main menu
const navToMenu = () => {
  $('#search').fadeIn('slow');
  $('.fas-right').fadeIn('slow');
  $('#quick-order').css('display','flex');
  $('#order-container').css('display', 'none');
  $('#order-container').html('');
  $("#item-container").fadeIn('slow');
  scrollIntoView();
}

//populates page with items from menu db

const createMenuElement = function (data) {

  const $menu = $(`
  <div class="item-menu">
    <div class="image">
    <img src="${data.image_url}">
    </div>
    <h3>${data.food_item}</h3>
    <p>${data.nation}</p>
    <p class="discrib">${data.description}</p>
    <div class="cart-container">
      <p class="cost-price">Cost $${data.price}</p>
      <div class="quantity">
        <p class="cost-price">Rating </p>
      </div>
    </div>
    <div class="add-cart">
      <span id=${data.id} onclick="addToCart(this.id)" ><i class="fab fa-opencart"></i>Add to cart</span>
    </div>
  </div>`);
  return $menu;
};

//ajax call to retrieve menu db info

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
