$(() => {


 let createFavoriteMap = function(mapData, i) {

  return  `
  <section class="container__map__fav">
  <header class="map__header">
      <a href="/map/${mapData.id}"><span class="map__header__title">${mapData.title}</span></a>
      <span class="map__header__handle">@EMPTYFORNOW</span>
    </header>
  <div id="myFavmap${i}" class="mymap2"></div>
  <script>
    let myFavmap${i} = L.map("myFavmap${i}").setView([${mapData.latitude}, ${mapData.longitude}], ${mapData.zoom_level});
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
    }).addTo(myFavmap${i});
    </script>
    <footer class="map__footer">
    <a href="/modify/map/${mapData.id}"><button class="map__footer__modify">MODIFY THIS MAP</button></a>
    </footer>
  </section>
  `
  };


  $.ajax({
      method: "GET",
      url: "/favorites",
    }).done((favorites) => {
      let i = 0;
      for(fav of favorites) {
        $(".user_favorites").prepend(createFavoriteMap(fav, i));
        i++;
      }
  });
});



