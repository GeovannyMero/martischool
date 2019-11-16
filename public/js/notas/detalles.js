appNotas.component('detallesComponent', {
    template: [
        "<div class='info-box bg-green'>"+
            "<span class='info-box-icon'>"+
                "<i class='fa fa-thumbs-up'></i>"+
            "</span>"+
            "<div class='info-box-content'>"+
                "<span class='info-box-text'>2019/10/01</span>"+
                "<span class='info-box-number'>Respondio bien {{$ctrl.param}}</span>"+
            "</div>"+
        "</div>"
    ].join(''),
    controller: () =>{},
    bindings: {
        param: '@'
    }

})
