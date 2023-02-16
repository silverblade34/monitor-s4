function actualizarTabla() {
  $.ajax({
      url: '/listar_eventos',
      method: 'GET',
      success: function (data) {
          // Procesa los datos recibidos y actualiza la tabla
          $('#sorting-table').DataTable().destroy();
          $('#sorting-table tbody').empty();
          for (var i = 0; i < data.length; i++) {
              var evento = data[i];
              var fila = '<tr>' +
                  '<td><span class="text-primary">' + evento.cod_evento + '</span></td>' +
                  '<td>' + evento.placa + '</td>' +
                  '<td>' + evento.fecha + '</td>' +
                  '<td>' + evento.velocidad + '</td>' +
                  '<td class="direccion">' + evento.direccion + '</td>' +
                  '<td><span style="width:100px;">' + evento.estado + '</span></td>' +
                  '<td>' + evento.fecha_ultima_accion + '</td>' +
                  '<td class="prioridad ' + evento.cod_evento + '"> <span class="badge-text badge-text-small info"></span></td>' +
                  '<td class="td-actions">' +
                  '<a href="/editar_evento?idevento=' + evento.ID + '"><i class="bx bx-edit edit"></i></a>' +
                  '<a href="#"><i class="bx bx-x delete"></i></a>' +
                  '</td>' +
                  '</tr>';
              $('#sorting-table tbody').append(fila);
          }
          $('#sorting-table').DataTable({
              "order": [[2, "desc"]]
          });
      }
  });
};
$(document).ready(function () {
  actualizarTabla();
});
setInterval(actualizarTabla, 10000);

