$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {

// -----> PSEUDO USER
    sessionStorage.setItem('pseudoUser', users.user.id);
    console.log(users.user);
  });;
});
