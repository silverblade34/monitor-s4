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

// ----------------------------------MODAL CONTACTOS ACORDEON--------------------------

function abrirAcordeonContactos() {
  const acordeon = document.getElementById("acordeon-contactos");
  const icono = document.querySelector(".icon-arrow-2");

  if (acordeon.classList.contains("abierto")) {
    acordeon.classList.remove("abierto");
    icono.classList.remove("rotate");
  } else {
    acordeon.classList.add("abierto");
    icono.classList.add("rotate");
  }
}

// ----------------------------------MODAL DATOS EMPRESA ACORDEON--------------------------
function abrirAcordeonDatosEmpresa() {
  const acordeon = document.getElementById("acordeon-datos-empresa");
  const icono = document.querySelector(".icon-arrow-3");

  if (acordeon.classList.contains("abierto")) {
    acordeon.classList.remove("abierto");
    icono.classList.remove("rotate");
  } else {
    acordeon.classList.add("abierto");
    icono.classList.add("rotate");
  }
}

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
        <div type="button" id="btn-contacto" onclick="abrirAcordeonDatosEmpresa()" class="btn-agregar-contactos mt-1"><span>Agregar Datos Empresa (Obligatorio)</span>
        <i class='bx bx-chevron-down icon-arrow-3'></i></div>
        <div id="acordeon-datos-empresa" class="acordeon-datosEmpresa">
        <label class="form-label">Ruc</label>
        <input type="text" id="ruc" class = "form-control input-text" placeholder="Ruc de la empresa">
        <label class="form-label">Empresa</label>
        <input type="text" id="nombre_cuenta" class = "form-control input-text" placeholder="Nombre de la empresa">
        <div class="pb-3">
          <label class="form-label">Sigla</label>
          <input type="text" id="sigla" class = "form-control input-text" placeholder="Nombre corto empresa">
        </div>
        </div>
        <div type="button" id="btn-contacto" onclick="abrirAcordeonContactos()" class="btn-agregar-contactos mt-2"><span>Agregar Contactos</span>
        <i class='bx bx-chevron-down icon-arrow-2'></i></div>
        <div id="acordeon-contactos" class="acordeon-contactos">
          <div class="form-g pt-1">
            <label>Nombre de contacto 1</label>
            <input type="text" class="form-control" id="namecontacto1" name="namecontacto1" placeholder="Nombre de contacto">
          </div>
          <div class="form-g pt-1">
            <label>Número Contacto 1</label>
            <input type="text" class="form-control" id="contacto1" name="contacto1" placeholder="Ejemplo: +51 999 888 777">
          </div>
          <div class="form-g pt-1">
          <label>Nombre de contacto 2</label>
          <input type="text" class="form-control" id="namecontacto2" name="namecontacto2" placeholder="Nombre de contacto">
          </div>
          <div class="form-g pt-1 pb-3">
            <label>Número Contacto 2</label>
            <input type="text" class="form-control" id="contacto2" name="contacto2" placeholder="Ejemplo: +51 999 888 777">
          </div>
        </div>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: "Crear",
    preConfirm: function () {
      const usuario = document.getElementById("usuario_cuenta").value;
      const sigla = document.getElementById("sigla").value;
      const passwordInput = document.getElementById("password").value;
      const passwordInput2 = document.getElementById("password2").value;
      const ruc = document.getElementById("ruc").value;
      const mensajecontent = document.getElementById("usuario_mensaje").textContent;
      const nombre_cuenta = document.getElementById("nombre_cuenta").value;

      const namecontacto1 = document.getElementById("namecontacto1").value;
      const contacto1 = document.getElementById("contacto1").value;
      const namecontacto2 = document.getElementById("namecontacto2").value;
      const contacto2 = document.getElementById("contacto2").value;
      return {
        data: {
          cod_cuenta: "",
          usuario: usuario,
          contrasena: passwordInput,
          contrasena2: passwordInput2,
          sigla: sigla,
          ruc: ruc,
          mensajecontent: mensajecontent,
          nombre_cuenta: nombre_cuenta,
          nombre_rol: "Administrador",
          namecontacto1: namecontacto1,
          contacto1: contacto1,
          namecontacto2: namecontacto2,
          contacto2: contacto2,
        }
      };
    }
  }).then(function (result) {
    if (result.value) {
      const data = result.value;
      if (!data.data.nombre_cuenta || !data.data.usuario || !data.data.contrasena || !data.data.ruc  || !data.data.sigla) {
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
      cancelButtonColor: '#9b9b9b',
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
        const contrasenaant = data.contrasena;
        const codcuenta = data.cod_cuenta;
        Swal.fire({
          title: "Editar cuenta",
          html: `
          <form class="form-crearcuenta">
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
            <div type="button" id="btn-contacto" onclick="abrirAcordeonDatosEmpresa()" class="btn-agregar-contactos mt-2"><span>Datos de la Empresa</span>
            <i class='bx bx-chevron-down icon-arrow-3'></i></div>
            <div id="acordeon-datos-empresa" class="acordeon-datosEmpresa">
            <label class="form-label">Ruc</label>
            <input type="text" id="ruc" class = "form-control input-text" placeholder="Ruc de la empresa" value="${data.ruc}">
            <label class="form-label">Empresa</label>
            <input type="text" id="nombre_cuenta" class = "form-control input-text" placeholder="Nombre de la empresa" value="${data.empresa}">
            <div class="pb-3">
              <label class="form-label">Sigla</label>
              <input type="text" id="sigla" class = "form-control input-text" placeholder="Nombre corto empresa" value="${data.sigla}">
            </div>
            </div>
            <div type="button" id="btn-contacto" onclick="abrirAcordeonContactos()" class="btn-agregar-contactos mt-2"><span>Contactos asociados</span>
            <i class='bx bx-chevron-down icon-arrow-2'></i></div>
            <div id="acordeon-contactos" class="acordeon-contactos">
              <div class="form-g pt-1">
                <label>Nombre de contacto 1</label>
                <input type="text" class="form-control" id="namecontacto1" name="namecontacto1" placeholder="Nombre de contacto" value="${data.nombre_contacto1}">
              </div>
              <div class="form-g pt-1">
                <label>Número Contacto 1</label>
                <input type="text" class="form-control" id="contacto1" name="contacto1" placeholder="Ejemplo: +51 999 888 777" value="${data.telefono_contacto1}">
              </div>
              <div class="form-g pt-1">
              <label>Nombre de contacto 2</label>
              <input type="text" class="form-control" id="namecontacto2" name="namecontacto2" placeholder="Nombre de contacto" value="${data.nombre_contacto2}">
              </div>
              <div class="form-g pt-1 pb-3">
                <label>Número Contacto 2</label>
                <input type="text" class="form-control" id="contacto2" name="contacto2" placeholder="Ejemplo: +51 999 888 777" value="${data.telefono_contacto2}">
              </div>
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
            const sigla = document.getElementById("sigla").value;
            const nombre_cuenta = document.getElementById("nombre_cuenta").value;
            const usuario = document.getElementById("usuario_cuenta").value;
            const password = document.getElementById("password").value;
            const passwordInput2 = document.getElementById("password2").value;
            const ruc = document.getElementById("ruc").value;
            const estadoCheckbox = document.getElementById("estado-cuenta").checked;

            const namecontacto1 = document.getElementById("namecontacto1").value;
            const contacto1 = document.getElementById("contacto1").value;
            const namecontacto2 = document.getElementById("namecontacto2").value;
            const contacto2 = document.getElementById("contacto2").value;
            return {
              id: cuentaId,
              data: {
                cod_cuenta: codcuenta,
                nombre_rol: "Administrador",
                usuario: usuario,
                contrasena: password,
                sigla: sigla,
                contrasena2: passwordInput2,
                ruc: ruc,
                estado: estadoCheckbox,
                nombre_cuenta: nombre_cuenta,

                namecontacto1: namecontacto1,
                contacto1: contacto1,
                namecontacto2: namecontacto2,
                contacto2: contacto2,
              }
            };
          }
        }).then(function (result) {
          if (result.value) {
            const data = result.value;
            if (!data.data.cod_cuenta || !data.data.usuario || !data.data.contrasena || !data.data.ruc || !data.data.sigla) {
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

