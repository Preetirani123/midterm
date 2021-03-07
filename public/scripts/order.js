
$(document).ready(function() {
  placeOrder();
});

//allows the user to place an order
const placeOrder = (user,menu_items) => {

  $('#place_order').on('click', (event) => {
    event.preventDefault();

    //TEST DATA
    const testData = {
      user: sessionStorage.getItem('pseudoUser'),
      menu_items: [2,3]
    }

    $.ajax({
      url: '/api/place_orders',
      type: 'POST',
      data: testData,

      success: data => {
        console.log('Order ID: ',data)

        fetchOrderDetails(data);
      },
      error: error => {
        console.log(error.responseText);
      },
    });

  });
}

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

}

// creates an order placed html elements from the fetched order data;
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

















