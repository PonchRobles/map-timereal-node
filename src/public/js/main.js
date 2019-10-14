var map = L.map('map-template');

const socket = io();

const tileUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
L.tileLayer(tileUrl).addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
    map.setView([e.latlng.lat, e.latlng.lng], 13);
    console.log(e);
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('You are here!');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
    
}); 

socket.on('newUserCoordinates', (coords) => {
    console.log('New user is connected');
    const marker = L.marker([coords.lat + 1, coords.lng + 1]);
    marker.bindPopup('Hello there!');
    map.addLayer(marker);    
});

//Market test
// const marker = L.marker([51.505, -0.09]);
// marker.bindPopup('Hello World!');
// map.addLayer(marker);