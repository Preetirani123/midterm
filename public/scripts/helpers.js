//scrolls the menu and checkout containers into view
const scrollIntoView = () => {

  $('.anchor').slideDown('slow');

  $('html, body').animate({
    scrollTop: $(".anchor").offset().top

   }, 1000);

   $(window).scroll( () => {
    let scroll = $(window).scrollTop();
    if (scroll < 1) {
      $('.anchor').slideUp('slow');
    }
  });
}

//sorts the users cart by item ID
const sortObjArrayById = array => {

  array.sort(function(a, b){
  return a.id - b.id;
  });
  return array;
  };

//reduces the cart to one menu item for each menu_id
const reduceObjArrayById = arr => {
  const flatten = new Set(arr);
  const result = [...flatten];
  return result;
};

// counts matching menu items in the cart
  const countCartItems = (array, value) => {

    let counter = 0;
    for (const item of array) {

      if (item.id === value){
        counter++;
      }
    }
    return counter;
  };

// bundles all the same menu items in the cart together
  const bundleCartItems = (sorted, reduce) => {

    for (const item of reduce) {

      let quantity = countCartItems(sorted, item.id);
      item.qt = quantity;
    }
    return reduce;
  };

  //checks the estimated time of an order and constructs a checkout string
  const constructCheckoutStr = value => {

    let text = '';
    value = Math.ceil(value);

    if (value <= 1) {
      value = 1;
      text =`${value} minute`
    } else {
      text =`${value} minutes`
    }
    return text;
  }

//order is ready animation
const orderReadyAnimation = () => {
  $(".faded-img").css('display', 'none');
  $("#chxTitle").html('Your order is ready<br>for pick up');
  $("#chxTitle").css('font-size', '2.2rem');
  $(".chxBody").slideUp('slow');
  $("#myBar").addClass('blink')
}


