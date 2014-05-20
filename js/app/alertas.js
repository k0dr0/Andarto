var APP = APP||{};
APP.Alertas = (function(){
    "use strict";

    var getAlertas = function(devolverDatos){

        $.ajax({
                url : 'data/alertas.json',
                cache : false,
                dataType : 'json',
                success : devolverDatos,
                error : errorAjax
        });

    };

    var hayAlertas = function(devolverAlertas){

        $.ajax({
                url : 'data/avisoAlertas.json',
                cache : false,
                dataType : 'json',
                success : devolverAlertas,
                error : errorAjax
        });

    };

    var errorAjax = function(jqXHR, textStatus, errorThrown){//Es conveniente poner una funcion de error siempre.
        console.log(errorThrown);
    };
    return{
        getAlertas : getAlertas,
        hayAlertas : hayAlertas
    };

})();