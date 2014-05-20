var APP = APP||{};
APP.Controller = (function() {
    "use strict";

    var intervaloAlertas;

    var init = function() {
        intervaloAlertas = setInterval(APP.Controller.nuevasAlertas,5000);

    };

    /*$(document).on('click', '.tabs li', function(e){
        var $this = $(this);
        $this.addClass('current').siblings('.current').removeClass('current');
        $this.data('target').show().siblings('.module').hide();
    });*/

    var nuevasAlertas = function(e){
        APP.Pedir.getInfo(function(nuevasAlertas, textStatus, jqXHR){
            if (nuevasAlertas.length > 0){
                APP.UI.avisoAlertas(nuevasAlertas);
            }
        }, 'data/avisoAlertas.json');
    };

    var listaAlertas = function(e){
        APP.UI.mostrarActivo(this);
        clearInterval(intervaloAlertas);
        APP.Pedir.getInfo(function(alertas, textStatus, jqXHR){
            if (alertas.length > 0){
                APP.UI.mostrarAlertas(alertas);
            } else APP.UI.esconderAlertas(alertas);
        }, 'data/alertas.json');
    };

    var showDriver = function(e){
        APP.UI.mostrarActivo(this);
        APP.Pedir.getInfo(function(conductor, textStatus, jqXHR){
            APP.UI.mostrarConductor(conductor);
        }, 'data/conductor.json');
    };

    var showRuta = function(e){
        APP.UI.mostrarActivo(this);
        APP.Ruta.getRuta(function(recorrido, textStatus, jqXHR){
            console.log(recorrido);
            APP.UI.mostrarRuta(recorrido);
        });
    };

    var showCamion = function(e){
        APP.UI.mostrarActivo(this);
        APP.Pedir.getInfo(function(camion, textStatus, jqXHR){
            APP.UI.mostrarCamion(camion);
        }, 'data/camion.json');
    };

    var showRemolque = function(e){
        APP.UI.mostrarActivo(this);
        APP.Pedir.getInfo(function(remolque, textStatus, jqXHR){
            APP.UI.mostrarRemolque(remolque);
        }, 'data/remolque.json');
    };

    return {
        listaAlertas : listaAlertas,
        nuevasAlertas : nuevasAlertas,
        showDriver : showDriver,
        showRuta : showRuta,
        showCamion : showCamion,
        showRemolque : showRemolque,
        init : init

    };
})();