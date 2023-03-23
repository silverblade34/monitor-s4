/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
const myChart = {
    type: 'horizontalBar',
    data: {
        labels: ['Operador 1', 'Operador 2', 'Operador 3', 'Operador 4'],
        datasets: [{
            label: 'Atendidos',
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

const barsCtx = document.getElementById('mychart-horizontal')
window.myBar = new Chart(barsCtx, myChart)