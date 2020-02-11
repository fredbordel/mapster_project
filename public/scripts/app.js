

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
    // check with francis
      .then(data => {
      window.location =  data.redirectUrl
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



  //_________________________________
// FUNCTION THAT CREATES A NEW MAP
//________________________________|

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

  //_____________________________________
  // FUNCTIONS LOAD NEW MAP TO INDEX FEED|
  //_____________________________________|





});





//Function that adds points to an existing map
// how to differentiate between the diffrent maps across pages


$("#mymap").click(function (e){

  $(".create__point").removeClass("hidden");
  // get coordinates from leaflet method
  const clickLatLng = mymap.mouseEventToLatLng(e)
  console.log(clickLatLng);

  // istantiate marker and add it to the map
  marker = L.marker([clickLatLng.lat, clickLatLng.lng]).addTo(mymap);
  marker.bindPopup("Please fill out the form below").openPopup();

//toggle the form


})




  // pageload ends here
});

//_________________________________
// FUNCTION THAT CREATES A NEW MAP
//________________________________|





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




