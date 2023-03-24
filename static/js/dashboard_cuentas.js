// INSERTAR INFORMACION EN LAS CARDS

// Define una función para actualizar los valores de las tarjetas
function actualizarTarjetasCuentas() {
    fetch(`/cards_cuentas`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            // Actualiza los valores de las tarjetas con los datos recibidos
            document.getElementById("card-cant-clientes").textContent = data.totclientes;
            document.getElementById("card-cant-notifications").textContent = data.toteventos;
            document.getElementById("card-cant-vehiculos").textContent = data.totplacas;
            // document.getElementById("card-cant-vehiculos").textContent = data.totclientes;
        })
}

// Llama a la función "actualizarTarjetas" cada 10 segundos
// setInterval(actualizarTarjetasCuentas, 10000);

$(document).ready(function () {
    actualizarTarjetasCuentas();
});