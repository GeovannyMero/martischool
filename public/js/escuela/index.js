var app = angular.module('EscuelaModule', ['dx']);


app.controller('escuelaController', function escuelaController($scope, $http){
    var escuela = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/escuela/all')
            .then((response)=>{
                return response.data;
            }).catch((err)=>{
                console.log(err);
            })
        },
        //Actualizar
        update: (key, values)=>{
            let id = JSON.stringify(key['id']);
            if(id !== 0){
                return $http.post('/escuela/update/'+ id, values)
                .then((response) => {
                    DevExpress.ui.notify({
                        message: response.data['mensaje'],
                        position: {
                            my: 'center top',
                            at: 'center top'
                        }
                    }, 'success', 5000);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }

        },
        //eliminar
        remove: (key)=>{
            let id = JSON.stringify(key['id']);
            return $http.post('/escuela/delete/'+id)
            .then((response)=>{
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
            }).catch((err)=>{
                DevExpress.ui.notify(err.data, 'error', 5000);
            });
        },
        //insertar
        insert: (values)=>{
            return $http.post('/escuela/insertar/', values)
            .then((response)=>{
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
            }).catch((err)=>{
                console.log(err.data);
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        }

    });

    ///Option
    $scope.dataGridOptions = {
        dataSource: {
            store: escuela,
        },
    rowAlternationEnabled: true,
    columnHidingEnabled: true,
    columnAutoWidth: true,
    columns: [
        {
            dataField: 'id',
            caption: 'Id',
            width: 50,
            visible: false

        },
        {
            dataField: 'nombre',
            caption: 'Nombre',
            validationRules: [
                {
                    type: 'required',
                    message: 'Nombre es requerido'
                }
            ]

        },
        {
            dataField: 'descripcion',
            caption: 'Descripción',
            width: 150
        },
        {
            dataField: 'activo',
            caption: 'Estado',
            width: 70,
            validationRules: [
                {
                    type: 'required',
                    message: 'Estado es requerido'
                }
            ]
        },
        {
            dataField: 'created_by',
            visible: false
        },
        {
            dataField: 'updated_by',
            visible: false,
        },
        {
            dataField: 'created_at',
            visible:false,
        },
        {
            dataField: 'updated_at',
            visible: false,
        },
        {
            type: "buttons",
            width: 80,
            buttons: [
                {
                    icon: "bookmark",
                    visible: true,
                    hint: "Asignar Administrador",
                    onClick: e => {
                        var datos = e.row.data;
                        //alert(datos["id"]);
                        var id = datos["id"];
                        // $http.get("/escuela/administrador/" + id)
                        // .then(response => {
                        //     $('#pages').html("");
                        //     $('#pages').html(response.data);
                        // })
                        // .catch(error => console.error(error));
                        window.location = "/escuela/administrador/" + id;


                        // popup = null;
                        // popupOptions = {
                        //     width: 660,
                        //     height: 540,
                        //     contentTemplate: function(){
                        //         var rol = [
                        //             {
                        //                 "id": 2,
                        //                 "nombre": "Administrador"
                        //             },
                        //             {
                        //                 "id": 3,
                        //                 "nombre": "Profesor"
                        //             }
                        //         ];
                        //         return $("<div />").append(
                        //             // $("<p />").text("Static Content"),
                        //             $("<div />").attr("id", "formAdmin").dxForm({
                        //                 formData: {},
                        //                 colCount: 1,
                        //                 items: [
                        //                     {
                        //                         itemType: "group",
                        //                         //caption: "Información del Administrador",
                        //                         colCount: 2,
                        //                         items: [
                        //                             {
                        //                                 dataField: "rol_id",
                        //                                 editorType: "dxSelectBox",
                        //                                 editorOptions: {
                        //                                     dataSource: rol ,
                        //                                     displayExpr: "nombre",
                        //                                     valueExpr: "id",
                        //                                     value: rol[0].id,
                        //                                     readOnly: true
                        //                                 },
                        //                                 validationRules: [
                        //                                     {
                        //                                         type: "required",
                        //                                         message: "El rol es requedido"
                        //                                     }
                        //                                 ]
                        //                             },
                        //                             {
                        //                                 dataField: "name",
                        //                                 caption: "Usuario",
                        //                                 validationRules: [
                        //                                     {
                        //                                         type: "required",
                        //                                         message: "El usuario es requedido"
                        //                                     }
                        //                                 ]
                        //                             },
                        //                             {
                        //                                 dataField: "email",
                        //                                 caption: "Correo",
                        //                                 validationRules: [
                        //                                     {
                        //                                         type: "required",
                        //                                         message: "El correo es requedido"
                        //                                     }
                        //                                 ]
                        //                             }

                        //                         ]
                        //                     }
                        //                 ]
                        //             }),
                        //             $("<div />").attr("id", "buttonContainer").dxButton({
                        //                 text: "Click me",
                        //                 onClick: function (e) {
                        //                     // ...
                        //                 }
                        //             })
                        //             // $("#form_admin").dxForm({
                        //             //     formData: [],
                        //             //     items: [{
                        //             //         itemType: "group",
                        //             //         colCount: 3,
                        //             //         items: [
                        //             //             {
                        //             //                 dataField: "User"
                        //             //             }
                        //             //         ]

                        //             //     }]
                        //             // })
                        //         );
                        //     },
                        //     showTitle: true,
                        //     title: "Asignar Administrador",
                        //     visible: false,
                        //     dragEnabled: false,
                        //     closeOnOutsideClick: true
                        // };
                        // if(popup){
                        //     popup.option("contentTemplate", popupOptions.contentTemplate.bind(this));
                        // }else{
                        //     popup = $("#popup").dxPopup(popupOptions).dxPopup("instance");
                        // }
                        // popup.show();
                    }
                },
                "edit",
                "delete"
            ]
        }
    ],
        showBorders: true,
        filterRow: {
            visible: false
        },
        pager: {
            infoText: 'Página {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [5,10,15]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true,
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'fa fa-save Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: "¿Está ud. seguro que desea eliminar este registro?"
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'id',
                        disabled: true
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'nombre',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'descripcion',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'activo',
                        caption: 'Estado',
                        dataType: 'boolean',

                    }
                ]
            }
        }
    }

});

app.controller('title', function title($scope){
    $scope.modulo = 'Escuela';
});


