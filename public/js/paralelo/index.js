var app = angular.module('paraleloModule', ['dx']);

app.controller('title', function($scope){
    $scope.modulo = 'Paralelos';
});


app.controller('paraleloController', function paraleloController($scope, $http){
 var paralelos = new DevExpress.data.CustomStore({
     load: () => {
         return $http.post('/paralelo/all')
         .then((response) => {
            return response.data;
         })
         .catch((err) => {
            DevExpress.ui.notify(err.data,'error',5000);
         })
     },
     update: (key, values) => {
         let id = JSON.stringify(key['id']);
         if(id !== 0)
         {
             return $http.post('/paralelo/update/' + id, values)
             .then((response) => {
                DevExpress.ui.notify(response.data['mensaje'], "success", 5000);
             })
             .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
             })
         }
     },
     insert: (values) => {
         return $http.post('/paralelo/insert', values)
         .then((response) => {
            DevExpress.ui.notify(response.data['mensaje'], 'success', 5000)
         })
         .catch((err) => {
            DevExpress.ui.notify(err.data, 'error', 5000);
         })
     }

 });
 //Opciones GRID
 $scope.dataGridOptions = {
     dataSource: {
         store: paralelos
     },
     rowAlternationEnabled: true,
     columnHidingEnabled: true,
     columnAutoWidth: true,
     columns: [
         {
             dataField: 'id',
             caption: 'ID',
             width: 50,
             visible: false
         },
         {
             dataField: 'nombre',
             caption: 'Paralelo',
             validationRules: [
                 {
                     type: 'required',
                     message: 'El nombre es obligatorio'
                 }
             ]

         },
         {
             dataField: 'activo',
             caption: 'Activo',
             dataType: 'boolean',
             width: 70
         }
     ],
     summary: {
        totalItems: [{
            column: "nombre",
            summaryType: "count",
            displayFormat: 'Total: {0}'
        }]
    },
    onEditingStart: e => e.component.columnOption('id','allowEditing', false),
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
        allowedPagesSizes: [5,10,15]
    },
    paging: {
        enable: true,
        pageIndex: 0,
        pageSize: 5
    },
    selection: {
        mode: "multiple"
    },
    searchPanel: {
        visible: true,
        placeholder: 'Buscar'
    },
    editing:
    {
        mode: 'form',
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        useIcons: true,
        texts : {
            saveRowChanges: 'Guardar',
            cancelRowChanges: 'Cancelar',
            confirmDeleteTitle: 'Eliminar Registro',
            confirmDeleteMessage: "¿Está ud. seguro que desea eliminar este registro?"
        },
        form: {
            colCount: 2,
            items: [
                {
                    dataField: 'id',
                    caption: 'ID'
                },
                {
                    itemType: 'empty'
                },
                {
                    dataField: 'nombre',
                    caption: 'Paralelo',
                    editorOptions: {
                        showClearButton: true
                    }
                },
                {
                    dataField: 'activo',
                    caption: 'Activo',
                    dataType: 'boolean'
                }
            ]
        }
    },

    onToolbarPreparing: e => {
        var dataGrid = e.component;

        e.toolbarOptions.items.unshift(
            {
                location: 'before'
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    //type: 'success',
                    onClick: function(){
                        dataGrid.refresh();
                    }
                }

            },
            // {
            //     location: 'after',
            //     widget: 'dxButton',
            //     options: {
            //         icon:'trash',
            //         //type: 'danger',
            //         onClick: function() {
            //             console.log(dataGrid);


            //         }

            //     }
            // }
        )
    }


 }
});
