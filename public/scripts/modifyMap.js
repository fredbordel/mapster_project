
// modify Map J query

$(() => {

  // User clicks on a marker:

  // make the map toggle down
  $("#toggleModify").click( (e) => {
    if($("#toggleModify").hasClass("active")){
      $(".modify__point__form").removeClass("hidden")
    } else {
      $("#toggleModify").addClass("active")
      $(".modify__point__form").removeClass("hidden")
    }
  })

$("#delete_button").click(() => {
  const  point_id = $("#hidden_point_id").val()
  $.post(`/delete/point/${point_id}`, {
    point_id
  }).then(data => {
    console.log(data)

  })
})



$("#modify_point_button").click(() => {
  let title = $("#modify_title").val();
  let description = $('#modify_description').val()
  let image_url = $('#modify_image_url').val()
  let point_id = $("#hidden_point_id").val()
    $.post(`/modify/point/${point_id}`, {
      title,
      description,
      image_url,
      id: point_id
    }).then(data => {
       $("#modify_title").val('');
       $('#modify_description').val('')
        $('#modify_image_url').val('')
    })
})

  // should there be some sort of class that is toggeled on click so
  // for(let i = 0; i < chicken.length; i++){
  //   console.log(chicken)
  //   $(chicken[i]).click((event) => {
  //     const babyChicken = event.target
  //     console.log(babyChicken)
  //     console.log(chicken[i].marker_id)
  //     // FIXME
  //     $.ajax('http://localhost:8080/api/modify/map/101/markers',{
  //       method: "GET"


  //     })
  //       .then(data => {
  //         console.log("data", data)
  //         // set the content of the popup as what comes from the DB
  //         // bind the popup to this?
  //         chicken[i].bindPopup(`<h3> ${data.data.rows[0].title}</h3> <p>${data.data.rows[0].description}</p> <img src="${data.data.rows[0].image_url}" height=40>`).openPopup()
  //       }).catch(e => console.log(e))
  //   })
  // }



// $(chicken[0]).click((event) => {
//   const babyChicken = event.target

//   $.ajax('http://localhost:8080/api/modify/map/:id',{
//     method: "GET",
//     point_id: babyChicken.marker_id

//   })
//     .then(data => {
//       console.log(data)
//       // set the content of the popup as what comes from the DB
//       // bind the popup to this?
//       chicken[0].bindPopup("<h3> kokokok</h3> <p>kmkmkmkm </p> <img src= height=40>").openPopup()
//     }).catch(e => console.log(e))



// })

});
