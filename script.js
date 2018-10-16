var map;

var showFormButton = document.getElementById('showForm');
var formWrapper =  document.getElementsByClassName('form-wrapper')[0];
var loadDataButton = document.getElementById('buttonSubmit');
var cancelarButton = document.getElementById('cancelar');

loadDataButton.addEventListener('click', function(){
    var data = document.getElementById('dataInput').value;
    var colorInput = document.getElementById('colorInput').value;
    showMarkerInMap(JSON.parse(data), colorInput);
    document.getElementById('dataInput').value = '';
    formWrapper.style.display = 'none';
});

cancelarButton.addEventListener('click', function(){
    document.getElementById('dataInput').value = '';
    formWrapper.style.display = 'none';
});

showFormButton.addEventListener('click', function(){
    formWrapper.style.display = 'flex';
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -12.0689035, lng: -76.9386418},
        zoom: 8
    });
}

function showMarkerInMap(data, color) {
    data.map(element => {
        var html = '';
        Object.keys(element).forEach((key) => {
            html = html.concat(`<strong>${key}: </strong><span>${element[key]}</span>`);
            html = html.concat('<br>');
        });

        var infowindow = new google.maps.InfoWindow({
            content: html
        });

        var marker = new google.maps.Marker({
            position: {lat: element.lat, lng: element.lng},
            map: map,
            title: element.name,
            icon: pinSymbol(color),
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}