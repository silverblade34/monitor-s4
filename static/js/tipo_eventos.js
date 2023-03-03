// ----------------------------------Modal Crear Tipo de Evento SweetAlert2-----------------------------------

const btnCrearEvento = document.getElementById("crear-evento-cliente");


btnCrearEvento.addEventListener("click", function () {
    Swal.fire({
        title: "Crear Evento",
        html: `
          <form class="form-crearcuenta">
            <label class="form-label">Codigo evento</label>
            <input type="text" id="cod-evento" class = "form-control input-text" placeholder="Ejemplo: BOTPAN">
            <label class="form-label">Descripción</label>
            <input type="text" id="descripcion" class = "form-control input-text" placeholder="Descripcion">
            <label class="form-label">Prioridad</label>
            <select class="form-select" id="select-prioridad" aria-label="Default select example">
            <option value="" selected>Seleccione prioridad</option>
            <option value="REGULAR">Regular</option>
            <option value="URGENTE">Urgente</option>
            <option value="CRITICO">Critico</option>
            </select>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        preConfirm: function () {
            const codevento = document.getElementById("cod-evento").value;
            const descripcion = document.getElementById("descripcion").value;
            const prioridad = document.getElementById("select-prioridad").value;
            return {
                data: {
                    codevento: codevento,
                    descripcion: descripcion,
                    prioridad: prioridad,
                }
            };
        }
    }).then(function (result) {
        if (result.value) {
            const data = result.value;
            console.log(data);
            if (!data.data.codevento || !data.data.descripcion || !data.data.prioridad) {
                Swal.fire("Error", "Todos los campos son requeridos", "error");
                return;
            }
            // Envía los datos del formulario a una ruta POST en Flask
            fetch("/creartipo_eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al crear evento");
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire(data.message, data.data + "!", "success");
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "Error al crear evento", "error");
                });
        }
    });
});

// ----------------------------------Modal Editar Tipo de Evento SweetAlert2-----------------------------------


const editarTipoEventos = document.querySelectorAll(".editarTipoEvento");

editarTipoEventos.forEach(editarTipoEvento => {
    editarTipoEvento.addEventListener("click", function () {
        const codEvento = this.dataset.codEvento;
        console.log(codEvento)
        fetch(`/buscartipo_evento?codevento=${codEvento}`, {
            method: "GET",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar cliente");
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                const idevento = data.id
                const fecha_creacion = data.fecha_creacion
                const usuario = data.usuario
                Swal.fire({
                    title: "Editar tipo de evento",
                    html: `
                        <form class="form-crearcuenta">
                            <label class="form-label">Codigo de evento</label>
                            <input type="text" id="cod_evento" class = "form-control input-text" value="${data.cod_evento}" disabled>
                            <label class="form-label">Descripción</label>
                            <input type="text" id="descripcion" class = "form-control input-text" value="${data.descripcion}">
                            <label class="form-label">Prioridad</label>
                            <select id="prioridad" class="form-select">
                            <option value="Regular" ${data.prioridad === "REGULAR" ? "selected" : ""}>REGULAR</option>
                            <option value="Urgente" ${data.prioridad === "URGENTE" ? "selected" : ""}>URGENTE</option>
                            <option value="Critico" ${data.prioridad === "CRITICO" || data.prioridad === "CRÍTICO" ? "selected" : ""}>CRITICO</option>
                            </select>
                            <div class="form-check toggle-switch text-end form-switch me-4 pt-3">
                            <label class="form-label">Estado</label>
                            <input class="form-check-input" type="checkbox" id="estado_tipoevento" ${data.status === true ? 'checked' : ''}>
                            </div>
                        </form>
                        `,
                    showCancelButton: true,
                    confirmButtonText: "Actualizar cuenta",
                    preConfirm: function () {
                        const codevento = document.getElementById("cod_evento").value;
                        const descripcion = document.getElementById("descripcion").value;
                        const estado_tipoevento = document.getElementById("estado_tipoevento").checked;
                        const prioridad = document.getElementById("prioridad").value;
                        return {
                            data: {
                                id: idevento,
                                cod_evento: codevento,
                                descripcion: descripcion,
                                prioridad: prioridad,
                                fecha_creacion: fecha_creacion,
                                usuario: usuario,
                                status: estado_tipoevento
                            }
                        };
                    }
                }).then(function (result) {
                    if (result.value) {
                        const data = result.value;
                        console.log(data.data)
                        if (!data.data.cod_evento || !data.data.descripcion) {
                            Swal.fire("Error", "Todos los campos son requeridos", "error");
                            return;
                        }
                        // Envía los datos del formulario a una ruta POST en Flask
                        fetch("/actualizar_tipoevento", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Error al actualizar el evento");
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


// ----------------------------------Modal Copiar Payload SweetAlert2-----------------------------------

const verPayloads = document.querySelectorAll(".verPayloads");

verPayloads.forEach(verPayload => {
    verPayload.addEventListener("click", function () {
        const codEvento = this.dataset.codEvento;
        const codCliente = this.dataset.codCliente;
        const codCuenta = this.dataset.codCuenta;
        Swal.fire({
            title: 'Detalles de evento',
            html: `
            <div class="cont-btn-copy">
                <button class="copy-btn" onclick="copyToClipboard()"><i class='bx bx-copy-alt'></i> copiar</button>
            </div>
            <pre><code>${JSON.stringify({
                "cod_cuenta": codCuenta,
                "cod_cliente": codCliente,
                "cod_evento": codEvento,
                "placa": "%UNIT%",
                "origen": "Sys4Log",
                "latitud": "%LATD%",
                "fecha": "%POS_TIME%",
                "longitud": "%LOND%",
                "velocidad": "%SPEED%",
                "geocerca": "%ZONE_MIN%",
                "grupo": "Z3",
                "direccion": "%LOCATION%"
            }, null, 2)}</code></pre>`,
            confirmButtonText: 'Cerrar'
        })
    });
})


function copyToClipboard() {
    const codeElement = document.querySelector("pre code");
    const codeText = codeElement.innerText;
    const copyButton = document.querySelector(".copy-btn");
    navigator.clipboard.writeText(codeText)
        .then(() => {
            copyButton.classList.add("copied");
            copyButton.innerHTML = "<i class='bx bx-check'></i> Copiado";
        })
        .catch(err => {
            console.error("Error al copiar al portapapeles:", err);
        });
}
