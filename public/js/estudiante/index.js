var app = angular.module('App', ['dx']);

app.controller('appController', function estudianteController($scope, $http){
    var estudiantes = new DevExpress.data.CustomStore({
        //load
        load: function(){
            return $http.post('/estudiante/all')
            .then(function(response){
                return response.data;
            }, function(response){
                alert(response.data);
            });
        },
        //insert
        insert: function(values){
            //console.log(JSON.stringify(values));}
            return $http.post('/estudiante/saveEstudiante', values)
            .then(function(response){
                console.log(response.data.mensaje);
                //return response.data;
                DevExpress.ui.notify(response.data['mensaje'],"success",6000);
            }).catch(function(err){
                console.log(err);
                DevExpress.ui.notify(err.data,"error",6000);
                //return err;
            })
                    
            },
        //Update
        update: function(key, values){
            var id = JSON.stringify(key["id"]);
            //DevExpress.ui.notify(id,"success",6000);
            return $http.post('/estudiante/update/' + id, values)
            .then(function(response){
                console.log(response);
                DevExpress.ui.notify(response.data["mensaje"], "success", 6000);
            }).catch(function(err){
                DevExpress.ui.notify(err.data,"error",6000);
            })
        }
    }

    );
//Opciones del Grid
    $scope.dataGridOptions = {
        dataSource: {
            store: estudiantes
        },
        columns:[
            {
                dataField: 'id',
                caption: "ID",
                editorOptions:{
                    disabled: true
                }
                
            },
            {
                dataField: 'identificacion',
                caption: "Identificación",
                validationRules: [
                    {
                        type: "required",
                        message: "Identificación es requerida"
                    }
                ]
                
            },
            {
                dataField: 'tipoidentificacion',
                caption: "Tipo Identificación",
                validationRules: [
                    {
                        type: "required"
                    }
                ]
               
            },
            {
                dataField: 'primernombre',
                
            },
            {
                dataField: 'segundonombre',
                
            },
            {
                dataField: 'apellidopaterno',
                
            },
            {
                dataField: 'apellidomaterno',
                
            },
            {
                dataField: 'fechanacimiento',
                dataType: "date"
                
            },
            {
                dataField: 'genero'
            }
        ], 
        showBorders: true,
        filterRow: {
            visible: true,
        },
        pager: {
            infoText: 'Pagina {0} de {1}',
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
            visible: true
        }, 
        editing:{
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChnages: 'Cancelar'
            }
        },
        selection:{
            mode: "multiple"
        },
        rowAlternationEnabled: true,
        
        //toolbar
        onToolbarPreparing: function(e){
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift({
                location: "before"
            },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        type: "success",
                        onClick: function(){
                            dataGrid.refresh();
                        }
                    }

                }
            );
        }
    }
});