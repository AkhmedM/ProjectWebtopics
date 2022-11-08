let mapView = new ol.View({
    center: ol.proj.fromLonLat([3.709260,51.065164]),
    zoom: 14,
});


let map = new ol.Map ({
    target: 'map',
    view: mapView,
    controls: []
});



let osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM(),
});
map.addLayer(osmTile);





let gentPOIParkingTile = new ol.layer.Tile({
    title: "Gent wijken",
    source: new ol.source.TileWMS({
        url: 'https://geo.gent.be/geoserver/SG-E-Stadsplan/wms',
        params: {'LAYERS':'SG-E-Stadsplan:Stadsplan-POI-Parkings', 'TILED':true},
        serverType: 'geoserver',
        visible: true
    })
});
map.addLayer(gentPOIParkingTile);




let gentWijkenTile = new ol.layer.Tile({
    title: "Gent wijken",
    source: new ol.source.TileWMS({
        url: 'https://geo.gent.be/geoserver/SG-E-Grenzen/wms',
        params: {'LAYERS':'	SG-E-Grenzen:Stadswijken', 'TILED':true},
        serverType: 'geoserver',
        visible: true
    })
});
map.addLayer(gentWijkenTile);





 let layerSwitcher = new ol.control.LayerSwitcher({
     activationMode: 'click',
    startActive: false,
     groupSelectStyle: 'children'
});

map.addControl(layerSwitcher);




let mousePosition = new ol.control.MousePosition({
    pojection: 'EPSG:4326',
    coordinateFormat: function(coordinate){return ol.coordinate.format(coordinate, '{y} , {x}', );}
});
map.addControl(mousePosition);

let scaleControl = new ol.control.ScaleLine({
    bar: true,
    text: true,
});
map.addControl(scaleControl);





let Style = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5,10],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'images/marker.png',
    }),
});

const marker = new ol.Feature({
    geometry: new ol.geom.Point(
        ol.proj.fromLonLat([3.709260,51.065164])
    ),
    type: 'shop',
    name: 'Heartrepair',
});
let vectorLayer = new ol.layer.Vector({
    title: 'winkel',
    source: new ol.source.Vector({
        features: [marker]
    }),
    style: Style
});
map.addLayer(vectorLayer);

map.on('click', function(e){
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
        console.log(feature);
    })
})








let homeButton = document.createElement('button');
homeButton.innerHTML = '<imag src="public/images/home.png" alt="homebutton" style="width:20px;height:20px;filter:brightness(0) invert(1):vertical-align:middle"></img>';
homeButton.className = 'myBytton';

let homeElement = document.createElement('div');
homeElement.className = 'homeButtonDiv';
homeElement.appendChild(homeButton);

let homeControl = new ol.control.Control({
    element: homeElement,
});

homeButton.addEventListener('click', () => {
    location.href = "index.html";
})
map.addControl(homeControl)
