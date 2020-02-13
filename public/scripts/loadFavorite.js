
$(() => {




$("body").on("click",".map__footer__favorite", function(event) {
  $.ajax({
    method: "POST",
    url: "/favorites",
    data: {id: event.target.id}
  }).then(() => {
    $(this).css("background-color", "green")

  });
});
});

// HERE ARE THE STEPS
// 1. FIGURE OUT A GET REQUEST FOR INFORMATION ABOUT A CERTAIN MAP, USING IT'S IDEA
// 2. WHEN THIS DATA IS AVAILABLE, DO A NEW AJAX REQUEST TO POST TO /profile/1
// 3. APPEND THE MAP - WITH SPECIFIC MAP ID -, CREATE IT AND APPEND TO HTML OF PROFILE PAGE
