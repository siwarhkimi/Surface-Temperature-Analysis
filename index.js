//Data from: https://data.giss.nasa.gov/gistemp/
createChart();

async function createChart() {
	const data = await getData();
	const ctx = document.getElementById('myChart').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.xAxis,
			datasets: [{
				label: 'Global Average Temperature from NASA between 1880-2019',
				data: data.yAxis,
				backgroundColor: 'rgba(255, 159, 64, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 2, 
				fill: false
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						callback: function(value, index, values) {
							return value + '°';
						}
					}
				}]
			}
		}
	});
};

// getting the data from .csv file
async function getData() {
	const xAxis = [];
	const yAxis = [];
	const response = await fetch('ZonAnn.Ts+dSST.csv');
	const data = await response.text();
	const table = data.split('\n').slice(1);
	table.forEach(row => {
		const columns = row.split(',');
		const year = columns[0];
		const temperature = columns[1];
		xAxis.push(year);
		yAxis.push(Number(temperature) + 14);
	});
	return {xAxis, yAxis};
}
