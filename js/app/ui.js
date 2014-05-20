var APP = APP||{};
APP.UI = (function(lng, undefined) {
    "use strict";

    var createElement = function(descripcion){
          var $li = $('<li/>');

            $li.append(descripcion);

            return $li;

    };

    var mostrarRuta = function(ruta){

        var $ul = $('#listaDatos');

        var latOrigen = ruta[0].lng;
        var lngOrigen = ruta[0].lat;
        var latDestino = ruta[50].lng;
        var lngDestino = ruta[50].lat;
        var origen = new google.maps.LatLng(latOrigen, lngOrigen);
        var destin = new google.maps.LatLng(latDestino, lngDestino);

        console.log("origen");
        console.log(origen);
        console.log("destino");
        console.log(destin);

        var waypts = [];
        for (var i = 1; i <= 8; i++)
        {
            var lat = ruta[i].lng;
            var lngtemp = ruta[i].lat;
            var coord = new google.maps.LatLng(lat, lngtemp);
            waypts.push({
                location:  coord,
                stopover:true
            });
        }
        console.log(waypts);

        var divMap = $("<div id='map'></div>");
        divMap.insertAfter($("#listaDatos"));

        $("#map").gmap3({
          getroute:{
            options:{
                origin:origen,
                destination:destin,
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
                waypoints:waypts
            },
            callback: function(results){
              if (!results){
                console.log("fallo del callback de la ruta");
            return;
        }
              $(this).gmap3({
                map:{
                  options:{
                    zoom: 13,
                    center: [latOrigen,lngOrigen]
                  }
                },
                directionsrenderer:{
                    container: $(document.createElement("div")).addClass("googlemap").insertAfter($("#map")),
                  options:{
                    directions:results
                  }
                }
              });
            }
          }
        });



        $ul.empty();
        /*var lis = [];
        for (var i = 0; i < ruta.length-1; i++) {
            lis.push('<li>Lat: ' + ruta[i].lat + ', Lng: ' + ruta[i].lng + '</li>');
        }
        $ul.append(lis);
    */
    };

    var eliminarMapa = function(){
        $('#map').gmap3();
        setTimeout(function(){
            $('#map').gmap3('destroy').remove();
            $('.googlemap').remove();
        }, 100);
    };

    var mostrarCamion = function(camion){
        console.log("Pintar camion");
        var $ul = $('#listaDatos');
        eliminarMapa();
        $ul.empty();
        $ul.append('<li>Identificador: ' + camion.idCamion + '</li>');
        $ul.append('<li>Matricula: ' + camion.matricula + '</li>');
    };

    var mostrarRemolque = function(remolque){
        console.log("Pintar remolque");
        var $ul = $('#listaDatos');
        eliminarMapa();
        $ul.empty();
        $ul.append('<li>Identificador: ' + remolque.idRemolque + '</li>');
        $ul.append('<li>Matricula: ' + remolque.matricula + '</li>');
    };

    var mostrarAlertas = function(alertas) {
        var $ul = $('#listaDatos');
        eliminarMapa();
        $ul.empty();
        var lis = [];
        for (var i = 0; i < alertas.length; i++) {
            var $li = createElement(alertas[i].descripcion);
            lis.push($li);
        }
        $ul.append(lis);
    };

    var mostrarConductor = function(conductor){
        var $ul = $('#listaDatos');
        eliminarMapa();
        $ul.empty();
        $ul.append('<li>Identificador: ' + conductor.idConductor + '</li>');
        $ul.append('<li>Nombre: ' + conductor.nombre + '</li>');
        $ul.append('<li>Apellido: ' + conductor.apellido + '</li>');
    };

    var esconderAlertas = function(alertas) {
        var $ul = $('#listaDatos');
        $ul.empty();
    };

    var avisoAlertas = function(nuevasAlertas) {
        var alerta;
        for (alerta in nuevasAlertas){
            alert(nuevasAlertas[alerta].descripcion);
        }
    };

    var avisoTiempo = function(tiempo) {

        console.log("estadoTiempo : " + tiempo);
    };

    var mostrarActivo = function(li){
        var $li = $(li);
        $li.addClass('active').siblings('.active').removeClass('active');
    };

    return {
        mostrarAlertas : mostrarAlertas,
        esconderAlertas : esconderAlertas,
        mostrarConductor : mostrarConductor,
        mostrarRuta : mostrarRuta,
        mostrarCamion : mostrarCamion,
        mostrarRemolque : mostrarRemolque,
        avisoAlertas : avisoAlertas,
        mostrarActivo : mostrarActivo
    };

})();