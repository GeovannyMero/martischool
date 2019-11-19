appNotas.component('detallesComponent', {
    template: [
        "<div class='info-box bg-red'>"+
            "<span class='info-box-icon'>"+
                "<i class='fa fa-thumbs-up'></i>"+
            "</span>"+
            "<div class='info-box-content'>"+
                "<span class='info-box-text'>{{$ctrl.fecha}}</span>"+
                "<span class='info-box-number'>{{$ctrl.comentario}}</span>"+
            "</div>"+
        "</div>"
    ].join(''),
    controller: () =>{},
    bindings: {
        fecha: '@',
        comentario: '@',
        tipo: '@'
    }

})
