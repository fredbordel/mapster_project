
$(() => {

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
          <button id="${mapData.id}" class="map__footer__favorite">ADD TO FAVORITE</button>
        </footer>
    </section>
    `
    return newMap;
    };


$("body").on("click",".map__footer__favorite", function(event) {
  //console.log(event.target.id)
  $.ajax({
    method: "POST",
    url: "/favorites",
    data: {id: event.target.id}
  }).then(() => {
    console.log(event.target.id)
    //$('.user_favorites').append(createNewMap(`SELECT * FROM maps WHERE id = ${event.target.id}`))
  });
});

});

// HERE ARE THE STEPS
// 1. FIGURE OUT A GET REQUEST FOR INFORMATION ABOUT A CERTAIN MAP, USING IT'S IDEA
// 2. WHEN THIS DATA IS AVAILABLE, DO A NEW AJAX REQUEST TO POST TO /profile/1
// 3. APPEND THE MAP - WITH SPECIFIC MAP ID -, CREATE IT AND APPEND TO HTML OF PROFILE PAGE
