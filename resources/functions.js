/*
 * Global Variables
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var projection = ol.proj.get('EPSG:3857');
var overlay = new ol.Overlay({
  element: container}); //Anchors the pop-up to the map
 var mapLayer = new ol.layer.Tile({
  source: new ol.source.MapQuest({layer: 'sat'})}); //Map source
  
/*
 * Pop-Up Closer
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/*
 * KML Files
 */
var Aaronic = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Aaronic_Priesthood.kml'
	})	
});

var Adam = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Adam-ondi-Ahman.kml'
	})	
});

var Carthage = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Carthage_Jail.kml'
	})	
});

var Colonia = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Colonia.kml'
	})	
});

var FarWest = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/FarWest.kml'
	})	
});
	
var Vision = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/FirstVision.kml'
	})	
});	

var Liberty = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Liberty_Jail.kml'
	})	
});	

var Whitmer = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Whitmer.kml'
	})	
});	

var Nauvoo = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Nauvoo.kml'
	})	
});	

var Book = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/BookofMormon.kml'
	})	
});	

var Kirtland = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Kirtland.kml'
	})	
});	

var Melchizedek = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Melchizedek.kml'
	})	
});	

var SLC = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/SLC.kml'
	})	
});	

var Trail = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Trail.kml'
	})	
});	

var Quarters = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/Quarters.kml'
	})	
});	

var George = new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,
		url: 'KMLandPNG/George.kml'
	})	
});	

/*
 * Map Creation
 */
var map = new ol.Map({
  layers: [mapLayer, Aaronic/*, Adam, Carthage, Colonia, FarWest, Vision, Liberty, Whitmer, Nauvoo, Book, Kirtland, Melchizedek, SLC, Trail, Quarters, George*/],
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
    center: [-10000000, 5500000],
    zoom: 4
  })
});

/*
 * Zoom Functions
 */
 function zoomNauvoo() {
 var extent = Nauvoo.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }
 
 function zoomSLC() {
 var extent = SLC.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }

 function zoomColonia() {
 var extent = Colonia.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }

 function zoomKirtland() {
 var extent = Kirtland.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }
 
 function zoomMelchizedek() {
 var extent = Melchizedek.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }
 
  function zoomTrail() {
 var extent = Trail.getSource().getExtent();
 map.getView().fitExtent(extent, map.getSize());
 }
 
 function zoomReset() {
 location.reload(false)
 }

/*
 * On Click Function
 */
map.on('click', function(evt) {
  //Search for feature
  var feature = map.forEachFeatureAtPixel(evt.pixel,
	  function(feature, layer) {
		return feature;
	  });
  //If found, then display. Else destroy.
  if (feature) {
	var coord = map.getCoordinateFromPixel(evt.pixel);
	overlay.setPosition(coord);
	var displaycontent = '<b><u><font size="3.5">' + feature.get('name')
	+ '</font></u></b><br><b>Location:</b> ' + feature.get('location') + '<br><b>Date:</b> ' + feature.get('date')
	+ '<br><b>Description:</b> ' + feature.get('description') + '<br><b>More Information:</b><br><a href=' + feature.get('link')
	+ ' target="_blank">' + feature.get('moreinfo') + '</a>';
	content.innerHTML = displaycontent;
	} else {
		overlay.setPosition(undefined);
		closer.blur();
		return false; }
	});
