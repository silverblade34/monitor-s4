var columnasVisibles = [];
var searchValue = '';
var estadoFilas = {};

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
                if (evento.descripcion_estado == "En Gestion" || evento.descripcion_estado == "Sin Atender") {
                    if (datausuario.cod_cuenta === "0000") {
                        var fila = '<tr>' +
                            '<td><span>' + evento.sigla_cuenta + '</span></td>' +
                            '<td><span>' + evento.sigla_cliente + '</span></td>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fechahora + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion"><span style="width:100%;">' + evento.direccion + '</span></td>' +
                            '<td><span style="width:100%;">' + evento.descripcion_estado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    } else if (datausuario.cod_cuenta != "0000" && datausuario.cod_cliente === "All") {
                        var fila = '<tr>' +
                            '<td><span>' + evento.sigla_cliente + '</span></td>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fechahora + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion">' + evento.direccion + '</td>' +
                            '<td><span style="width:100%;">' + evento.descripcion_estado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    } else if (datausuario.cod_cliente != "All") {
                        var fila = '<tr>' +
                            '<td><span >' + evento.cod_evento + '</span></td>' +
                            '<td>' + evento.placa + '</td>' +
                            '<td>' + evento.fechahora + '</td>' +
                            '<td>' + evento.velocidad + '</td>' +
                            '<td class="direccion">' + evento.direccion + '</td>' +
                            '<td><span style="width:100%;">' + evento.descripcion_estado + '</span></td>' +
                            '<td>' + evento.fecha_ultima_accion + '</td>' +
                            '<td class="pr ' + evento.prioridad + '"> <span class="badge-text badge-text-small info"></span></td>' +
                            '<td class="td-actions">' +
                            '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                            '</td>' +
                            '</tr>';
                    }
                    $('#sorting-table tbody').append(fila);
                }
            }
            $('#sorting-table').DataTable({
                "responsive": true,
                "order": [[2, "desc"]],
                "stateSave": true,
                "search": {
                    "search": searchValue // aplica el valor de búsqueda guardado
                },
                rowCallback: function (row, data) {
                    var id = data[0]; // asumimos que el primer dato es el identificador unico
                    if (estadoFilas[id]) {
                        $(row).addClass('shown');
                        $('div.inner', row).show();
                    }
                },
                "language": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                },
            });
            // ALMACENAR EL VALOR DEL SEARCH BUSCADO
            // guarda el valor de búsqueda actual cada vez que cambia
            $('#sorting-table').on('search.dt', function () {
                searchValue = $('#sorting-table').DataTable().search();
            });

            // evento para guardar el estado del acordeon
            $('#sorting-table tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);
                var id = row.data()[0]; // asumimos que el primer dato es el identificador unico
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                    estadoFilas[id] = false; // guardar estado cerrado
                } else {
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                    estadoFilas[id] = true; // guardar estado abierto
                }
            });
        }
    });
};

$(document).ready(function () {
    actualizarTabla();
});
setInterval(actualizarTabla, 15000);


// OCULTAR COLUMNAS DE NOTIFICACIONES
$('input[type="checkbox"]').on('change', function () {
    var table = $('#sorting-table').DataTable();
    table.columns().visible(false);
    $('input[type="checkbox"]:checked').each(function () {
        var column = table.column($(this).attr('data-column'));
        column.visible(true);
    });
    columnasVisibles = table.columns().visible();
    console.log(columnasVisibles)
    table.draw();
});


// ACORDEON TABLA NOTIFICACIONES

function acordeonFiltroColumnasTabla() {
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



