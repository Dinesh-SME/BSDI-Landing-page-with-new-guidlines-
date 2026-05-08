
jQuery(document).ready(function($) {
    var mymap,
    markers = [];
    function renderMap() {
        var mapType = $('.govbh-map__container').data('map-type');
        
        if (mapType === 'leaflet') {
            renderLeafletMap();
        } else if (mapType === 'google') {
            initMap();
        } else {
            console.error('Invalid map type specified in data-map-type attribute.');
        }
    }
    
    renderMap();
   
    //Leaflet Map
    function renderLeafletMap() {
        $('.govbh-map__container').each(function(container_index) {
            var mapCenter = [parseFloat($(this).data('latitude-center')), parseFloat($(this).data('longitude-center'))];
            var zoomLevel = parseInt($(this).data('zoom-level'));
            var targetElement = $(this).data('target-element'),
                scrollWheel = $(this).data('scroll-wheel'),
                modalTargetTopLevel =  $(this).data('modal-target');
    
            mymap = L.map(targetElement, {
                scrollWheelZoom: scrollWheel
            }).setView(mapCenter, zoomLevel);
    
            // L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
           L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
            //L.tileLayer('https://osmap.{s}.tile.mapcdn.net/en/map/v1/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mymap);

            var ss_width = 34,
                ss_height = 42;
            var scaled_size = $(this).data('marker-size');
            if (scaled_size) {
                var ss_array = scaled_size.split(',');
                ss_width = ss_array[0];
                ss_height = ss_array[1];
            }
    
            $(this).find('.govbh-map__container-location').each(function(index) {
                var lat = parseFloat($(this).data('latitude'));
                var lon = parseFloat($(this).data('longitude'));
                var marker_aria_label = $(this).data('map-marker-aria-label');
                var modalTargetMarkerLevel = $(this).data('modal-target');
                var markerIcon = L.icon({
                    iconUrl: $(this).data('map-marker'),
                    iconSize: [ss_width, ss_height],
                });
                
                var calloutHTML = $(this).find('.govbh-map__callout').html();
                if (!modalTargetTopLevel) {

                    if (!modalTargetMarkerLevel) {
                        var marker = L.marker([lat, lon], {icon: markerIcon}).addTo(mymap).bindPopup(calloutHTML);
                    } else {
                        var marker = L.marker([lat, lon], {icon: markerIcon}).addTo(mymap);
                        marker.on('click', function () {
                            var modal = $(modalTargetMarkerLevel);
                            if (modal.length) {
                                modal.modal('show');
                            } else {
                                console.error('Modal target not found: ' + modalTargetMarkerLevel);
                            }
                        });
                        
                    }

                } else {
                    var marker = L.marker([lat, lon], {icon: markerIcon}).addTo(mymap);
                    marker.on('click', function () {
                        var modal = $(modalTargetTopLevel);
                        if (modal.length) {
                            modal.find('.modal-body').html(calloutHTML);
                            modal.modal('show');
                        } else {
                            console.error('Modal target not found: ' + modalTargetTopLevel);
                        }
                    });
                }
                

                // Open the popup for the first location by default
                if (index === 0 && !modalTargetTopLevel) {
                    marker.openPopup();
                }
                // Store marker reference
                markers[container_index] = markers[container_index] || [];
                markers[container_index][index] = marker;
                markers[container_index][index]['lat'] = lat;
                markers[container_index][index]['lon'] = lon;


                //Set aria-label to image marker
                marker._icon.ariaLabel = marker_aria_label;
            });

            $('#' + targetElement).removeAttr('tabindex');
        });

    }
    $('.govbh-map__filter').each(function(filter_index) {
         
        $(this).find('> ul > li').click(function () {

            var index = $(this).index('.govbh-map__filter:eq('+filter_index+') > ul > li');
            markers[filter_index][index].openPopup();
            // Set the map view to the clicked marker's position callout centered
            //mymap.setView([markers[filter_index][index]['lat'], markers[filter_index][index]['lon']], 12);

            // Reset the .active class and activate the clicked item
            $('.govbh-map__filter > ul > li').removeClass('active');
            $(this).addClass('active');
        });
    });
    
    //Google Map
    function initMap() {

        var locations_arr = [];
        //loop through the .govbh-govbh-map__container

            $('.govbh-map__container').each(function() {
                var container = $(this);

                var container_data = {
                    'lat_center': container.attr('data-latitude-center'),
                    'lon_center': container.attr('data-longitude-center'),
                    'marker': container.data('map-marker'),
                    'marker_size': container.data('marker-size'),
                    'zoom_level': container.data('zoom-level'),
                    'theme': container.data('theme'),
                    'target_element': container.data('target-element'),
                    'location_points': []
                }
                //loop through the locations
                container.find('.govbh-map__container-location').each(function() {
                    var location_w = $(this);
                    var location_data = {
                        'latitude' : location_w.attr('data-latitude'),
                        'longitude' : location_w.attr('data-longitude'),
                        'marker': location_w.data('map-marker') ? location_w.data('map-marker') : container.data('map-marker'),
                        'callout': location_w.find('.govbh-map__callout').html()
                    }
                    container_data.location_points.push(location_data);
                })

                locations_arr.push(container_data);
            });

            //loop through the locations_arr
            locations_arr.forEach(function(gmc, index) {
                var location_points = gmc.location_points;
                
                var locations = [];
                location_points.forEach(function(point) {
                    
                    var location = [];
                    location.push(point.callout);
                    location.push(point.latitude);
                    location.push(point.longitude);
                    location.push(point.marker);

                    locations.push(location);
                });
                
                //console.log(index);

                var map = new google.maps.Map(document.getElementById(gmc.target_element), {
                    zoom: gmc.zoom_level,
                    center: new google.maps.LatLng(gmc.lat_center,gmc.lon_center),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    streetViewControl: true
                });
            
                var infowindow = new google.maps.InfoWindow({});

                
                var marker, i;

                for (i = 0; i < locations.length; i++) {
                    
                    //get the set height in the .govbh-map__container, otherwise use the default ones
                    var ss_width = 75,
                        ss_height = 75;
                    var scaled_size = gmc.marker_size;
                    if (scaled_size) {
                        var ss_array = scaled_size.split(',');
                        ss_width = ss_array[0];
                        ss_height = ss_array[1];
                    }

                    var icon = {
                        url: locations[i][3], // url
                        scaledSize: new google.maps.Size(ss_width, ss_height) // scaled size
                    };

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map,
                        icon: icon
                    });

                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                        }
                    })
                    
                    (marker, i));
                    var styles = [
                                {
                                    "featureType": "administrative",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#444444"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "color": "#f2f2f2"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "saturation": -100
                                        },
                                        {
                                            "lightness": 45
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.highway",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "labels.icon",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "color": "#e4dfd4"
                                        },
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                }
                            ];
                            
                    if (gmc.theme) {
                        map.set('styles', map_themes[gmc.theme]);
                    } else {
                        map.set('styles', styles);
                    }
                    
                    
                }
            });
        
        
    }

});