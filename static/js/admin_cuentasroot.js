// ------------------------------ ANIMACION DEL ACORDEN USUARIOS---------------------------------
var accHeader = document.getElementsByClassName("accordion-header");

for (var i = 0; i < accHeader.length; i++) {
  accHeader[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
};
//----------------------------------VALIDAR CONTRASEÑA AL CREAR CUENTA---------------------------------

function checkPasswordMatch() {
  const password1Input = document.getElementById("password");
  const password2Input = document.getElementById("password2");
  const password2ValidationMsg = document.getElementById("password2-validation-msg");

  if (password1Input.value !== password2Input.value) {
    password2ValidationMsg.style.display = "block";
    password2ValidationMsg.textContent = "Las contraseñas no coinciden";
    password2ValidationMsg.style.color = "red";
    return false;
  } else {
    password2ValidationMsg.style.display = "block";
    password2ValidationMsg.textContent = "Las contraseñas coinciden";
    password2ValidationMsg.style.color = "green";
  }
}
// -----------------------------------MOSTRAR CONTAINER PASSWOORD ---------------------------------
function mostrarContainerPass() {
  const container = document.getElementById("container-repetir-newpasw");
  container.style.display = "block";
}

// ----------------------------------- VALIDAR USUARIO UNICO --------------------------------------
function validarUsuarioUnico() {
  const nameusuario = document.getElementById("usuario_cuenta").value;
  // Actualizar el mensaje debajo del input
  const mensaje = document.getElementById("usuario_mensaje");
  if (nameusuario.length >= 3) {
    fetch(`/validarUsuarioUnico?nameusuario=${nameusuario}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        mensaje.textContent = data.message;
        if (data.status == true) {
          mensaje.style.color = "green";
          mensaje.style.display = "block";
        } else if (data.status == false) {
          mensaje.style.color = "red";
          mensaje.style.display = "block";
        }
      })
      .catch(error => console.error(error));
  } else {
    mensaje.textContent = "El usuario debe contener mínimo 3 caracteres";
    mensaje.style.color = "red";
    mensaje.style.display = "block";
  }
}

// ----------------------------------Modal Crear cuenta SweetAlert2-----------------------------------

const crearCuentaMaestra = document.getElementById("crearCuentaMaestra");

crearCuentaMaestra.addEventListener("click", function () {
  Swal.fire({
    title: "Crear Cuenta",
    html: `
      <form class="form-crearcuenta">
        <label class="form-label">Ruc</label>
        <input type="text" id="ruc" class = "form-control input-text" placeholder="Ruc de la empresa">
        <label class="form-label">Empresa</label>
        <input type="text" id="nombre_cuenta" class = "form-control input-text" placeholder="Nombre de la empresa">
        <label class="form-label">Abreviatura empresa</label>
        <input type="text" id="abrev_name" class = "form-control input-text" placeholder="Nombre corto empresa">
        <label class="form-label">Usuario <span>(mínimo 3 caracteres)</span></label>
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
      const passwordInput = document.getElementById("password").value;
      const passwordInput2 = document.getElementById("password2").value;
      const ruc = document.getElementById("ruc").value;
      const mensajecontent = document.getElementById("usuario_mensaje").textContent;
      const nombre_cuenta = document.getElementById("nombre_cuenta").value;
      return {
        data: {
          cod_cuenta: "",
          usuario: usuario,
          contrasena: passwordInput,
          contrasena2: passwordInput2,
          ruc: ruc,
          mensajecontent: mensajecontent,
          nombre_cuenta: nombre_cuenta,
          nombre_rol: "Administrador",
        }
      };
    }
  }).then(function (result) {
    if (result.value) {
      const data = result.value;
      console.log(data);
      if (!data.data.nombre_cuenta || !data.data.usuario || !data.data.contrasena || !data.data.ruc) {
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
      fetch("/crear_cuenta", {
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

// ----------------------------------MODAL ELIMINAR CUENTA SWEET ALERT-----------------------------------

const btnsdeletecuenta = document.querySelectorAll(".delete-cuenta");

btnsdeletecuenta.forEach(btndeletecuenta => {
  btndeletecuenta.addEventListener("click", function () {
    Swal.fire({
      title: 'Desea eliminar esta cuenta?',
      text: "Verifique si hay usuarios asociadas a esta cuenta, podria haber conflictos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar cuenta!'
    }).then((result) => {
      if (result.isConfirmed) {
        const cuentaId = this.dataset.cuentaId;

        fetch(`/eliminar_cuenta?idusuario=${cuentaId}`, {
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


// ----------------------------------MODAL EDITAR CUENTA SWEET ALERT-----------------------------------

const editarCuentasMaestra = document.querySelectorAll(".editar-cuenta");

editarCuentasMaestra.forEach(editarCuentaMaestra => {
  editarCuentaMaestra.addEventListener("click", function () {
    const cuentaId = this.dataset.cuentaId;
    fetch(`/buscar_cuenta?idusuario=${cuentaId}`, {
      method: "GET",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al buscar cuenta");
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        const contrasenaant = data.contrasena
        Swal.fire({
          title: "Editar cuenta",
          html: `
          <form class="form-crearcuenta">
            <label class="form-label">Codigo de cuenta</label>
            <input type="text" id="cod_cuenta" class = "form-control input-text" value="${data.cod_cuenta}" disabled>
            <label class="form-label">Empresa</label>
            <input type="text" id="nombre_cuenta" class = "form-control input-text" value="${data.empresa}">
            <label class="form-label">Usuario</label>
            <input type="text" id="usuario_cuenta" class = "form-control input-text" value="${data.usuario}">
            <label class="form-label">Contraseña</label>
            <input type="password" id="password" class = "form-control input-pass" oninput="mostrarContainerPass()"  value="${data.contrasena}">
            <label class="form-label-vercontraseña">
            <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password').type = this.checked ? 'text' : 'password'">
            Ver contraseña
            </label>
            <div id="container-repetir-newpasw">
            <label class="form-label">Repetir nueva contraseña</label>
            <input type="password" id="password2" class="form-control input-pass" oninput="checkPasswordMatch()" placeholder="Repetir contraseña">
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
            const codcuenta = document.getElementById("cod_cuenta").value;
            const nombre_cuenta = document.getElementById("nombre_cuenta").value;
            const usuario = document.getElementById("usuario_cuenta").value;
            const password = document.getElementById("password").value;
            const passwordInput2 = document.getElementById("password2").value;
            const ruc = document.getElementById("ruc").value;
            const estadoCheckbox = document.getElementById("estado-cuenta").checked;
            return {
              id: cuentaId,
              data: {
                cod_cuenta: codcuenta,
                nombre_rol: "Administrador",
                usuario: usuario,
                contrasena: password,
                contrasena2: passwordInput2,
                ruc: ruc,
                estado: estadoCheckbox,
                nombre_cuenta: nombre_cuenta,
              }
            };
          }
        }).then(function (result) {
          if (result.value) {
            const data = result.value;
            if (!data.data.cod_cuenta || !data.data.usuario || !data.data.contrasena || !data.data.ruc) {
              Swal.fire("Error", "Todos los campos son requeridos", "error");
              return;
            } else if (data.data.contrasena != contrasenaant) {
              if (data.data.contrasena != data.data.contrasena2) {
                Swal.fire("Error", "Las contraseñas no coinciden", "error");
                return;
              }
            }
            // Envía los datos del formulario a una ruta POST en Flask
            fetch("/actualizar_cuenta", {
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

