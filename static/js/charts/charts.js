function ActualizarGraficos() {
  fetch('/graficos_home_cuentas', {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al buscar cuenta");
      }
      return response.json();
    })
    .then(data => {

      // Inicializamos el grafico de Lines Eventos por mes
      console.log(data.data.eventos_anual)
      const xValues = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
      const yValues = data.data.eventos_anual

      new Chart("mychartlinechart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: 100, max: 1000 } }],
          }
        }
      });
      // Inicializamos el grafico de barras horizontales Eventos por cliente

      const clientes_evento =  data.data.clientes_evento
      const listaClientes = clientes_evento.map(objeto => objeto.cliente);
      const eventsClientes = clientes_evento.map(objeto => objeto.eventos);
      var xValuesH = listaClientes;
      var yValuesH = eventsClientes;
      var barColors = ["red", "green", "blue", "orange", "brown"];
    
      new Chart("barrahorizontal", {
        type: "horizontalBar",
        data: {
          labels: xValuesH,
          datasets: [{
            backgroundColor: barColors,
            data: yValuesH
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
          }
        }
      });
    })
}

$(document).ready(function () {
  ActualizarGraficos();
});