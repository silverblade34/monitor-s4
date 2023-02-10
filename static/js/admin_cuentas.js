// Animacion acordeon
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

// ---------------------------------- Crear cuenta -----------------------------------

const crearCuentaMaestra = document.getElementById("crearCuentaMaestra");

crearCuentaMaestra.addEventListener("click", function () {
  Swal.fire({
    title: "Crear cuenta",
    html: `
      <form class="form-crearcuenta">
        <label class="form-label">Codigo de cuenta</label>
        <input type="text" id="cod_cuenta" class = "form-control input-text" required>
        <label class="form-label">Ruc</label>
        <input type="text" id="ruc" class = "form-control input-text" required>
        <label class="form-label">Empresa</label>
        <input type="text" id="nombre_cuenta" class = "form-control input-text" required>
        <label class="form-label">Usuario</label>
        <input type="text" id="usuario_cuenta" class = "form-control input-text" required>
        <label class="form-label">Contraseña</label>
        <input type="password" id="password" class = "form-control input-pass" required>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: "Crear",
    preConfirm: function () {
      const codcuenta = document.getElementById("cod_cuenta").value;
      const usuario = document.getElementById("usuario_cuenta").value;
      const password = document.getElementById("password").value;
      const ruc = document.getElementById("ruc").value;
      const nombre_cuenta = document.getElementById("nombre_cuenta").value;
      return {
        data: {
          cod_cuenta: codcuenta,
          cod_cliente: "All",
          usuario: usuario,
          contrasena: password,
          ruc: ruc,
          nombre_cuenta: nombre_cuenta,
          nombre_rol: "Administrador",
          nombre_cliente: ""

        }
      };
    }
  }).then(function (result) {
    if (result.value) {
      const data = result.value;
      console.log(data);
      if (!data.data.cod_cuenta || !data.data.usuario || !data.data.contrasena || !data.data.ruc) {
        Swal.fire("Error", "Todos los campos son requeridos", "error");
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

// ----------------------------------Eliminar cuenta-----------------------------------

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


// ----------------------------------Editar cuenta-----------------------------------

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
        Swal.fire({
          title: "Editar cuenta",
          html: `
          <form class="form-crearcuenta">
            <label class="form-label">Codigo de cuenta</label>
            <input type="text" id="cod_cuenta" class = "form-control input-text" value="${data.cod_cuenta}">
            <label class="form-label">Tipo de Rol</label>
            <input type="text" id="nombre_rol" class = "form-control input-text" value="${data.nombre_rol}" disabled>
            <label class="form-label">Empresa</label>
            <input type="text" id="nombre_cuenta" class = "form-control input-text" value="${data.nombre_cuenta}">
            <label class="form-label">Usuario</label>
            <input type="text" id="usuario_cuenta" class = "form-control input-text" value="${data.usuario}">
            <label class="form-label">Contraseña</label>
            <input type="password" id="password" class = "form-control input-pass" value="${data.contrasena}">
            <label class="form-label">Ruc</label>
            <input type="text" id="ruc" class = "form-control input-text" value="${data.ruc}">
            <div class="form-check toggle-switch text-end form-switch me-4 pt-3">
            <label class="form-label">Estado</label>
            <input checked class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ${data.estado === true ? 'checked' : ''}>
            </div>
          </form>
        `,
          showCancelButton: true,
          confirmButtonText: "Actualizar cuenta",
          preConfirm: function () {
            const codcuenta = document.getElementById("cod_cuenta").value;
            const usuario = document.getElementById("usuario_cuenta").value;
            const password = document.getElementById("password").value;
            const ruc = document.getElementById("ruc").value;
            return {
              id: cuentaId,
              cod_cuenta: codcuenta,
              cod_cliente: "All",
              usuario: usuario,
              contrasena: password,
              ruc: ruc
            };
          }
        }).then(function (result) {
          if (result.value) {
            const data = result.value;
            if (!data.cod_cuenta || !data.usuario || !data.contrasena || !data.ruc) {
              Swal.fire("Error", "Todos los campos son requeridos", "error");
              return;
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


