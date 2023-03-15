
$(document).ready(function () {
    var table = $('#table-respuestas-predefinidas').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
          },
    });
})
// ----------------------------------Modal Crear Respuesta predeterminada SweetAlert2-----------------------------------

const btnRespuestas = document.getElementById("crear-resp-notificacion");


btnRespuestas.addEventListener("click", function () {
    const id = this.dataset.idResp;
    Swal.fire({
        title: "Crear Respuestas",
        html: `
          <form class="form-crearcuenta">
            <label class="form-label">Sigla</label>
            <input type="text" id="sigla" class = "form-control input-text" placeholder="Ejemplo: NO/PROGRAMADA">
            <label class="form-label">Texto</label>
            <textarea id="texto" class = "form-control input-text" placeholder="Escribe aquí tu texto predifinido..."></textarea>
            </select>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        preConfirm: function () {
            const sigla = document.getElementById("sigla").value;
            const texto = document.getElementById("texto").value;
            return {
                data: {
                    id: id,
                    sigla: sigla,
                    texto: texto,
                }
            };
        }
    }).then(function (result) {
        if (result.value) {
            const data = result.value;
            if (!data.data.sigla || !data.data.texto) {
                Swal.fire("Error", "Todos los campos son requeridos", "error");
                return;
            }
            // Envía los datos del formulario a una ruta POST en Flask
            fetch("/crear_resp_prede", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al crear respuesta predeterminada");
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
                    Swal.fire("Error", "Error al crear respuesta", "error");
                });
        }
    });
});


// ----------------------------------Modal Editar Tipo de Evento SweetAlert2-----------------------------------


const editarRespPreds = document.querySelectorAll(".editarRespPre");

editarRespPreds.forEach(editarRespPred => {
    editarRespPred.addEventListener("click", function () {
        const id = this.dataset.idResp;
        const codigo = this.dataset.codResp;
        fetch(`/buscar_resp_prede?codigo=${codigo}`, {
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
                            <label class="form-label">Sigla</label>
                            <input type="text" id="sigla" class = "form-control input-text" value="${data.sigla}">
                            <label class="form-label">Texto</label>
                            <textarea type="text" id="texto" class = "form-control input-text">${data.text}</textarea>
                        </form>
                        `,
                    showCancelButton: true,
                    confirmButtonText: "Actualizar cuenta",
                    preConfirm: function () {
                        const sigla = document.getElementById("sigla").value;
                        const texto = document.getElementById("texto").value;
                        return {
                            data: {
                                id: id,
                                codigo: codigo,
                                sigla: sigla,
                                texto: texto,
                            }
                        };
                    }
                }).then(function (result) {
                    if (result.value) {
                        const data = result.value;
                        if (!data.data.sigla || !data.data.texto) {
                            Swal.fire("Error", "Todos los campos son requeridos", "error");
                            return;
                        }
                        // Envía los datos del formulario a una ruta POST en Flask
                        fetch("/act_resp_prede", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Error al actualizar las respuestas");
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