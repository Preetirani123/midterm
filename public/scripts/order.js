//GLOBAL VARS
let _menu = [];
let _cart = [];

//adds order item to cart
const addToCart = menu_id => {

  for (const item of _menu) {

    if (Number(menu_id) === Number(item.id))   {
     _cart.push(item);
     $('#added_to_cart').html(`${item.food_item} Added To Cart`);
     $('#added_to_cart').fadeIn('slow');
     setTimeout(function(){
     $('#added_to_cart').slideUp('slow');
     },1000);
     return $('#cart_size').html(`${_cart.length}`);
    }
  }

};

//adds a listener event to the headToCheckout function
const addHeadToCheckoutListener = () => {

  $('#head_to_checkout').on('click', () => {
    headToCheckout();
  });
};

//builds the checkout html element
const headToCheckout = () => {

  if(!_cart || _cart.length < 1) {
    $('#added_to_cart').html(`You have no items in your cart`);
    $('#added_to_cart').fadeIn('slow');
    setTimeout(function(){
    $('#added_to_cart').slideUp('slow');
    },2000);
    return;
  }
  $('#search').fadeOut('slow');
  $('.fas-right').fadeOut('slow');
  $('#quick-order').css('display','none');
  $('#order-container').css('display', 'none');
  $('#order-container').html('');

  const orderElements = [];
  let totalPrice = 0;
  $orderDetails = `
  <div id='order-title'>
  <h1>${sessionStorage.getItem('username')}'s Order</h1>
  </div>
  `
  orderElements.push($orderDetails);

  //bundles the same menu items together for the UI update
  const sorted = sortObjArrayById(_cart);
  const reduce = reduceObjArrayById(sorted);
  bundleCartItems(sorted, reduce);
  //---------------

  for (const item of reduce) {

    let $orderDetails = `
    <section>
    <img src='${item.image_url}'/>
    <h3>${item.food_item} <label>(${item.qt})</label></h3>
    <h3>$${item.price}</h3>
    <button id=${item.id} onclick="removeFromCart(this.id)">remove item</button>
    </section>
    `
    orderElements.push($orderDetails);
    totalPrice += Number(item.price * item.qt);
  }

    $orderDetails = `
    <div class='order-footer'>
    <h2>Order Total: $${totalPrice}</h2>
    <button id='place_order'>Place Order</button>
    </div>
    `
    orderElements.push($orderDetails);
    return renderCheckoutPage(orderElements);
};

//takes the array of html elements as an args and renders the users checkout details
const renderCheckoutPage = order => {

  $('#item-container').css('display', 'none');
  $('#order-container').fadeIn('slow');

  for (const item of order){
    $("#order-container").append(item);
  }
  scrollIntoView();
  addPlaceOrderListener(); //set after order-container is rendered
};

//removes an item from the users cart and re-renders the order-container
const removeFromCart = (menu_id) => {

    for (let i = 0; i < _cart.length; i++) {

      if (Number(menu_id) === Number(_cart[i].id)) {

        _cart.splice(i, 1);
        $('#cart_size').html(`${_cart.length}`);

        if (_cart.length < 1){

          return navToMenu();
        } else {
          return headToCheckout();
        }
      }
    }

  };

//allows the current user to place an order
const addPlaceOrderListener = () => {

  $('#place_order').on('click', () => {

    const food_items = _cart.map(x => x = x.food_item);
    const menu_ids = _cart.map(x => x = x.id);

    const orderData = {
      user: sessionStorage.getItem('pseudoUser'),
      food_items: food_items,
      menu_items: menu_ids,
    }

    $.ajax({
      url: '/api/place_orders',
      type: 'POST',
      data: orderData,

      success: data => {
        $("#complete-container").append(processingOrderAnimation);
        $("#complete-container").fadeIn('slow');
        $(".inner-complete-container").slideDown('slow');

        //test function for simulating SMS received update
        simulateSMS();

      },
      error: error => {
        console.log(error.responseText);
      },
    });

  });
};

//creates a spinner animation while the SMS functionality is being handled
const processingOrderAnimation = () => {

  const $processing = `<section class='inner-complete-container'>
  <h2>Order Received</h2>
  <h4>Calculating estimated wait time...</h4>
  <div class="sending"></div>
  </section>`;

  return $processing;
};

// updates the browser with estimated time info from SMS update;
const createOrderPlacedElement = () => {

  const minutes = 30; // TEST VALUE
  const waitTime = Number(minutes) * 60 * 1000;
  const pickUpTime = new Date(new Date().getTime() + waitTime).toLocaleTimeString();

  const $orderMSg = `<section class='final-complete-container'>
  <div style='width:50px'><a href='/'><h6>menu<h6></a></div>
  <h4>
  Your order will be ready in
  </h4>
  <p>
  ${minutes} minutes
  </p>
  <h4>
  Pick-Up Time
  </h4>
  <p>
  ${pickUpTime}
  <p>
  <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=Stanley+Park+Vancouver+BC&travelmode=bicycling' target='_blank'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2aQejmdcLqj9jgx9LMaOwaAM0YDZpAkMohg&usqp=CAU'/></a>
  </section>`;

  _cart = [];
  $('#cart_size').html(`${_cart.length}`);
  return $orderMSg;
};


//fetches the current users past orders
const addQuickOrderListener = () => {

  $('#quick-order').on('click', () => {

  const id = sessionStorage.getItem('pseudoUser');
  const url = `/api/quick_orders/${id}`;
  _cart = [];

  if(!id){
    return alert('Order History Not Found');
  }

  $.ajax({
    url: url,
    type: 'GET',

    success: data => {
      quickOrderElement(data.orders);
    },
    error: error => {
      console.log(error.responseText);
    },
  });
});
}

//display the users past orders
const quickOrderElement = lastOrder => {

  if(!lastOrder){
    return alert('You must have at least one previous order with us to utilize quick order.');
  }

  for (const past_item of lastOrder.food) {

    for (const menu_item of _menu) {
        if (Number(past_item) === Number(menu_item.id)){

          _cart.push(menu_item);
        }
    }
  }
  $('#cart_size').html(`${_cart.length}`);
  $('#quick-order').fadeOut('slow');
  return headToCheckout();

};





//fetches the users recently placed order by order_id.
const fetchOrderDetails = () => {

  const url = `/api/fetch_orders`;

  $.ajax({
    url: url,
    type: 'GET',

    success: data => {
      console.log(data);

    },
    error: error => {
      console.log(error.responseText);
    },
  });

};


//test function for simulating SMS received from restaurant
const simulateSMS = () => {

  setTimeout(function(){

    $(".inner-complete-container").fadeOut('slow');
    $("#complete-container").append(createOrderPlacedElement);

    setTimeout(function(){
      $(".final-complete-container").fadeIn('slow');
    },1000);

    },5000);
}

















