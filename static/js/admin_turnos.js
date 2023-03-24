$(document).ready(function () {
    var table = $('#table-admin-turnos').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
        },
    });
})

// ----------------------------------MODAL CREAR TURNOS-----------------------------------

const btnTurnos = document.getElementById("crear-turnos");


btnTurnos.addEventListener("click", function () {
    const id = this.dataset.idTurnos;
    Swal.fire({
        title: "Crear Turnos",
        html: `
          <form class="form-crearcuenta">
            <label class="form-label">Descripción</label>
            <input type="text" id="descripcion" class = "form-control input-text" placeholder="Ejemplo: 9:00 am - 6:00pm">
            <label class="form-label" for="hora">Hora desde:</label>
            <input type="time" class="form-control input-text" id="hora-desde" name="hora-desde">
            <label class="form-label" for="hora">Hora hasta:</label>
            <input type="time" class="form-control input-text" id="hora-hasta" name="hora-desde">
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        preConfirm: function () {
            const descripcion = document.getElementById("descripcion").value;
            const hora_desde = document.getElementById("hora-desde").value;
            const hora_hasta = document.getElementById("hora-hasta").value;
            return {
                data: {
                    id: id,
                    descripcion: descripcion,
                    hora_desde: hora_desde,
                    hora_hasta: hora_hasta
                }
            };
        }
    }).then(function (result) {
        if (result.value) {
            const data = result.value;
            if (!data.data.descripcion || !data.data.hora_desde || !data.data.hora_hasta) {
                Swal.fire("Error", "Todos los campos son requeridos", "error");
                return;
            }
            // Envía los datos del formulario a una ruta POST en Flask
            fetch("/crearturno_operador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al crear turno");
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        title: 'Éxito',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "Error al crear turno", "error");
                });
        }
    });
});


// ----------------------------------MODAL EDITAR TURNOS-----------------------------------


const editarTurnos = document.querySelectorAll(".editarTurnos");

editarTurnos.forEach(editarTurno => {
    editarTurno.addEventListener("click", function () {
        const codigo = this.dataset.codTurno;
        const id = this.dataset.idTurno;
        console.log(id)
        fetch(`/buscar_turno?codigo=${codigo}`, {
            method: "GET",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar respuesta");
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: "Editar respuesta predefinida",
                    html: `
                        <form class="form-crearcuenta">
                            <label class="form-label">Codigo</label>
                            <input type="text" id="codigo" class = "form-control input-text" value="${data.cod_turno}">
                            <label class="form-label">Descripción</label>
                            <input type="text" id="descripcion" class = "form-control input-text" value="${data.descripcion}">
                            <label class="form-label" for="hora">Hora desde:</label>
                            <input type="time" class="form-control input-text" id="hora-desde" name="hora-desde" value="${data.desde}">
                            <label class="form-label" for="hora">Hora hasta:</label>
                            <input type="time" class="form-control input-text" id="hora-hasta" name="hora-desde" value="${data.hasta}">
                            </select>
                        </form>
                        `,
                    showCancelButton: true,
                    confirmButtonText: "Actualizar cuenta",
                    preConfirm: function () {
                        const codigo = document.getElementById("codigo").value;
                        const descripcion = document.getElementById("descripcion").value;
                        const hora_desde = document.getElementById("hora-desde").value;
                        const hora_hasta = document.getElementById("hora-hasta").value;
                        return {
                            data: {
                                id: id,
                                codigo: codigo,
                                descripcion: descripcion,
                                hora_desde: hora_desde,
                                hora_hasta: hora_hasta
                            }
                        };
                    }
                }).then(function (result) {
                    if (result.value) {
                        const data = result.value;
                        if (!data.data.codigo || !data.data.descripcion || !data.data.hora_desde || !data.data.hora_hasta) {
                            Swal.fire("Error", "Todos los campos son requeridos", "error");
                            return;
                        }
                        // Envía los datos del formulario a una ruta POST en Flask
                        fetch("/actualizar_turno", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Error al actualizar los turnos");
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

// ----------------------------------MODAL ELIMINAR TURNOS-----------------------------------

const deleteturnos= document.querySelectorAll(".delete-turnos");

deleteturnos.forEach(deleteturno => {
    deleteturno.addEventListener("click", function () {
    Swal.fire({
      title: 'Deseas eliminar este turno?',
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