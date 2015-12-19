var xhr = new XMLHttpRequest(),
    localhost = "http://localhost:8080/api/locations",
    locArray,
    gauge0, gauge1, gauge2, gauge3, gauge4, gauge5, gauge6, gauge7, gauge8, gauge9, gauge10, gauge11;
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        locArray = JSON.parse(xhr.responseText);
        plotMap(locArray);
    }
}
xhr.open("GET", localhost, true);
xhr.send();
function plotMap(locArray){
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        scrollwheel: false,
        center: new google.maps.LatLng(37.8, -120),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var info = new google.maps.InfoWindow();

    var marker, i;

    var legend = document.getElementById('legend'),
        position, address,
        lat, lng, latPath, longPath, capacity, histavg, body = document.getElementById('body'), mkr, flatdiv, gaugediv, gaugesvg,
        brk = 1;


    //marking all the locations
    for (i = 0; i < locArray.locations.location.length; i++) {  
        //creating markr div elements


        var $newdiv = '<div id="markr'+i+'" ><div id="flatdiv'+i+'" style="width: 150px; height: 200px; margin: 0 auto"></div><div id="gaugediv'+i+'" style="width: 140px; height: 200px; margin: 0 auto"><svg id="watergauge'+i+'" width="50" height="50" style="display: block; margin: auto; padding-left: 30px"></svg></div></div>';
        $('#map').after($newdiv);          

        latd = locArray.locations.location[i].latitude;
        lond = locArray.locations.location[i].longitude;
        latPath = locArray.locations.location[i].latPath;
        longPath = locArray.locations.location[i].longPath;
        capacity = locArray.locations.location[i].capacity;
        histavg = locArray.locations.location[i].histavg;
        address = locArray.locations.location[i].address;
        toppad = locArray.locations.location[i].top;
        leftpad = locArray.locations.location[i].left;
        position = new google.maps.LatLng(latd+latPath[2], lond+longPath[2]);

        //placing markers in position

        marker = new CustomMarker(
            position,
            map,
            'markr'+i,
            toppad,
            leftpad,
            {}
        );


        //creating charts
        createCharts(i,capacity,histavg,address);



        //creating lines
        var line = new google.maps.Polyline({
            path: [{lat: latd, lng: lond}, {lat: latd+latPath[0] , lng: lond+longPath[0]}, {lat: latd+latPath[1], lng: lond+longPath[1]}, {lat: latd+latPath[2], lng: lond+longPath[2]}],
            strokeWeight: 1,
            map: map
        });

        // Add circle overlay and bind to marker
        circles = new MarkerWithLabel({
            icon: 'images/circle.png',
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(latd, lond),
            map: map,
            labelStyle: {opacity: 1.0}
        });

    }

    //gauge config
    var gaugeconfig = liquidFillGaugeDefaultSettings();
    gaugeconfig.circleColor = "#178BCA";
    gaugeconfig.textColor = "#178BCA";
    gaugeconfig.waveTextColor = "#A4DBF8";
    gaugeconfig.waveColor = "#178BCA";
    gaugeconfig.circleThickness = 0.1;
    gaugeconfig.circleFillGap = 0.2;
    gaugeconfig.textVertPosition = 0.8;
    gaugeconfig.waveAnimateTime = 2000;
    gaugeconfig.waveHeight = 0.3;
    gaugeconfig.waveCount = 1;

    //building the gauge
    gauge0= loadLiquidFillGauge("watergauge0", 0, gaugeconfig);
    gauge1= loadLiquidFillGauge("watergauge1", 0, gaugeconfig);
    gauge2= loadLiquidFillGauge("watergauge2", 0, gaugeconfig);
    gauge3= loadLiquidFillGauge("watergauge3", 0, gaugeconfig);
    gauge4= loadLiquidFillGauge("watergauge4", 0, gaugeconfig);
    gauge5= loadLiquidFillGauge("watergauge5", 0, gaugeconfig);
    gauge6= loadLiquidFillGauge("watergauge6", 0, gaugeconfig);
    gauge7= loadLiquidFillGauge("watergauge7", 0, gaugeconfig);
    gauge8= loadLiquidFillGauge("watergauge8", 0, gaugeconfig);
    gauge9= loadLiquidFillGauge("watergauge9", 0, gaugeconfig);
    gauge10= loadLiquidFillGauge("watergauge10", 0, gaugeconfig);
    gauge11= loadLiquidFillGauge("watergauge11", 0, gaugeconfig);
}