// ----------------------------ACTUALIZAR NOTIFICACIONES EN EL HEADER---------------------------------------

function actualizarNotificaciones() {
  $.ajax({
    url: '/listar_eventos',
    method: 'GET',
    success: function (data) {
      const listnot = data.listnot
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
      var cont = 0;
      var lengthnot = listnot.length - 1;
      while (cont <= 4) {
        var evento = listnot[lengthnot];
        if (evento.estado == 0) {
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
          cont++;
        }
        lengthnot--;
      }
      cola = '<li>' +
        '<a rel="nofollow" href="/notificaciones" class="dropdown-item all-notifications text-center">View' +
        'All Notifications</a>' +
        '</li>';

      $('#dropdown-menu-notification').append(cola);
    }
  });
};
$(document).ready(function () {
  actualizarNotificaciones();
});


// ----------------------------------Modal Editar cuenta usuario por cliente SweetAlert2-----------------------------------

const editarUsuarioXclientes2 = document.querySelectorAll(".editarUsuarioXCliente2");

editarUsuarioXclientes2.forEach(editarUsuarioXcliente2 => {
  editarUsuarioXcliente2.addEventListener("click", function () {
    const cuentaId = this.dataset.cuentaId;
    const codCliente = this.dataset.codCliente;
    fetch(`/buscar_cuenta_cliente?idcuenta=${cuentaId}&codcliente=${codCliente}`, {
      method: "GET",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al buscar cliente");
        }
        return response.json();
      })
      .then(data => {
        const contrasenaant = data.contrasena
        Swal.fire({
          title: "Editar cuenta cliente",
          html: `
          <form class="form-crearcuenta">
            <label class="form-label">Tipo de Rol</label>
            <input type="text" id="nombre_rol" class = "form-control input-text" value="${data.rol}" disabled>
            <label class="form-label">Usuario</label>
            <input type="text" id="usuario_cuenta" class = "form-control input-text" value="${data.usuario}">
            <label class="form-label">Contraseña</label>
            <input type="password" id="password" oninput="mostrarContainerPass()" class = "form-control input-pass" value="${data.contrasena}">
            <label class="form-label-vercontraseña">
            <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password').type = this.checked ? 'text' : 'password'">
            Ver contraseña
            </label>
            <div id="container-repetir-newpasw">
            <label class="form-label">Repetir nueva contraseña</label>
            <input type="password" id="password2" class="form-control input-pass" oninput="checkPasswordMatch()" placeholder="Repetir contraseña">
            <label class="form-label-vercontraseña">
            <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password2').type = this.checked ? 'text' : 'password'">
            Ver contraseña
          </label>
            <span id="password2-validation-msg" class="password2-validation-msg"></span>
            </div>
            <div class="form-check toggle-switch text-end form-switch me-4 pt-3">
            <label class="form-label">Estado</label>
            <input class="form-check-input" type="checkbox" id="estado-cuenta" ${data.estado === true ? 'checked' : ''}>
            </div>
          </form>
        `,
          showCancelButton: true,
          confirmButtonText: "Actualizar cuenta",
          preConfirm: function () {
            //const codcliente = document.getElementById("cod_cliente").value;
            const usuario = document.getElementById("usuario_cuenta").value;
            const password = document.getElementById("password").value;
            const passwordInput2 = document.getElementById("password2").value;
            //const ruc = document.getElementById("ruc").value;
            const nombre_rol = document.getElementById("nombre_rol").value;
            const estadoCheckbox = document.getElementById("estado-cuenta").checked;
            //const nombre_cliente = document.getElementById("nombre_cliente").value;
            return {
              id: cuentaId,
              data: {
                cod_cliente: data.cod_cliente,
                nombre_cliente: data.empresa,
                sigla: data.sigla,
                usuario: usuario,
                contrasena: password,
                contrasena2: passwordInput2,
                ruc: data.ruc,
                rol_cliente: nombre_rol,
                estado: estadoCheckbox,

                namecontacto1: "",
                contacto1: "",
                namecontacto2: "",
                contacto2: "",
              }
            };
          }
        }).then(function (result) {
          if (result.value) {
            const data = result.value;
            if (!data.data.cod_cliente || !data.data.usuario || !data.data.contrasena || !data.data.ruc) {
              Swal.fire("Error", "Todos los campos son requeridos", "error");
              return;
            } else if (data.data.contrasena != contrasenaant) {
              if (data.data.contrasena != data.data.contrasena2) {
                Swal.fire("Error", "Las contraseñas no coinciden", "error");
                return;
              }
            }
            // Envía los datos del formulario a una ruta POST en Flask
            fetch("/actualizar_cuenta_cliente", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error("Error al actualizar la cuenta");
                }
                return response.json();
              })
              .then(data => {
                Swal.fire("Actualizado", data.message + "!", "success");
                setTimeout(function () {
                  location.reload();
                }, 2000);
              })
              .catch(error => {
                console.error(error);
                Swal.fire("Error", data.message, "error");
              });
          }
        });
      })
  });
});
