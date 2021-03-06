$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    console.log("load users");
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
