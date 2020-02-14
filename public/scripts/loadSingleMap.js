  const loadSingleMap = function(mapId) {

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

    let createNewMap = function(mapData, i) {

      return  `
      <section class="container__map">
      <header class="map__header">
      <span class="map__header__title">${mapData.title}</span>
      <span class="map__header__handle">@EMPTYFORNOW</span>
      </header>
      <div id="mymap${i}" class="mymap"></div>

      <footer class="map__footer">
      <a href="modify/map/${mapData.id}"><button class="map__footer__modify" >MODIFY THIS MAP</button></a>
      <button id="${mapData.id}" class="map__footer__favorite">ADD TO FAVORITE</button>
      </footer>
      </section>
      `
    };

    $.ajax({
      method: "GET",
      url: `/api/map/${mapId}`
    }).done((maps) => {
      let i = 0;
      for(map of maps) {
        $("#container").append(createNewMap(map,i))
        addMapToPage(map, i)
        // loadMapPoints(mapId,i);
        i++;
      }
      addMarkerListeners();

    })

  }
  // <script>
  // let mymap${i} = L.map("mymap${i}").setView([${mapData.latitude}, ${mapData.longitude}], ${mapData.zoom_level});
  // L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
  //   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  //   maxZoom: 18,
  //   id: 'mapbox/streets-v11',
  //   accessToken: 'your.mapbox.access.token'
  // }).addTo(mymap${i});

  // $.ajax({
  //   method: "GET",
  //   url: '/api/points/${mapData.id}'
  // }).then(points => {

  //   for (const point of points) {
  //     const currentMarker = L.marker([point.latitude, point.longitude]).addTo(mymap${i})
  //     currentMarker.marker_id = point.id
  //     chicken.push(currentMarker)
  //   }
  // })
  // const chicken = []
  // </script>

  const addMapToPage = function(mapData, i) {
    const mapMarker = []
    let mymap = L.map("mymap" + i).setView([mapData.latitude, mapData.longitude], mapData.zoom_level);
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7UYb6bOCvUG7YuJGjcqG', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);

      $.ajax({
        method: "GET",
        url: `/api/points/${mapData.id}`
      }).then(points => {

        for (const point of points) {
          const currentMarker = L.marker([point.latitude, point.longitude]).addTo(mymap)
          currentMarker.marker_id = point.id
          mapMarker.push(currentMarker)
        }
        addMarkerListeners(mapMarker);
      })
  }

  const addMarkerListeners = function (mapMarker){
    for(let i = 0; i < mapMarker.length; i++){
      console.log(mapMarker)
      $(mapMarker[i]).click((event) => {


        console.log(mapMarker[i].marker_id)
        // FIXME
        $.ajax('http://localhost:8080/api/modify/map/101/markers',{
          method: "GET"


        })
        .then(data => {
          console.log("data", data)
          // set the content of the popup as what comes from the DB
          // bind the popup to this?
          mapMarker[i].bindPopup(`<div class="popup_div"> <h3> ${data.data.rows[0].title}</h3> <p>${data.data.rows[0].description}</p> <img src="${data.data.rows[0].image_url}" height=40> </div>`).openPopup()
        }).catch(e => console.log(e))
      })
    }
  }


