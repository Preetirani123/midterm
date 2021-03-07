$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {

// -----> PSEUDO USER
    console.log(users.user);
  });;
});
