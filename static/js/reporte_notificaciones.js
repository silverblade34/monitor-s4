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
        searching: false
      });
    $('#myForm').on('submit', function (e) {
        e.preventDefault();

        var fecha_desde = $('#fecha-desde').val();
        var fecha_hasta = $('#fecha-hasta').val();
        var placa = $('#placa').val();

        table.clear().draw();

        fetch('/filtrar_reporte_notificaciones?fecha_desde=' + fecha_desde + '&fecha_hasta=' + fecha_hasta + '&placa=' + placa)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    table.row.add([
                        data[i].cod_evento,
                        data[i].placa,
                        data[i].fecha,
                        data[i].velocidad,
                        data[i].direccion,
                        data[i].estado,
                        data[i].fecha_ultima_accion,
                        data[i].prioridad
                    ]).draw();
                }
            });
    });
});
