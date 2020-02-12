

$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;



  let mymap = L.map("mymap").setView([45.50, -73.56], 11);
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);



  $(".create__map").submit(function (event){
    event.preventDefault();

    const lat = mymap.getCenter().lat

    const long = mymap.getCenter().lng
    const zoomLevel = mymap.getZoom();

    $.post('http://localhost:8080/create/map',{
      lat,
      long,
      zoomLevel,
      title: $(".create__map__textarea").val()
    })
    .then(data => {
     const newMap = createNewMap(data.response.rows[0])
      console.log(newMap)
      window.location =  data.redirectUrl;
    })
  })


  let createNewMap = function(mapData) {

  const newMap = `
  <section class="container__map">
  <header class="map__header">
      <span class="map__header__title">${mapData.title}</span>
      <span class="map__header__handle">@EMPTYFORNOW</span>
    </header>
  <div id="mymap"></div>
  <script>
    let mymap = L.map("mymap").setView([${mapData.latitude}, ${mapData.longitude}], ${mapData.zoom_level});
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    </script>
    <footer class="map__footer">
        <button class="map__footer__modify">MODIFY THIS MAP</button>
        <button class="map__footer__favorite">ADD TO FAVORITE</button>
      </footer>
  </section>
  `
  return newMap;
  };



//Function that adds points to an existing map
// how to differentiate between the diffrent maps across pages
// how to add multiple poiints? a submit and a reset button at the bottom of the form?
// how to
// check api docs for how to check if user clicks on
let marker;

const enableAddPoint = function (e){
  //toggle the form
  $(".create__point").removeClass("hidden");
  // get coordinates from leaflet method
  const clickLatLng = mymap.mouseEventToLatLng(e)
  if(!marker){
    marker = L.marker([clickLatLng.lat, clickLatLng.lng]).addTo(mymap);
    marker.bindPopup("To Save a Point \n Please fill out the form below").openPopup();
  } else {
    marker.setLatLng([clickLatLng.lat, clickLatLng.lng]).openPopup();
  }
}



$("#toggleAdd").click(()=> {

if($("#toggleAdd").hasClass('active')){
  $("#toggleAdd").removeClass('active')
  $("#mymap").off()
  $("#toggleAdd").text('Add Points')
  $(".create__point").addClass("hidden");
} else {
  $("#toggleAdd").addClass('active')
  $("#mymap").click(enableAddPoint)
  $("#toggleAdd").text('Review Points')
  $(".create__point").removeClass("hidden");
}
})

$("#mymap").click(enableAddPoint)

$('#create_point_button').click(function(){
  $.post('http://localhost:8080/create/point',{
  title: $("#point_title").val(),
  description: $('#point_description').val(),
  image_url: $('#point_image_url').val(),
  lat: marker.getLatLng().lat,
  lng: marker.getLatLng().lng
  }).then(e =>{
    const latLng = marker.getLatLng()
    const anchorMarker = L.marker([latLng.lat, latLng.lng])
    // let popup = L.popup()
    // .setLatLng([latLng.lat, latLng.lng])
    // .setContent(`<h4> ${$("#point_title").val()} </h4> <br> <p> ${$('#point_description').val()} </p> <br> <img src="${$('#point_image_url').val()}">`)
    // .openOn(mymap)
    anchorMarker.bindPopup(`<h4> ${$("#point_title").val()} </h4> <br> <p> ${$('#point_description').val()} </p> <br> <img src="${$('#point_image_url').val()}" height=40>`).openPopup()
    $('#point_description').val('')
    $("#point_title").val('')
    $('#point_image_url').val('')
    marker = undefined
  })

})



  // pageload ends here
});







//_____________________________________________
// FUNCTION THAT DISABLE AUTOMATIC ZOOM ON MAP|
//____________________________________________|
/*
mymap.once('focus', function() { map.scrollWheelZoom.enable(); });

mymap.on('click', function() {
  if (map.scrollWheelZoom.enabled()) {
    map.scrollWheelZoom.disable();
    }
    else {
    map.scrollWheelZoom.enable();
    }
  });
*/




