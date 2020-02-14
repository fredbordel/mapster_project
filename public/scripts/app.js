

$(() => {
let storageArr = []

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

      for (let i = 0; i < storageArr.length; i++) {
        storageArr[i].map_id = data.response.rows[0].id

      }

        $.post('http://localhost:8080/create/point',{
          storageArr
        })

     const newMap = createNewMap(data.response.rows[0])
     storageArr = []
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
  <div id="mymap" class="mymap"></div>
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
        <button id="${mapData.id}" class="map__footer__favorite">ADD TO FAVORITE</button>
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

const addPointToStorage = function (t,d,url,lat,lng) {

    let point = {title: t,
    description: d,
    image_url: url,
    lat: lat,
    lng: lng}
    storageArr.push(point)
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
  // $.post('http://localhost:8080/create/point',{

  let title = $("#point_title").val();
  let description = $('#point_description').val()
  let image_url = $('#point_image_url').val()
  let lat = marker.getLatLng().lat
  let lng = marker.getLatLng().lng
  addPointToStorage(title, description, image_url, lat,lng)
  const latLng = marker.getLatLng()
  const anchorMarker = L.marker([latLng.lat, latLng.lng])
  let popup = L.popup()
  .setLatLng([latLng.lat, latLng.lng])
  .setContent(`<h1> ${$("#point_title").val()}
  </h1> <br> <h4> ${$('#point_description').val()}
  </h4> <br> <img src="${$('#point_image_url').val()}" height=40>`)
  .openOn(mymap)
  anchorMarker.bindPopup(`<h4> ${$("#point_title").val()} </h4> <button> modify </button> <br> <p> ${$('#point_description').val()} </p> <br> <img src="${$('#point_image_url').val()}" height=40> <button>Delete </button>`).openPopup()
  $('#point_description').val('')
  $("#point_title").val('')
  $('#point_image_url').val('')
  marker = undefined
})


// modify Map J query

$(".map__footer__modify").click( (e) => {
  $("modify__point").removeClass("hidden")

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




