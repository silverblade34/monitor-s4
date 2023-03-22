const tabla_tipoevents_cant = document.getElementById("container-table-eventos")

// Función que realiza una petición GET al endpoint y actualiza la tabla con los datos
function actualizarTablaCantsTipoEvents() {
    fetch(`/tipoevento_home`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const eventos = data.data_eventos;
            var cant = 0
            const cantevents = Object.keys(eventos).map(key => { 
                cant = cant + eventos[key]
                return cant
            })
            console.log("CANT: "+ cant)
            // Crea una fila por cada elemento del objeto "data_eventos"
            const filas = Object.keys(eventos).map(key => {
                const porce = (eventos[key]/cant)*100
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

const tabla_vehiculos_cant = document.getElementById("container-table-vehiculos")

// Función que realiza una petición GET al endpoint y actualiza la tabla con los datos
function actualizarTablaCantsVehiculos() {
    fetch(`/tipoevento_home`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const vehiculos = data.data_vehiculos;
            var cant = 0
            const cantevents = Object.keys(vehiculos).map(key => { 
                cant = cant + vehiculos[key]
                return cant
            })
            console.log("CANT: "+ cant)
            // Crea una fila por cada elemento del objeto "data_eventos"
            const filas = Object.keys(vehiculos).map(key => {
                const porce = (vehiculos[key]/cant)*100
                const porcefin = Math.floor(porce);
                return `<tr>
                  <td>${key}</td>
                  <td>${vehiculos[key]}</td>
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
            tabla_vehiculos_cant.innerHTML = `
        <thead>
          <th scope="col">Vehiculos</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Porcentaje</th>
        </thead>
        <tbody>
          ${filas.join('')}
        </tbody>
      `;
        });
}

// Actualiza la tabla cada 20 segundos
setInterval(actualizarTablaCantsTipoEvents, 20000);
$(document).ready(function () {
    actualizarTablaCantsVehiculos();
    actualizarTablaCantsTipoEvents();
});
