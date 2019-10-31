

appParcial.controller('title', function($scope){
    $scope.modulo = 'Parciales';
})

var parametros = {
    store: new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $.getJSON('/parametros/quintiles')
            .done(response => {
                response.data;
            })
        }    })
}
appParcial.controller('parcialController', function($scope, $http){
    var parciales = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/parciales/all')
            .then(response => {
                debugger;
                return response.data;
            })
            .catch(error => {
                DevExpress.ui.notify(error.data, 'error', 5000);
            })
        },

        insert: values => {
            return $http.post('/parciales/insert', values)
            .then(response => {
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
            })
            .catch(error => {
                DevExpress.ui.notify(error.data, 'error', 5000);
            })
        },
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
            if(id > 0)
            {
                return $http.post('/parciales/update/' + id, values)
                .then(response => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, 'error', 5000);
                })
            }
        }
    });

    //opciones
    $scope.dataGridOptions = {
        dataSource: {
            store: parciales
        },
        columns: [
            {
                dataField: 'id',
                visible: false
            },
            {
                dataField: 'catalogo_id',
                caption: 'Quintil',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ],
                lookup: {
                    dataSource: parametros,
                    displayExpr: 'descripcion',
                    valueExpr: 'id'
                }
            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'descripcion',
                caption: 'Descripción'
            },
            {
                dataField: 'activo',
                caption: 'Activo',
                dataType: 'boolean',
                width: 80
            }
        ],
        showBorders: true,
        pager: {
            infoText: 'Página {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPagesSizes: [5,10,15]
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: '¿Desea eliminar el registro?'
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'catalogo_id',
                        caption: 'Quintil'
                    },
                    {
                        dataField: 'nombre',
                        caption: 'Nombre'
                    },
                    {
                        dataField: 'descripcion',
                        caption: 'Descripción',
                        editorType: 'dxTextArea',
                        colSpan: 2
                    },
                    {
                        dataField: 'activo',
                        caption: 'Activo'
                    }
                ]
            }
        },


    }
})
