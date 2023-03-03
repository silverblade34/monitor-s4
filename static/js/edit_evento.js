function mostrarInfoEvento() {
    $.ajax({
        url: '/func_buscarEvento',
        method: 'GET',
        success: function (data) {
            try {
                evento = data
                console.log(evento)
                var lat = evento.latitud
                var lng = evento.longitud
                // Creación del mapa
                var map = L.map('map').setView([lat, lng], 13);
                console.log(map)
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
            title: 'Desea agregar este comentario?',
            text: "!",
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
