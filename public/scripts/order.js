//adds order item to cart
const addToCart = (menu_id) => {
  for (const item of _menu) {
    if (Number(menu_id) === Number(item.id)) {
      _cart.push(item);
      $("#added_to_cart").html(`${item.food_item} Added To Cart`);
      $("#added_to_cart").fadeIn("slow");
      setTimeout(function () {
        $("#added_to_cart").slideUp("slow");
      }, 1000);
      return $("#cart_size").html(`${_cart.length}`);
    }
  }
};

//adds a listener event to the headToCheckout function
const addHeadToCheckoutListener = () => {
  $("#head_to_checkout").on("click", () => {
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
  <h1>${sessionStorage.getItem("username")}'s Order</h1>
  </div>
  `;
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
    `;
    orderElements.push($orderDetails);
    totalPrice += Number(item.price * item.qt);
  }

  let tax = totalPrice * 0.05;
  let total = totalPrice + tax;

  $orderDetails = `
    <div class='order-footer'>
    <h4>Sub Total: $${totalPrice}</h4>
    <h5>Tax: $${tax}</h5>
    <h2>Total: $${total}</h2>
    <button id='place_order'>Place Order</button>
    </div>
    `;
  orderElements.push($orderDetails);
  return renderCheckoutPage(orderElements);
};

//takes the array of html elements as an args and renders the users checkout details
const renderCheckoutPage = (order) => {
  $("#item-container").css("display", "none");
  $("#order-container").fadeIn("slow");

  for (const item of order) {
    $("#order-container").append(item);
  }
  scrollIntoView();
  addPlaceOrderListener(); //<--- set after order-container is rendered
};

//removes an item from the users cart and re-renders the order-container
const removeFromCart = (menu_id) => {
  for (let i = 0; i < _cart.length; i++) {
    if (Number(menu_id) === Number(_cart[i].id)) {
      _cart.splice(i, 1);
      $("#cart_size").html(`${_cart.length}`);

      if (_cart.length < 1) {
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

    const currentUser = {
      id: sessionStorage.getItem('pseudoUser'),
      name: sessionStorage.getItem('username')
    }
    const food_items = _cart.map(x => x = x.food_item);
    const menu_ids = _cart.map(x => x = x.id);

    const orderData = {
      user: currentUser,
      food_items: food_items,
      menu_items: menu_ids,
    }

    $.ajax({
      url: "/api/place_orders",
      type: "POST",
      data: orderData,

      success: (data) => {
        $("#complete-container").append(processingOrderAnimation);
        $("#complete-container").fadeIn("slow");
        $(".inner-complete-container").slideDown("slow");

        //setInterval waiting on restaraunt response
        checkForRestaurantResponse(data);
      },
      error: (error) => {
        console.log(error.responseText);
        alert("404 ERROR");
      },
    });
  });
};

//creates a spinner animation while the SMS functionality is being handled
const processingOrderAnimation = () => {
  const $processing = `<section class='inner-complete-container'>
  <h2>Order Received</h2>
  <h4>${brand} is calculating<br>your wait time...</h4>
  <div class="sending"></div>
  </section>`;
  return $processing;
};

//checks the database for restaraunt est. time response
const checkForRestaurantResponse = order_id => {
  let kill = 0;
  const checkServer = setInterval(function(){
  kill++;

    $.ajax({
      url: `/api/est_time_listener/${order_id}`,
      type: 'GET',

      success: data => {
      const num = data.time.time;
      let estTime = Number(num);

      if(!Number.isNaN(estTime) && estTime > 0) {

      clearInterval(checkServer);
      receivedSMS(estTime);
      updateOrderStatus(order_id); //<-- as an intermediary our job is done.

      } else {
      console.log('Processing Order...');
      }
      },
      error: error => {
        console.log(error.responseText);
        alert("404 ERROR");

      },
    });

    if (kill > 4) { //<--- gives the restaraunt 1 minute to responde

      estTime = 30;// <---fallback to default est. time MVD!
      receivedSMS(estTime);
    }
  }, 15000)

};

//SMS received from restaurant
const receivedSMS = (estTime) => {

  $(".inner-complete-container").fadeOut('slow');
  $("#complete-container").append(createOrderPlacedElement(estTime));

  setTimeout(function(){
    $(".final-complete-container").fadeIn('slow');
  },1000);
}


// updates the browser with estimated time info from SMS update;
const createOrderPlacedElement = estTime => {

  const estTimeRoundedUp = Math.ceil(estTime);
  const timeStr = constructCheckoutStr(estTimeRoundedUp);
  const waitTime = estTime * 60 * 1000;
  const pickUpTime = new Date(
  new Date().getTime() + waitTime).toLocaleTimeString();

  const $orderMSg = `<section class='final-complete-container'>
  <a href='/'><h6>X</h6></a>
  <h4 id='chxTitle'>
  Your order will be ready in
  </h4>
  <div class='chxBody'>
  <p>
  ${timeStr}
  </p>
  <h4>
  Pick up time
  </h4>
  <p>
  ${pickUpTime}
  <p>
  </div>

  <div id="myProgress">
    <div id="myBar"> </div>
  </div>

  <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=Vancouver+BC&travelmode=bicycling' target='_blank'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2aQejmdcLqj9jgx9LMaOwaAM0YDZpAkMohg&usqp=CAU'/></a>
  <div class='faded-img'>
  <img src='/image/logo.png'/>
  </div>
  </section>`;

  _cart = [];
  $("#cart_size").html(`${_cart.length}`);
  move(estTime); // <---- starts the progress bar
  return $orderMSg;
};

  // Set time out for order process bar
  function move(time) {

    const milliseconds = time * 60;
    const rateOfChange = 100 / milliseconds;
    const interval = 1000;
    let width = 0;

    let id = setInterval(frame, interval);

    function frame() {

      width = width + rateOfChange;
      $("#myBar").css('width', width + "%");


      if (width > 100) {
        width = 100;
        orderReadyAnimation();
        clearInterval(id);
      }
    }
  }

//updates orders fulfilled row in DB
const updateOrderStatus = (order) => {

  const orderUp = {
    orderId: order
  }

  $.ajax({
      url: "/api/fulfilled_orders",
      type: "POST",
      data: orderUp,

    success: data => {
      console.log(data);
    },
    error: (error) => {
      console.log(error.responseText);
      // alert("404 ERROR");
    },
  });
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
      type: "GET",

      success: (data) => {
       if (!data.orders) {
          return alert('Order History Not Found');
       }
        quickOrderElement(data.orders);
      },
      error: (error) => {
        console.log(error.responseText);
      },
    });
  });
};

//display the users past orders
const quickOrderElement = lastOrder => {

  if(!lastOrder || lastOrder[0].food.length < 1){
    return alert('Order History Not Found');
  }

  for (const item of lastOrder[0].food) {
    for (const menu_item of _menu) {
        if (Number(item) === Number(menu_item.id)){
          _cart.push(menu_item);
        }
    }
  }
  $('#cart_size').html(`${_cart.length}`);
  $('#quick-order').fadeOut('slow');
  return headToCheckout();
};
