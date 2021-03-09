$(document).ready(() => {
  $(window).scroll(function() { //Show the toggle button to move the page up if window gets too longs
    if ($(this).scrollTop() > 150) {
      $('#myBtnn').fadeIn();
    } else {
      $('#myBtnn').fadeOut();
    }
  });

  $('#myBtnn').click(function() { // move the page up if the toggle button is clicked
    $("html, body").animate({scrollTop: 0}, 600);
    return false;
  });
  });
