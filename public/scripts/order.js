
$(document).ready(function() {
  placeOrder();
});

//allows the user to place an order
const placeOrder = (user,menu_items) => {

  $('#place_order').on('click', (event) => {
    event.preventDefault();

    //TEST DATA
    const testData = {
      user: 1,
      menu_items: [2,3]
    }

    $.ajax({
      url: '/api/place_orders',
      type: 'POST',
      data: testData,

      success: data => {
        console.log('Order ID: ',data)

// ------> TWILLIO TEXT MSG FUNCTIONALITY WILL BE CALLED HERE <--------

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

  //---> USE DATA OBJECT TO POPULATE BRWOSERs ORDER UPDATE
      console.log('Order Details: ',data)
    },
    error: error => {
      console.log(error.responseText);
    },
  });

}
















