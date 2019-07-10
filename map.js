let myMarker = null;
let weather;

function initMap() {
    
    let options = {
        zoom: 6,
        center: { lat: 32.109333, lng: 34.855499 }
    }

    let map = new google.maps.Map(document.getElementById("map"), options);
    google.maps.event.addListener(map, "click", onMapClick);

    function onMapClick(event) {
        fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + event.latLng.lat() +
            "&lon=" + event.latLng.lng() + "&units=metric&APPID=c894fa26f98d61a6892f65d827493bef")
            .then(res => res.json())
            .then(data => { weather = data; placeMarker(event.latLng); addInfoWindow(myMarker) });
    }


    function placeMarker(location) {

        let marker = new google.maps.Marker({
            position: location,
            map: map
        })

        if (myMarker !== null)
            myMarker.setMap(null);
        myMarker = marker;
    }

    function addInfoWindow(marker) {

        let infoWindow = new google.maps.InfoWindow({
            content: "City: " + String(weather.name) + "<br/>" + String(weather.weather[0].description) +
            "<br/>" + "Temperature: " + String(weather.main.temp) + "&#8451" + "<br/>" + "Wind speed: " +
            String(weather.wind.speed)
        });
        infoWindow.open(map, marker);
    }
}