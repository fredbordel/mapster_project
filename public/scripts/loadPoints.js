<<<<<<< HEAD

  const loadMapPoints = function (mapId,i){

    $.ajax({
      method: "GET",
      url: `/api/points/${mapId}`
    }).then(points => {
      for (const point of points) {
        L.marker([point.latitude, point.longitude]).addTo(`mymap0`)

      }
    })
  }




=======
(() => {

  $.ajax({
    method: "GET",
    url: "/api/points"
  }).then(points => {
    console.log(points)
  })



  // document load ends here
})
>>>>>>> feature/routes
