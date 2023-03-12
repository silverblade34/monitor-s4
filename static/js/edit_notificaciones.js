function mostrarInfoEvento() {
    $.ajax({
        url: '/func_buscarEvento',
        method: 'GET',
        success: function (data) {
            try {
                evento = data
                var lat = evento.latitud
                var lng = evento.longitud
                // Creación del mapa
                var map = L.map('map').setView([lat, lng], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                L.marker([lat, lng]).addTo(map)
                    .bindPopup(`${data.placa}`)
                    .openPopup();
            } catch (error) {
                console.error(error)
            }
        }
    });
};
$(document).ready(function () {
    mostrarInfoEvento();
});

document.getElementById("btn-textarea-1").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Evento se activo sobre unidades no fueron programadas en el día";
});

document.getElementById("btn-textarea-2").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Eventos referente a unidades que terminaron su ruta y no se han retirado de la plataforma";
});

document.getElementById("btn-textarea-3").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Evento se refiere a sensores de puerta o pulsadores que se activan repetidamente";
});

document.getElementById("btn-textarea-4").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Intervención / ";
});

document.getElementById("btn-textarea-5").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Prueba nocturna:";
});

document.getElementById("btn-textarea-6").addEventListener("click", function () {
    document.getElementById("textarea-comentario").value = "Prueba/Cencon : ";
});

// ---------------------------------- CONFIRMAR AGREGAR COMENTARIO ----------------------------------

const btnAddComentarios = document.querySelectorAll(".btn-comentario");

btnAddComentarios.forEach(btnAddComentario => {
    btnAddComentario.addEventListener("click", function () {
        Swal.fire({
            title: '¿Desea agregar este comentario?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#9b9b9b',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                const idevento = this.dataset.idEvento;
                const usuario = this.dataset.usuarioComent;
                const desc_estado = this.dataset.typeComent;
                const comentario = document.getElementById("textarea-comentario").value;
                const dataenv =
                {
                    "data": {
                        "id": idevento,
                        "desc_estado": desc_estado,
                        "usuario": usuario,
                        "comentario": comentario
                    }
                }
                fetch(`/agregarComentario`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataenv)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error al actualizar agregar al comentario");
                        }
                        return response.json();
                    })
                    .then(data => {
                        Swal.fire({
                            title: "Agregado",
                            text: data.message,
                            icon: "success",
                            showCancelButton: false, // muestra el botón de confirmación
                            confirmButtonText: "Aceptar",
                        }).then((result) => {
                            if (result.isConfirmed) { // si se hizo clic en el botón de confirmación
                                window.location.href = "/notificaciones"; // redirige a la página deseada
                            }
                        });
                    })
                    .catch(error => {
                        Swal.fire("Error", "Error al agregar comentario", "error");
                    });
            }
        });
    });
});
