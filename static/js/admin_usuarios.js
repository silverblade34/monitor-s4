
// ----------------------------------Modal Crear usuario por cliente SweetAlert2-----------------------------------

const crearUsuarios2 = document.getElementById("crearusuario-2");

crearUsuarios2.addEventListener("click", function () {
  fetch('/mostrar_idcuenta', {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al buscar cuenta");
      }
      return response.json();
    })
    .then(data => {
      const nombre_cliente = this.dataset.rpEmpresa;
      const ruc = this.dataset.rpRuc;
      const sigla = this.dataset.rpSigla;
      const idcuenta = data.ID
      Swal.fire({
        title: "Crear usuario",
        html: `
            <form class="form-crearcuenta">
              <label class="form-label">Rol</label>
              <select class="form-select" id="select-rol" aria-label="Default select example">
              <option selected>Seleccione un rol</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Operador">Operador</option>
              </select>
              <label class="form-label">Usuario<span>(mínimo 3 caracteres)</span></label>
              <input type="text" id="usuario_cuenta" oninput="validarUsuarioUnico()" class = "form-control input-text" placeholder="Usuario de admin de cuenta">
              <span id="usuario_mensaje" class="usuario-validation-msg"></span>
              <label class="form-label">Contraseña</label>
              <input type="password" id="password" class = "form-control input-pass" placeholder="Ingrese contraseña">
              <label class="form-label-vercontraseña">
              <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password').type = this.checked ? 'text' : 'password'">
              Ver contraseña
              </label>
              <label class="form-label">Repetir contraseña</label>
              <input type="password" id="password2" class="form-control input-pass" oninput="checkPasswordMatch()" placeholder="Repetir contraseña">
              <label class="form-label-vercontraseña">
                <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password2').type = this.checked ? 'text' : 'password'">
                Ver contraseña
              </label>
              <span id="password2-validation-msg" class="password2-validation-msg"></span>
            </form>
          `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        preConfirm: function () {
          const usuario = document.getElementById("usuario_cuenta").value;
          const password = document.getElementById("password").value;
          const passwordInput2 = document.getElementById("password2").value;
          const mensajecontent = document.getElementById("usuario_mensaje").textContent;
          const nombre_rol = document.getElementById("select-rol").value;
          return {
            data: {
              idcuenta: idcuenta,
              cod_cliente: "",
              usuario: usuario,
              contrasena: password,
              sigla: sigla,
              contrasena2: passwordInput2,
              mensajecontent: mensajecontent,
              ruc: ruc,
              nombre_rol: nombre_rol,
              nombre_cliente: nombre_cliente,

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
          if (!data.data.usuario || !data.data.contrasena || !data.data.ruc || !data.data.idcuenta) {
            Swal.fire("Error", "Todos los campos son requeridos", "error");
            return;
          } else if (data.data.contrasena != data.data.contrasena2) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
          } else if (data.data.usuario.length <= 3) {
            Swal.fire("Error", "El usuario debe tener por lo menos 3 caracteres", "error");
            return;
          } else if (data.data.mensajecontent == "Este usuario ya se ha creado") {
            Swal.fire("Error", "Este usuario ya se ha creado, los usuarios deben ser unicos", "error");
            return;
          }
          // Envía los datos del formulario a una ruta POST en Flask
          fetch("/crear_cuenta_cliente", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Error al crear cuenta");
              }
              return response.json();
            })
            .then(data => {
              Swal.fire("Agregado", data.message + "!", "success");
              setTimeout(function () {
                location.reload();
              }, 2000);
            })
            .catch(error => {
              console.error(error);
              Swal.fire("Error", "Error al crear cuenta", "error");
            });
        }
      });
    });
});


// ----------------------------------Modal Eliminar cliente usuario SweetAlert2-----------------------------------

const deleteclienteUsuario3 = document.querySelectorAll(".delete-clienteUsuario2");

deleteclienteUsuario3.forEach(deleteclienteUser3 => {
  deleteclienteUser3.addEventListener("click", function () {
    Swal.fire({
      title: 'Deseas eliminar a este usuario?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#9b9b9b',
      confirmButtonText: 'Si, eliminar usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
        const cuentaId = this.dataset.cuentaId;
        const codCliente = this.dataset.codCliente;

        fetch(`/eliminar_cuenta_cliente?idusuario=${cuentaId}&codcliente=${codCliente}`, {
          method: "GET",
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Error al eliminar cuenta");
            }
            return response.json();
          })
          .then(data => {
            Swal.fire("Eliminado", data.message, "success");
            setTimeout(function () {
              location.reload();
            }, 2000);
          })
          .catch(error => {
            Swal.fire("Error", "Error al eliminar cuenta", "error");
          });
      }
    });
  });
});
