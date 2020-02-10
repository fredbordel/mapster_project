$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

//_________________________________
// FUNCTION THAT CREATES A NEW MAP
//________________________________|
let createNewMap = function(mapData) {

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


//_______________________________________
// APPENDING FROM GRAND-CHILDREN TO BOSS|
//______________________________________|

$footerOfMap
    .append($buttonModify)
    .append($buttonFavorite);

$headerOfMap
    .append($spanTitleOfMap)
    .append($spanHandleOfMap);

$sectionOfMap
    .append($headerOfMap)
    .append($divOfMap)
    .append($scriptOfMap)
    .append($footerOfMap);

    return $sectionOfMap;

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
