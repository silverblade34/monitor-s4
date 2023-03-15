var columnasVisibles = [];
var searchValue = '';
  
// FUNCION ACTUALIZAR E INSERTAR DATOS A LA TABLA
function actualizarTabla() {
    $.ajax({
        url: '/listar_eventos',
        method: 'GET',
        success: function (data) {
            // Procesa los datos recibidos y actualiza la tabla
            var table = $('#sorting-table').DataTable();
            columnasVisibles.forEach(function (visibilidad, index) {
                table.column(index).visible(visibilidad);
            });
            table.destroy();
            $('#sorting-table tbody').empty();
            const dataeventos = data.listnot;
            const datausuario = data.datausuario;
            for (var i = 0; i < dataeventos.length; i++) {
                var evento = dataeventos[i];
                if (evento.DescripcionEstado == "En Gestion" || evento.DescripcionEstado == "Sin Atender"){
                    if(datausuario.cod_cuenta === "0000"){
                        var fila = '<tr>' +
                            '<td><span>' + evento.sigla_cuenta + '</span></td>' +
                            '<td><span>' + evento.sigla_cliente + '</span></td>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fecha + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion">' + evento.direccion + '</td>' +
                            '<td><span style="width:100px;">' + evento.DescripcionEstado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.Prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    }else if(datausuario.cod_cuenta != "0000" && datausuario.cod_cliente === "All"){
                        var fila = '<tr>' +
                            '<td><span>' + evento.sigla_cliente + '</span></td>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fecha + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion">' + evento.direccion + '</td>' +
                            '<td><span style="width:100px;">' + evento.DescripcionEstado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.Prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    }else if(datausuario.cod_cliente != "All"){
                        var fila = '<tr>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fecha + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion">' + evento.direccion + '</td>' +
                            '<td><span style="width:100px;">' + evento.DescripcionEstado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.Prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    }
                    $('#sorting-table tbody').append(fila);
                }
            }
            $('#sorting-table').DataTable({
                "order": [[2, "desc"]],
                "stateSave": false,
                "search": {
                    "search": searchValue // aplica el valor de búsqueda guardado
                },
                "language": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });
        }
    });
};

$(document).ready(function () {
    actualizarTabla();
});
setInterval(actualizarTabla, 10000);


// ACORDEON TABLA NOTIFICACIONES

function acordeonFiltroColumnasTabla(){
    const acordeon = document.getElementById("accordion-content-filtros-columnas");
    const icono = document.querySelector(".icon-arrow-1");

    if (acordeon.classList.contains("abierto")) {
        acordeon.classList.remove("abierto");
        icono.classList.remove("rotate");
    } else {
        acordeon.classList.add("abierto");
        icono.classList.add("rotate");
    }
}


// OCULTAR COLUMNAS DE NOTIFICACIONES
$('input[type="checkbox"]').on('change', function() {
    var table = $('#sorting-table').DataTable();
    table.columns().visible(false);
    $('input[type="checkbox"]:checked').each(function () {
        var column = table.column($(this).attr('data-column'));
        column.visible(true);
    });
    columnasVisibles = table.columns().visible();
    table.draw();
});


// ALMACENAR EL VALOR DEL SEARCH BUSCADO
// guarda el valor de búsqueda actual cada vez que cambia
$('#sorting-table').on('search.dt', function () {
    searchValue = $('#sorting-table').DataTable().search(); 
});
   

