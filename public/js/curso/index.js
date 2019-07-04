var app = angular.module('cursoModule', ['dx']);

app.controller('title', ($scope) => {
    $scope.modulo = 'Cursos';
});
 var niveles = {
     store: new DevExpress.data.CustomStore({
         key: 'id',
         loadMode: "raw",
         load: () => {
            return $.getJSON('/cursoNiveleducativo/niveles');

         }

     })
 }


app.controller('cursoController', function cursoController($scope, $http){
    var cursos = new DevExpress.data.CustomStore(
        {
            load: () => {
                return $http.post('/curso/all')
                .then((response) => {
                    return response.data;
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                });
            }
        }
    );

    //opciones
    $scope.dataGridOptions = {
        dataSource: {
            store: cursos
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns:
        [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50

            },
            {
                dataField: 'nombre',
                caption: 'Nombre',

            },
            {
                dataField: 'curso_letra',
                caption: 'Curso en Letras'
            },
            {
                dataField: 'curso_numero',
                caption: 'Curso en Numero',

            },
            {
                dataField: 'curso_siguiente',
                caption: 'Curso a promover'
            },
            {
                dataField: 'id_nivel',
                caption: 'Nivel',
                lookup: {
                    dataSource: niveles,
                    displayExpr: 'nombre',
                    valueExpr: 'id'
                }


            },
            {
                dataField: 'activo',
                caption: 'Activo'
            }
        ],
        onEditingStrart: e => e.component.columnOption('id', 'allowEditing', false),
        showborder: true,
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
        searchPane: {
            visible: true,
            placeholder: 'Buscar'
        },
        selection: {
            mode: "multiple"
        },
        editing: {
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar'
            },
            form: {
                colCount: 2,
                items:
                [
                    {
                        dataField: 'id',
                        caption: 'ID'
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'nombre',
                        caption: 'Nombre',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_letras',
                        caption: 'Curso en Letras',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_numero',
                        caption: 'Curso en numero',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_siguiente',
                        caption: 'Curso a promover',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'id_nivel',
                        caption: 'Nivel',
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
                    location: 'before',
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh',
                        type: 'success',
                        onclick: function() {
                            dataGrid.refresh();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon:'trash',
                        type: 'danger',
                        onclick: () => {
                            console.log('REmove');
                        }

                    }
                }
            );
        }

    }
})

