// Google maps initialize

function initialize() {
    // Change the latitude and longitude to your location. You can also get the coordinates here: http://itouchmap.com/latlong.html
    var myLatlng = new google.maps.LatLng(51.505307, -0.109434);
    var mapOptions = {
        zoom: 7,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content:
            '<div class="map-wrap">' +
                // Company name
                '<div class="b-title">' + 'Company name' + '</div>' +
                // Company street
                '<p>' + 'Imaginary Address street 73' + '</p>' +
                // Company city and state
                '<p>' + '1122 Some City, Country' + '</p>' +
                // Clearfix with border
                '<div class="clrfx map-div">' + '</div>' +
                // Phone
                '<div class="b-info w-47">' + '<span class="entypo-phone">' + '</span>' + '00 265 123 456' + '</div>' +
                // Email
                '<div class="b-info w-47">' + '<span class="entypo-paper-plane">' + '</span>' + 'hey@yoursite.com' + '</div>' +
                // Mobile
                '<div class="b-info w-47">' + '<span class="entypo-mobile">' + '</span>' + '00 268 123 789' + '</div>' +
                // Website
                '<div class="b-info w-47">' + '<span class="entypo-monitor">' + '</span>' + 'www.yoursite.com' + '</div>' +
                // Bottom margin clearfix
                '<div class="clrfx mt-10">' + '</div>' +
            '</div>'
    });
    makeInfoWindowEvent(map, infowindow, marker);
}

function makeInfoWindowEvent(map, infowindow, marker) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);