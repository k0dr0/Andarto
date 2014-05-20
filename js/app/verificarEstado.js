var APP = APP || {};

APP.verificarEstado = (function(){
  var RANGO = 100;
  var RMUNDO = 6371000;
  var posicionActual;
  var ultimaPosRuta = 0;
  var miRuta = [];
  var Tparado = 0;
  var Tmarcha = 0;
  var estado = "parado";


    var posicion = function(callback){
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function success(pos) {
          crd = {
          'lat' : pos.coords.latitude,
          'lng' : pos.coords.longitude
          };
          callback(crd);
        }

        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
      };

    var guardarPosicion=function(pos){
      miRuta.push(pos);
    };

    var toRadians = function(grados){
      return grados * (Math.PI/180);
    };

    var calcularDistancia = function(punto1,punto2){
      return Math.acos(Math.sin(toRadians(punto1.lat))*Math.sin(toRadians(punto2.lat))+Math.cos(toRadians(punto1.lat))*Math.cos(toRadians(punto2.lat))*Math.cos(toRadians(punto1.lng)-toRadians(punto2.lng)))*RMUNDO;
    };

    var verificarPosicion = function(posicionActual,recorrido){
      var dist =[];

      if(ultimaPosRuta<recorrido.length-2){
        var udist = calcularDistancia(posicionActual,recorrido[ultimaPosRuta]);
        var nextdist = calcularDistancia(posicionActual,recorrido[ultimaPosRuta+1]);
        while(nextdist<udist){
          udist = nextdist;
          ultimaPosRuta++;
          nextdist = calcularDistancia(posicionActual,recorrido[ultimaPosRuta+1]);
        }
        if(udist<RANGO){
          console.log("Dentro de la ruta");
        }
        else{
          console.log("Fuera de la ruta");
        }

      }

    };

    var verificarTiempo = function(){
      if(estado == 'parado'){
        if((miRuta.length>1) && (calcularDistancia(miRuta[miRuta.length-1],miRuta[miRuta.length-2])>10)){//si en 5 segundos se ha movido algo se pasa del estado parado a moviendo
          estado = 'en marcha';
          console.log('se ha puesto en marcha');
          //TO DO se deberia de enviar una alerta al servidor
          Tmarcha = 0;
          Tparado = 0;
        }
        else{
          console.log('parado');
          Tparado++;
        }

      }
      else if(estado == 'en marcha'){
        if((miRuta.length>24) && (calcularDistancia(miRuta[miRuta.length-1],miRuta[miRuta.length-23])<10)){//si en 2 minutos no se ha movido se cambia el estado a parado
          console.log('se ha parado');
          //TO DO se deberia de enviar una alerta al servidor
          estado = 'parado';
          Tmarcha = 0;
          Tparado = 0;
        }
        else{
          console.log('en marcha');
          Tmarcha++;
        }
      }
    };

    var verificador = function(recorrido){
      posicion(function(pos){
                  guardarPosicion(pos);
                  verificarPosicion(pos,recorrido);
                  verificarTiempo();
              });
    };
    return {
      verificador:verificador
    };

})();
