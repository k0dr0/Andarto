    $(function(){
        "use strict";

        $(document).on('click', '#alertas', APP.Controller.listaAlertas);
        $(document).on('click', '#conductor', APP.Controller.showDriver);
        $(document).on('click', '#ruta', APP.Controller.showRuta);
        $(document).on('click', '#camion', APP.Controller.showCamion);
        $(document).on('click', '#remolque', APP.Controller.showRemolque);
    });
