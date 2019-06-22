let ctx = document.getElementById('notes-graph').getContext('2d');

let data = [
    {
        x: new Date(),
        y: 5
    }, {
        x: new Date(),
        y: 6
    }, {
        x: new Date(),
        y: 2
    }, {
        x: new Date(),
        y: 4
    }, {
        x: new Date(),
        y: 5
    }, {
        x: new Date(),
        y: 2
    }, {
        x: new Date(),
        y: 1
    }
]

let chartConfig = {
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Średnia ocen grupy",
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgb(29, 143, 213)',
            data: data,
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            yAxes: [{
                gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    min: 0,
                    max: 6,
                    stepSize: 1,
                    fontColor: 'rgb(255, 255, 255)'
                }
            }],
            xAxes: [{
                gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    fontColor: 'rgb(255, 255, 255)'
                },
                time: {
                    unit: 'week'
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                boxWidth: 0,
                fontColor: 'rgb(255, 255, 255)'
            }
        },

    }
}

let chart = new Chart(ctx, chartConfig);