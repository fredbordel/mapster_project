$(() => {
   $.ajax({
     method: "GET",
     url: "/api/maps"
   }).done((maps) => {
     for(map of maps) {
       $("#container").append(createNewMap(map));
     }
 });

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

});
