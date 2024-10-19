// Initialize a bar chart (using Chart.js)
const ctx = document.getElementById('emissionChart').getContext('2d');
const emissionChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2006', '2008', '2010', '2012', '2014', '2016', '2018', '2020'],
        datasets: [{
            label: '碳排放总量',
            data: [6.38, 8.5, 10.2, 12.3, 15.0, 18.0, 22.0, 27.73],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize a doughnut chart (using Chart.js)
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
const doughnutChart = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
        labels: ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安'],
        datasets: [{
            data: [10, 20, 30, 15, 25, 5, 10, 15],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Initialize a map (using Leaflet)
const map = L.map('chinaMap').setView([35.8617, 104.1954], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Load GeoJSON data
fetch('china-provinces.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    alert('省份: ' + feature.properties.name);
                });
            },
            style: function () {
                return { color: '#3388ff', weight: 2 };
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
