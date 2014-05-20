var APP = APP||{};
APP.Pedir = (function(){
    "use strict";

    var getInfo = function(devolverInfo, rutaInfo){
        $.ajax({
                url : rutaInfo,
                cache : false,
                dataType : 'json',
                success : devolverInfo,
                error : errorAjax
        });
    };

    var errorAjax = function(jqXHR, textStatus, errorThrown){//Es conveniente poner una funcion de error siempre.
        console.log(errorThrown);
    };

    return{
        getInfo : getInfo
    };

})();