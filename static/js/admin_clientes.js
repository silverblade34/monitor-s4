
// ----------------------------------Modal Crear cuenta cliente SweetAlert2-----------------------------------

const crearClientes = document.getElementById("crearCliente");

crearClientes.addEventListener("click", function () {
  Swal.fire({
    title: "Crear cliente",
    html: `
      <form class="form-crearcuenta">
        <label class="form-label">Codigo de cliente</label>
        <input type="text" id="cod_cliente" class = "form-control input-text" placeholder="0001">
        <label class="form-label">Ruc</label>
        <input type="text" id="ruc" class = "form-control input-text" placeholder="Ruc de la empresa">
        <label class="form-label">Empresa</label>
        <input type="text" id="nombre_cliente" class = "form-control input-text" placeholder="Nombre de la empresa">
        <label class="form-label">Usuario</label>
        <input type="text" id="usuario_cuenta" class = "form-control input-text" placeholder="Usuario de admin de cuenta">
        <label class="form-label">Contraseña</label>
        <input type="password" id="password" class = "form-control input-pass" placeholder="Ingrese contraseña">
        <label class="form-label-vercontraseña">
        <input type="checkbox" class="form-checkbox" onclick="document.getElementById('password').type = this.checked ? 'text' : 'password'">
        Ver contraseña
        </label>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: "Crear",
    preConfirm: function () {
      const codcliente = document.getElementById("cod_cliente").value;
      const usuario = document.getElementById("usuario_cuenta").value;
      const password = document.getElementById("password").value;
      const ruc = document.getElementById("ruc").value;
      const nombre_cliente = document.getElementById("nombre_cliente").value;
      return {
        data: {
          cod_cliente: codcliente,
          usuario: usuario,
          contrasena: password,
          ruc: ruc,
          nombre_cuenta: "",
          nombre_rol: "Administrador",
          nombre_cliente: nombre_cliente
        }
      };
    }
  }).then(function (result) {
    if (result.value) {
      const data = result.value;
      console.log(data);
      if (!data.data.cod_cliente || !data.data.usuario || !data.data.contrasena || !data.data.ruc) {
        Swal.fire("Error", "Todos los campos son requeridos", "error");
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


// ----------------------------------Modal Eliminar cuenta cliente SweetAlert2-----------------------------------

const btnsdeletecliente2 = document.querySelectorAll(".delete-cliente-2");

btnsdeletecliente2.forEach(btndeletecliente2 => {
  btndeletecliente2.addEventListener("click", function () {
    Swal.fire({
      title: 'Desea eliminar a este cliente?',
      text: "Verifique si hay usuarios asociados a este cliente, podria haber conflictos!",
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

