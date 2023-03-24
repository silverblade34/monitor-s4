const tabla_tipoevents_cant = document.getElementById("container-table-eventos")

// Función que realiza una petición GET al endpoint y actualiza la tabla con los datos
function actualizarTablaCantsTipoEvents() {
    fetch(`/tipoevento_home`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            const eventos = data.data_eventos;
            var cant = 0
            const cantevents = Object.keys(eventos).map(key => {
                cant = cant + eventos[key]
                return cant
            })
            // Crea una fila por cada elemento del objeto "data_eventos"
            const filas = Object.keys(eventos).map(key => {
                const porce = (eventos[key] / cant) * 100
                const porcefin = Math.floor(porce);
                return `<tr>
                  <td>${key}</td>
                  <td>${eventos[key]}</td>
                  <td class="align-middle">
                    <div class="progress-wrapper w-75 mx-auto">
                        <div class="progress-info">
                        <div class="progress-percentage">
                            <span class="text-xs font-weight-bold">${porcefin}%</span>
                        </div>
                        </div>
                        <div class="progress">
                        <div class="progress-bar bg-gradient-info" role="progressbar"
                            aria-valuenow="${porcefin}" aria-valuemin="0" aria-valuemax="100"
                            style="width: ${porcefin}%;"></div>
                        </div>
                    </div>
                    </td>
                </tr>`;
            });

            // Actualiza el contenido de la tabla
            tabla_tipoevents_cant.innerHTML = `
        <thead>
          <th scope="col">Evento</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Porcentaje</th>
        </thead>
        <tbody>
          ${filas.join('')}
        </tbody>
      `;
        });
}

const cont_vehiculos_cant = document.getElementById("lista-vehiculos")


// Función que realiza una petición GET al endpoint y actualiza la tabla con los datos
function actualizarContCantsVehiculos() {
    fetch(`/tipoevento_home`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            const vehiculos = data.data_vehiculos;
            var cant = 0
            const cantevents = Object.keys(vehiculos).map(key => {
                cant = cant + vehiculos[key]
                return cant
            })
            // Crea una fila por cada elemento del objeto "data_eventos"
            const filas = Object.keys(vehiculos).map(key => {
                const porce = (vehiculos[key] / cant) * 100
                const porcefin = Math.floor(porce);
                return `<li class="list-group-item">
                    <div class="media">
                    <div class="media-left align-self-start">
                    <img src="../static/img/camion.jpg" alt="camion" class="user-img rounded-circle">
                    </div>
                    <div class="media-body align-self-center">
                        <div class="username">
                            <h4>${key}</h4>
                        </div>
                    </div>
                    <div class="media-right pr-3 align-self-center">
                        <div class="like text-center">
                            <span>${vehiculos[key]}</span>
                        </div>
                    </div>
                    </div>
                </li>
                `;
            });

            // Actualiza el contenido de la tabla
            cont_vehiculos_cant.innerHTML = `
                ${filas.join('')}
      `;
        });
}


const cont_operadores_cant = document.getElementById("lista-operadores")


// Función que realiza una petición GET al endpoint y actualiza la tabla con los datos
function actualizarContCantsOperadores() {
    fetch(`/tipoevento_home`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            const operadores = data.data_operadores;
            var cant = 0
            const cantevents = Object.keys(operadores).map(key => {
                cant = cant + operadores[key]
                return cant
            })
            // Crea una fila por cada elemento del objeto "data_eventos"
            const filas = Object.keys(operadores).map(key => {
                return `<li class="list-group-item">
                    <div class="media">
                    <div class="media-left align-self-start">
                    <img src="../static/img/logo_operador.webp" alt="camion" class="user-img rounded-circle">
                    </div>
                    <div class="media-body align-self-center">
                        <div class="username">
                            <h4>${key}</h4>
                        </div>
                    </div>
                    <div class="media-right pr-3 align-self-center">
                        <div class="like text-center">
                            <span>${operadores[key]}</span>
                        </div>
                    </div>
                    </div>
                </li>
                `;
            });

            // Actualiza el contenido de la tabla
            cont_operadores_cant.innerHTML = `
                ${filas.join('')}
      `;
        });
}

// INSERTAR INFORMACION EN LAS CARDS

// Define una función para actualizar los valores de las tarjetas
function actualizarTarjetas() {
    fetch(`/cards_clientes`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            // Actualiza los valores de las tarjetas con los datos recibidos
            document.getElementById("card-cant-events-sinatender").textContent = data.events_sinatender;
            document.getElementById("card-cant-events-engestion").textContent = data.events_engestion;
            document.getElementById("card-cant-events-confirmados").textContent = data.events_confirmados;
            document.getElementById("card-cant-events-descartados").textContent = data.events_descartados;
        })
}

// Llama a la función "actualizarTarjetas" cada 10 segundos
setInterval(actualizarTarjetas, 20000);

// Actualiza la tabla cada 20 segundos
setInterval(actualizarTablaCantsTipoEvents, 20000);
setInterval(actualizarContCantsVehiculos, 20000);
setInterval(actualizarContCantsOperadores, 20000);
$(document).ready(function () {
    actualizarContCantsVehiculos();
    actualizarTablaCantsTipoEvents();
    actualizarContCantsOperadores();
    actualizarTarjetas();
});
