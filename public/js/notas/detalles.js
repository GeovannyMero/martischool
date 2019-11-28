appNotas.component('detallesComponent', {
    template: [

        // "<div class='info-box bg-red'>"+

        //     "<span class='info-box-icon'>"+
        //         "<i class='fa fa-thumbs-up'></i>"+
        //     "</span>"+
        //     "<div class='info-box-content'>"+
        //         "<span class='info-box-text'>{{$ctrl.fecha}}</span>"+
        //         "<span class='info-box-number'>{{$ctrl.comentario}}</span>"+
        //     "</div>"+
        // "</div>"

        "<div class='{{$ctrl.clase}}'>"+
            "<div class='box-header with-border' style='padding-top: 2px; padding-left: 0.5px'>"+
                "<h3><span style='background-color:{{$ctrl.color}}; color: white; padding: 3px; border-radius: 3px'> {{$ctrl.tipo}} <i class='{{$ctrl.icono}}'></i></span></h3>"+
                "<div class='box-tools pull-right'>"+
                    "<button type='button' class='btn btn-box-tool'>"+
                        "<i class='fa fa-pencil'></i>"+
                    "</button>"+
                    "<button type='button' class='btn btn-box-tool'>"+
                        "<i class='fa fa-times'></i>"+
                    "</button>"+
                "</div>"+
            "</div>"+
            "<div class='box-body'>"+
                "<p>{{$ctrl.comentario}}</p>"+
            "</div>"+
        "</div>"

    ].join(''),
    controller: () => {},
    bindings: {
        fecha: '@',
        comentario: '@',
        tipo: '@',
        clase: '@',
        icono: '@',
        color: '@'
    }

})

$(function(){
    $('#tipo').css('color', 'red');
})
