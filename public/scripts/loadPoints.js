(() => {

  $.ajax({
    method: "GET",
    url: "/api/points"
  }).then(points => {
    console.log(points)
  })



  // document load ends here
})
