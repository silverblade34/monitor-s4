function mostrarInfoEvento() {
    $.ajax({
        url: '/func_buscarEvento',
        method: 'GET',
        success: function (data) {
            try{
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
                    .bindPopup('Ubicación del evento')
                    .openPopup();
            } catch (error){
                console.error(error)
            } 
        }
    });
};
$(document).ready(function () {
    mostrarInfoEvento();
});

document.getElementById("btn-textarea-1").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Evento se activo sobre unidades no fueron programadas en el día";
});

document.getElementById("btn-textarea-2").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Eventos referente a unidades que terminaron su ruta y no se han retirado de la plataforma";
});

document.getElementById("btn-textarea-3").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Evento se refiere a sensores de puerta o pulsadores que se activan repetidamente";
});

document.getElementById("btn-textarea-4").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Intervención / ";
});

document.getElementById("btn-textarea-5").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Prueba nocturna:";
});

document.getElementById("btn-textarea-6").addEventListener("click", function(){
    document.getElementById("textarea-comentario").value = "Prueba/Cencon : ";
});

