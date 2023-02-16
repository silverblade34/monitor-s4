// ----------------------------ACTUALIZAR NOTIFICACIONES EN EL HEADER---------------------------------------

function actualizarNotificaciones() {
    $.ajax({
        url: '/listar_eventos',
        method: 'GET',
        success: function (data) {
            // Procesa los datos recibidos y actualiza las notificaciones
            $('#dropdown-menu-notification').empty();
            encabezado = ' <li>' +
                '<div class="notifications-header">' +
                '<div class="title">Notificaciones</div>' +
                '<div class="notifications-overlay"></div>' +
                `<img src="{{url_for('static', filename='icons/logo-text')}}" alt="">` +
                '</div>' +
                '</li>';
            $('#dropdown-menu-notification').append(encabezado);
            if (data.length - 4 <= 4) {
                for (var i = data.length - 1; i <= 0; i--) {
                    var evento = data[i];
                    var fila = ' <li>' +
                        '<a href="#">' +
                        '<div class="message-icon">' +
                        '<i style="font-size: 25px;" class="bx bxs-bell-ring"></i>' +
                        '</div>' +
                        '<div class="message-body">' +
                        '<div class="message-body-heading">' +
                        evento.fecha + ' | ' + evento.cod_evento
                        + '</div>' +
                        '<span class="date">' + 'Placa: ' + evento.placa + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                    $('#dropdown-menu-notification').append(fila);
                }
                cola = '<li>' +
                    '<a rel="nofollow" href="/home" class="dropdown-item all-notifications text-center">View' +
                    'All Notifications</a>' +
                    '</li>';
            } else {
                for (var i = data.length - 4; i < data.length; i++) {
                    var evento = data[i];
                    var fila = ' <li>' +
                        '<a href="#">' +
                        '<div class="message-icon">' +
                        '<i style="font-size: 25px;" class="bx bxs-bell-ring"></i>' +
                        '</div>' +
                        '<div class="message-body">' +
                        '<div class="message-body-heading">' +
                        evento.fecha + ' | ' + evento.cod_evento
                        + '</div>' +
                        '<span class="date">' + 'Placa: ' + evento.placa + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                    $('#dropdown-menu-notification').append(fila);
                }
                cola = '<li>' +
                    '<a rel="nofollow" href="/home" class="dropdown-item all-notifications text-center">View' +
                    'All Notifications</a>' +
                    '</li>';
            }

            $('#dropdown-menu-notification').append(cola);
        }
    });
};
$(document).ready(function () {
    actualizarNotificaciones();
});
