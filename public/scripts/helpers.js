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

  }


//reduces the cart to one menu item for each menu_id
const reduceObjArrayById = arr => {

  const result = [];

  for (let i = 0; i < arr.length; i++){

    let hit = false;

      for (let j = i + 1; j < arr.length; j++) {

        if(arr[i].id === arr[j].id) {

          hit = true;
        }
      }

      if(!hit) {
        result.push(arr[i]);
      }
  }

  return result;
}


// counts matching menu items in the cart
  const countCartItems = (array, value) => {

    let counter = 0;
    for (const item of array) {

      if (item.id === value){
        counter++;
      }
    }

    return counter;
  }

// bundles all the same menu items in the cart together
  const bundleCartItems = (sorted, reduce) => {

    for (const item of reduce) {

      let quantity = countCartItems(sorted, item.id);
      item.qt = quantity;

    }

    return reduce;
  }
