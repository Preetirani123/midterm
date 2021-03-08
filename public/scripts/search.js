$(document).ready(() => {

  //Add search item to the ejs file
  const $searchForm = $('#search');
  let search =
  `
  <form id="live-search"  class="styled" method="GET">
    <input type="text" class="text-input" id="filter" value="" placeholder = "Search.."/>
  </form>
  `
  $searchForm.append(search);

  $("#filter").keyup(function() {
    let filter = $(this).val();

    $("#item-container .item-menu").each(function() {
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
      }
    });
  });
});
