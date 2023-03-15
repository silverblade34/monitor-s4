
// ----------------------------------Modal Crear cuenta cliente SweetAlert2-----------------------------------

const crearClientes2 = document.getElementById("crearCliente-2");

crearClientes2.addEventListener("click", function () {
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
      const idcuenta = data.ID
      Swal.fire({
        title: "Crear cliente",
        html: `
            <form class="form-crearcuenta" enctype="multipart/form-data">
              <label class="form-label">Rol</label>
              <select class="form-select" id="select-rol" aria-label="Default select example">
              <option value="Administrador" selected>Administrador</option>
              </select>
              <label class="form-label">Usuario</label>
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
              <div type="button" id="btn-contacto" onclick="abrirAcordeonContactos()" class="btn-agregar-contactos mt-2"><span>Registrar Datos del cliente (Obligatorio)</span>
              <i class='bx bx-chevron-down icon-arrow-2'></i></div>
              <div id="acordeon-contactos" class="acordeon-contactos cliente">
              <label class="form-label">Ruc</label>
              <input type="text" id="ruc" class = "form-control input-text" placeholder="Ruc de la empresa">
              <label class="form-label">Cliente</label>
              <input type="text" id="nombre_cliente" class = "form-control input-text" placeholder="Nombre del cliente">
              <label class="form-label">Sigla</label>
              <input type="text" id="sigla" class = "form-control input-text" placeholder="Nombre corto empresa">
              <label class="form-label">Logo</label>
              <input type="file" id="logo" accept=".png" class="form-control input-file mb-3">
              </div>
              </div>
            </form>
          `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        preConfirm: function () {
          const usuario = document.getElementById("usuario_cuenta").value;
          const password = document.getElementById("password").value;
          const sigla = document.getElementById("sigla").value;
          const passwordInput2 = document.getElementById("password2").value;
          const ruc = document.getElementById("ruc").value;
          const mensajecontent = document.getElementById("usuario_mensaje").textContent;
          const nombre_cliente = document.getElementById("nombre_cliente").value;
          const nombre_rol = document.getElementById("select-rol").value;

          var fileLogo = document.getElementById("logo").files[0];
          return {
            data: {
              idcuenta: idcuenta,
              cod_cliente: "",
              usuario: usuario,
              contrasena: password,
              sigla: sigla,
              contrasena2: passwordInput2,
              ruc: ruc,
              mensajecontent: mensajecontent,
              nombre_rol: nombre_rol,
              nombre_cliente: nombre_cliente,
              fileLogo: fileLogo
            }
          };
        }
      }).then(function (result) {
        if (result.value) {
          const data = result.value;
          const fileLogo = data.data.fileLogo;
          const usuario = data.data.usuario;
          if (!data.data.usuario || !data.data.contrasena || !data.data.ruc || !data.data.idcuenta || !data.data.sigla) {
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
                throw new Error("Error al establecer conexión con el servidor");
              }
              return response.json();
            })
            .then(data => {
              // Enviar la imagen al servidor mediante AJAX
              // Crear un objeto FormData
              const formData = new FormData();
              formData.append('usuario', usuario);
              formData.append('file', fileLogo);

              // Enviar la imagen al servidor mediante fetch
              fetch('/guardarImageCliente', {
                method: 'POST',
                body: formData
              })
              .catch(error => {
                // Manejar el error
                console.error(error);
                Swal.fire("Error", "La imagen no se cargó correctamente al servidor", "error");
              });
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

// ----------------------------------Modal Editar cuenta cliente SweetAlert2-----------------------------------

const editarClientes2 = document.querySelectorAll(".editar-cliente-2");

editarClientes2.forEach(editarCliente2 => {
  editarCliente2.addEventListener("click", function () {
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
            <label class="form-label">Codigo de cliente</label>
            <input type="text" id="cod_cliente" class = "form-control input-text" value="${data.cod_cliente}" disabled>
            <label class="form-label">Empresa</label>
            <input type="text" id="nombre_cliente" class = "form-control input-text" value="${data.empresa}" disabled>
            <label class="form-label">Sigla</label>
            <input type="text" id="sigla" class = "form-control input-text" value="${data.sigla}">
            <label class="form-label">Tipo de Rol</label>
            <input type="text" id="nombre_rol" class = "form-control input-text" value="${data.rol}" disabled>
            <label class="form-label">Usuario<span>(mínimo 3 caracteres)</span></label>
            <input type="text" id="usuario_cuenta" class = "form-control input-text" value="${data.usuario}">
            <label class="form-label">Contraseña</label>
            <input type="password" id="password" class = "form-control input-pass" oninput="mostrarContainerPass()" value="${data.contrasena}">
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
            <label class="form-label">Ruc</label>
            <input type="text" id="ruc" class = "form-control input-text" value="${data.ruc}">
            <div class="form-check toggle-switch text-end form-switch me-4 pt-3">
            <label class="form-label">Estado</label>
            <input class="form-check-input" type="checkbox" id="estado-cuenta" ${data.estado === true ? 'checked' : ''}>
            </div>
          </form>
        `,
          showCancelButton: true,
          confirmButtonText: "Actualizar cuenta",
          preConfirm: function () {
            const codcliente = document.getElementById("cod_cliente").value;
            const usuario = document.getElementById("usuario_cuenta").value;
            const sigla = document.getElementById("sigla").value;
            const password = document.getElementById("password").value;
            const passwordInput2 = document.getElementById("password2").value;
            const ruc = document.getElementById("ruc").value;
            const nombre_rol = document.getElementById("nombre_rol").value;
            const estadoCheckbox = document.getElementById("estado-cuenta").checked;
            const nombre_cliente = document.getElementById("nombre_cliente").value;
            return {
              id: cuentaId,
              data: {
                cod_cliente: codcliente,
                nombre_cliente: nombre_cliente,
                usuario: usuario,
                sigla: sigla,
                contrasena: password,
                contrasena2: passwordInput2,
                ruc: ruc,
                rol_cliente: nombre_rol,
                estado: estadoCheckbox
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

// ----------------------------------Modal Eliminar cliente SweetAlert2-----------------------------------

const deletecliente = document.querySelectorAll(".delete-cliente-2");

deletecliente.forEach(deletecliente => {
  deletecliente.addEventListener("click", function () {
    Swal.fire({
      title: 'Deseas eliminar a este cliente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#9b9b9b',
      confirmButtonText: 'Si, eliminar cliente!'
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


// ----------------------------------Modal Crear usuario por cliente SweetAlert2-----------------------------------

const crearUsuariosXcliente = document.getElementById("crearUsuarioXCliente");

crearUsuariosXcliente.addEventListener("click", function () {
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
      const options = data.clientes.map(item => {
        if (item.rol === "Administrador") {
          return `<option value="${item.empresa}" data-ruc="${item.ruc}" data-sigla="${item.sigla}">${item.empresa}</option>`
        }
      })
        .join('');
      const idcuenta = data.ID
      Swal.fire({
        title: "Crear usuario",
        html: `
            <form class="form-crearcuenta">
              <label class="form-label">Cliente asociado</label>
              <select class="form-select" id="select-cuentacliente" aria-label="Default select example">
              <option selected>A que cliente pertenece</option>
              ${options}
              </select>
              <label class="form-label">Rol</label>
              <select class="form-select" id="select-rol" aria-label="Default select example">
              <option selected>Seleccione un rol</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Operador">Operador</option>
              </select>
              <label class="form-label">Usuario</label>
              <input type="text" id="usuario_cuenta" oninput="validarUsuarioUnico()" class = "form-control input-text" placeholder="Usuario de admin de cuenta">
              <span id="usuario_mensaje" class="usuario-validation-msg"></span>
              <label class="form-label">Contraseña</label>
              <input type="password" id="password" oninput="mostrarContainerPass()" class = "form-control input-pass" placeholder="Ingrese contraseña">
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
          const selectcliente = document.getElementById("select-cuentacliente");
          const nombre_cliente = document.getElementById("select-cuentacliente").value;
          const usuario = document.getElementById("usuario_cuenta").value;
          const password = document.getElementById("password").value;
          const passwordInput2 = document.getElementById("password2").value;
          const selectedOption = selectcliente.options[selectcliente.selectedIndex];
          const mensajecontent = document.getElementById("usuario_mensaje").textContent;
          const ruc = selectedOption.getAttribute('data-ruc');
          const sigla = selectedOption.getAttribute('data-sigla');
          const nombre_rol = document.getElementById("select-rol").value;
          return {
            data: {
              idcuenta: idcuenta,
              cod_cliente: "",
              usuario: usuario,
              contrasena: password,
              sigla: sigla,
              contrasena2: passwordInput2,
              ruc: ruc,
              mensajecontent: mensajecontent,
              nombre_rol: nombre_rol,
              nombre_cliente: nombre_cliente
            }
          };
        }
      }).then(function (result) {
        if (result.value) {
          const data = result.value;
          if (!data.data.usuario || !data.data.contrasena || !data.data.ruc || !data.data.idcuenta || !data.data.sigla) {
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


// ----------------------------------Modal Editar cuenta usuario por cliente SweetAlert2-----------------------------------

const editarUsuarioXclientes = document.querySelectorAll(".editarUsuarioXCliente");

editarUsuarioXclientes.forEach(editarUsuarioXcliente => {
  editarUsuarioXcliente.addEventListener("click", function () {
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
                estado: estadoCheckbox
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

// ----------------------------------Modal Eliminar cliente usuario SweetAlert2-----------------------------------

const deleteclienteUsuario2 = document.querySelectorAll(".delete-clienteUsuario");

deleteclienteUsuario2.forEach(deleteclienteUser2 => {
  deleteclienteUser2.addEventListener("click", function () {
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