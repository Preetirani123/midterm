$(document).ready(() => {
  fetchMenu();
  addQuickOrderListener();
  addMenuClickedListener();
  addHeadToCheckoutListener();
  fetchOrderDetails();
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {

  // -----> PSEUDO USER
      sessionStorage.setItem('pseudoUser', users.user.id);
      sessionStorage.setItem('username', users.user.name);
    });;
  });
});
