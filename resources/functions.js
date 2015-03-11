/*
 * Global Variables
 */
var map, mapLayer, projection, coord, displaycontent, feature, i;
var Aaronic, Adam, Carthage, Colonia, FarWest, Vision, Liberty, Whitmer, Nauvoo, Book, Kirtland, Melchizedek, SLC, Trail, Quarters, George;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay({
  element: container}); // Anchors the pop-up to the map
 
/*
 * Functions
 */
function mapSetup()
 {
	// Define projection
	projection = ol.proj.get('EPSG:3857');
	
	// Create layers
	buildLayers();
		
	// Create map
	map = new ol.Map({
		target: 'map',
		layers: [mapLayer, Aaronic, Adam, Carthage, Colonia, FarWest, Vision, Liberty, Whitmer, Nauvoo, Book, Kirtland, Melchizedek, SLC, Trail, Quarters, George],
		overlays: [overlay],
		view: new ol.View({
			center: [-10000000, 5500000],
			zoom: 4
			})
		});
	
	// Default view
	zoomTo("reset");
	
	/*
	 * On Click Function
	 */
 
	 map.on('click', function(evt)
	{
		  //Destroy any existing pop-up bubbles
		  destroyPopup();
		  
		  // Search for feature
		  feature = map.forEachFeatureAtPixel(evt.pixel,
			  function(feature, layer) {
				return feature;
			  });
		  // If found, then display
		  if (feature) {
			coord = map.getCoordinateFromPixel(evt.pixel);
			popUp();}
	});
		
	// Destroys pop-up with the X in corner
	closer.onclick = function() {
		destroyPopup()
	};
}

function buildLayers()
 {
	//Build the MapQuest satellite map layer
	mapLayer = new ol.layer.Tile({
		source: new ol.source.MapQuest({
			layer: 'sat'
			})
	});

	//Create KML file layers
	Aaronic = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Aaronic_Priesthood.kml'
		})	
	});
	Aaronic.name = 'aaronic';

	Adam = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Adam-ondi-Ahman.kml'
		})	
	});
	Adam.name = 'adam';

	Carthage = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Carthage_Jail.kml'
		})	
	});
	Carthage.name = 'carthage';

	Colonia = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Colonia.kml'
		})	
	});
	Colonia.name = 'colonia';

	FarWest = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/FarWest.kml'
		})	
	});
	FarWest.name = 'farwest';
	
	Vision = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/FirstVision.kml'
		})	
	});
	Vision.name = 'vision';

	Liberty = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Liberty_Jail.kml'
		})	
	});
	Liberty.name = 'liberty';

	Whitmer = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Whitmer.kml'
		})	
	});	
	Whitmer.name = 'whitmer';

	Nauvoo = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Nauvoo.kml'
		})	
	});	
	Nauvoo.name = 'nauvoo';

	Book = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/BookofMormon.kml'
		})	
	});
	Book.name = 'book';

	Kirtland = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Kirtland.kml'
		})	
	});	
	Kirtland.name = 'kirtland';

	Melchizedek = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Melchizedek.kml'
		})	
	});	
	Melchizedek.name = 'melchizedek';

	SLC = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/SLC.kml'
		})	
	});	
	SLC.name = 'slc';

	Trail = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Trail.kml'
		})	
	});
	Trail.name = 'trail';

	Quarters = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/Quarters.kml'
		})	
	});	
	Quarters.name = 'quarters';

	George = new ol.layer.Vector({
		source: new ol.source.KML({
			projection: projection,
			url: 'KMLandPNG/George.kml'
		})	
	});
	George.name = 'george';
}

function zoomTo(mylayer)
 {
	// Check to make sure country name is passing correctly
	console.log(mylayer);
	
	// Create an array from the map layers
	layers = map.getLayers().a;
	
	// Loop to zoom
	for (i = 1; i <= 16; i++)
	{
		if (layers[i].name==mylayer)
		{
			map.getView().fitExtent(layers[i].getSource().getExtent(), map.getSize());
			map.getView().setZoom(12);
			if (layers[i].name=='trail')
				{map.getView().fitExtent(layers[i].getSource().getExtent(), map.getSize());}
			if (layers[i].name=='colonia'||layers[i].name=='melchizedek'||layers[i].name=='slc')
				{map.getView().setZoom(11);}
			coord = map.getView().getCenter();
			feature = layers[i].getSource().getFeatures()[0];
			popUp();
		}
	}
	
	// Reset the zoom for the 'Default View' option
	if (mylayer=="reset")
	{
		destroyPopup();
		map.getView().setZoom(4);
		map.getView().setCenter([-10000000, 5500000]);
	}
}

function resetView()
{
destroyPopup();
map.getView().setZoom(4);
map.getView().setCenter([-10000000, 5500000]);	
}

function popUp()
{
	overlay.setPosition(coord);
	displaycontent = '<b><u><font size="3.5">' + feature.get('name') + '</font></u></b><br><b>Location:</b> ' + feature.get('location') + '<br><b>Date:</b> ' + feature.get('date') + '<br><b>Description:</b> ' + feature.get('description') + '<br><b>More Information:</b><br><a href=' + feature.get('link') + ' target="_blank">' + feature.get('moreinfo') + '</a>';
	content.innerHTML = displaycontent;
}
		
function destroyPopup()
{
	overlay.setPosition(undefined);
	closer.blur();
	return false;
}
