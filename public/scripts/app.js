let mymap

$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;



  mymap = L.map("mymap").setView([45.50, -73.56], 11);

  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  L.marker([45.50, -73.56]).addTo(mymap);

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
    // ajax post? how do I get the data to the form in the post route?
  })

  console.log(mymap.getCenter())
});

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



/*
// BIG BIG BOSS = <main> class='container'

//BOSS
let $sectionOfMap    = $('<section>').addClass('container__map');

//CHILDREN OF BOSS
let $headerOfMap     = $('<header>').addClass('map__header');
let $divOfMap        = $('<div>').attr('id', `mymap-${Math.random().toString(36).substr(2,5)}`);
let $scriptOfMap     = $('<script>');

let $footerOfMap     = $('<footer>').addClass('map__footer');

//CHILDREN OF headerOfMap
let $spanTitleOfMap  = $('<span>').addClass('map__header__title');
let $spanHandleOfMap = $('<span>').addClasse('map__header__handle');

//CHILDREN OF footerOfMap
let $buttonModify    = $('<button>').addClass('map__footer__modify');
let $buttonFavorite     = $('<button>').addClass('map__footer__favorite');
*/
