
$(document).ready(function() {
  placeOrder();
  addHeadToCheckoutListener();
});

//GLOBAL VARS
let _menu = [];
let _cart = [];


//adds item to cart
const addToCart = menu_id => {

  for (const item of _menu) {

    if (Number(menu_id) === Number(item.id))   {
     _cart.push(item);
     return $('#cart_size').html(`${_cart.length}`);
    }
  }
};

//adds a listener event to the headToCheckout Function
const addHeadToCheckoutListener = () => {

  $('#head_to_checkout').on('click', () => {
    headToCheckout();
  });
};

//builds the checkout html element
const headToCheckout = () => {

  if(!_cart || _cart.length < 1) {
    return alert("You have no items in your cart.");
  }

  const orderElements = [];
  let totalPrice = 0;

  $orderDetails = `
  <div>
  <h1>${sessionStorage.getItem('username')}'s Order</h1>
  </div>
  `
  orderElements.push($orderDetails);

  for (const item of _cart) {

    let $orderDetails = `
    <section>
    <img src='${item.image_url}'/>
    <h3>${item.food_item}</h3>
    <h3>$${item.price}</h3>
    <button id=${item.id} onclick="removeFromCart(this.id)">remove item</button>
    </section>
    `
    orderElements.push($orderDetails);
    totalPrice += Number(item.price);
  }

    $orderDetails = `
    <div>
    <h2>Order Total: $${totalPrice}</h2>
    </div>
    `
    orderElements.push($orderDetails);
    return renderCheckoutPage(orderElements);
};

//takes an html element as an args and renders the users checkout details
const renderCheckoutPage = order => {

  $('#item-container').fadeOut('fast');
  $('#order-container').fadeIn('slow');

  for (const item of order){
    $("#order-container").append(item);
  }

  setTimeout(function(){
    window.scrollTo({
      top: 450,
      left: 0,
      behavior: 'smooth'
    });
  }, 1000);

};

//removes an item from the users cart by fetching its ID and re-rendes the order-container
const removeFromCart = (menu_id) => {

    for (let i = 0; i < _cart.length; i++) {

      if (Number(menu_id) === Number(_cart[i].id)) {

        _cart.splice(i, 1);
        $('#cart_size').html(`${_cart.length}`);
        $('#order-container').css('display', 'none');
        $('#order-container').html('');

        if (_cart.length < 1){
          return $("#item-container").fadeIn('slow');
        } else {
          return headToCheckout();
        }
      }
    }

  };


//allows the user to place an order
const placeOrder = () => {

  $('#place_order').on('click', (event) => {
    event.preventDefault();

    const testData = {
      user: sessionStorage.getItem('pseudoUser'),
      menu_items: _cart
    }

    $.ajax({
      url: '/api/place_orders',
      type: 'POST',
      data: testData,

      success: data => {
        console.log('Order ID: ',data)
        cart = [];
        $('#cart_size').html(`${cart.length}`);
        fetchOrderDetails(data);
      },
      error: error => {
        console.log(error.responseText);
      },
    });

  });
};

//fetches the users recently placed order by order_id.
const fetchOrderDetails = id => {

  const url = `/api/fetch_orders/${id}`;

  $.ajax({
    url: url,
    type: 'GET',

    success: data => {

  //---> USE DATA OBJECT TO POPULATE BRWOSERS ORDER UPDATE
    createOrderPlacedElement(data.order);
     console.log(createOrderPlacedElement(data.order));

    },
    error: error => {
      console.log(error.responseText);
    },
  });

};

// creates an order success html elements from the fetched order data;
const createOrderPlacedElement = orderData => {

  const waitTime = Number(orderData.est_time) * 60 * 1000;
  const pickUpTime = new Date(new Date().getTime() + waitTime).toLocaleTimeString();

  const $orderMSg = `<article>
  <h2>
  Thank you ${orderData.customer}, your order has been placed successfully!
  A second notification has been sent to your mobile device at ${orderData.phone}.
  </h2>
  <h3>
  Estimated Wait Time
  </h3>
  <h3>
  ${orderData.est_time} minutes
  </h3>
  <h3>
  Pick-Up Time
  </h3>
  <h3>
  ${pickUpTime}
  </h3>
  <p>Thank you for dining with us 🙏</p>
  </article>`

  return $orderMSg;
};

















