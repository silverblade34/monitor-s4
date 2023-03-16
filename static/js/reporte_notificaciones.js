$(document).ready(function () {
    var table = $('#table-reporte-notificaciones').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
        },
        "dom": 'Bfrtip', // Agrega botones de exportación
        "buttons": [
            {
                extend: 'copyHtml5',
                className: 'btn-exportar'
            },
            {
                extend: 'excelHtml5',
                className: 'btn-exportar'
            },
            {
                extend: 'csvHtml5',
                className: 'btn-exportar'
            },
            {
                extend: 'pdfHtml5',
                className: 'btn-exportar'
            }
        ], // Botones de exportación
        searching: false,
        "pageLength": 20 // Muestra 25 filas por página
    });
    $('#myForm').on('submit', function (e) {
        e.preventDefault();

        var fecha_desde = $('#fecha-desde').val();
        var fecha_hasta = $('#fecha-hasta').val();
        var select_eventos = $('#select-eventos').val();
        var select_estados = $('#select-estados').val();
        var placa = $('#placa').val();

        table.clear().draw();

        fetch('/filtrar_reporte_notificaciones?fecha_desde=' + fecha_desde + '&fecha_hasta=' + fecha_hasta + '&placa=' + placa + '&select_eventos=' + select_eventos + '&select_estados=' + select_estados)
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    table.row.add(['<td class="td-reportes">' + data[i].cod_evento + '</td>',
                    '<td class="td-reportes">' + data[i].placa + '</td>',
                    '<td class="td-reportes">' + data[i].fecha + '</td>',
                    '<td class="td-reportes">' + data[i].velocidad + '</td>',
                    '<td class="td-reportes">' + data[i].direccion + '</td>',
                    '<td class="td-reportes">' + data[i].geocerca + '</td>',
                    '<td class="td-reportes">' + data[i].fecha_ultima_accion + '</td>',
                    '<td class="td-reportes">' + data[i].DescripcionEstado + '</td>',
                    '<td class="td-reportes">' + data[i].Prioridad + '</td>'
                    ]).draw();
                }
            });
    });
});
