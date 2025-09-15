if ($('#dt_LibraryBooks').length) {
	const dt_LibraryBooks = $('#dt_LibraryBooks').DataTable({
		searching: true,
		pageLength: 6,
		select: false,
		lengthChange: false,
		info: false,
		paging: false,
		scrollCollapse: true,
		scrollY: '400px',
		language: {
			search: "",
			searchPlaceholder: 'Search'
		},
		initComplete: function() {
			var dtSearch = $('#dt_LibraryBooks_wrapper .dt-search').detach();
			$('#dt_LibraryBooks_Search').append(dtSearch);
			$('#dt_LibraryBooks_Search .dt-search').prepend('<i class="fi fi-rr-search"></i>');
			$('#dt_LibraryBooks_Search .dt-search label').remove();
			$('#dt_LibraryBooks_wrapper > .row.mt-2.justify-content-between').first().remove();
		},
	});
}



var taskStatusChartConfig = {
	series: [85.7],
	chart: {
		type: 'radialBar',
		offsetY: -30,
		height: 380,
		sparkline: { enabled: true }
	},
	plotOptions: {
		radialBar: {
			startAngle: -90,
			endAngle: 90,
			track: {
				background: "#fff",
				strokeWidth: '100%',
				margin: 25,
				dropShadow: {
					enabled: true,
					top: 10,
					left: 0,
					blur: 15,
					color: 'rgba(238, 130, 91, 1)',
					opacity: 0.25
				}
			},
			dataLabels: {
				name: { show: false },
				value: {
					show: true,
					offsetY: -35,
					fontSize: '30px',
					fontFamily: 'var(--bs-body-font-family)',
					fontWeight: 800,
					color: 'var(--bs-dark)',
				},
			}
		}
	},
	grid: {
		padding: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}
	},
	fill: {
		colors: ['var(--bs-secondary)']
	},	
}
const taskStatusChart = document.querySelector("#taskStatusChart");
if (typeof taskStatusChart !== undefined && taskStatusChart !== null) {
    var chartInit = new ApexCharts(taskStatusChart, taskStatusChartConfig);
	chartInit.render();
}



function performanceAnalysisChartConfig() {
	const canvas = document.getElementById('performanceAnalysisChart');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	new Chart(ctx, {
		type: 'radar',
		data: {
			labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
			datasets: [{
				label: 'Product A',
				data: [65, 59, 90, 81, 56, 55],
				fill: true,
				backgroundColor: 'rgba(13, 110, 253, 0.15)',
				borderColor: 'rgba(13, 110, 253, 1)',
				pointBackgroundColor: 'rgba(13, 110, 253, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(13, 110, 253, 1)'
			},
			{
				label: 'Product B',
				data: [28, 48, 40, 19, 96, 27],
				fill: true,
				backgroundColor: 'rgba(25, 135, 84, 0.15)',
				borderColor: 'rgba(25, 135, 84, 1)',
				pointBackgroundColor: 'rgba(25, 135, 84, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(25, 135, 84, 1)'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				line: {
					borderWidth: 2
				}
			},
			plugins: {
				legend: {
					display: false,
					labels: {
						color: '#495057',
						font: {
							size: 12,
							weight: '500',
							family: '"Plus Jakarta Sans", sans-serif'
						},
						padding: 15,
					}
				},
				tooltip: {
					enabled: true,
					backgroundColor: '#fff',
					titleColor: '#212529',
					bodyColor: '#495057',
					borderColor: '#dee2e6',
					borderWidth: 1,
					titleFont: {
						size: 14,
						weight: '500',
						family: '"Plus Jakarta Sans", sans-serif'
					},
					bodyFont: {
						size: 13,
						family: '"Plus Jakarta Sans", sans-serif'
					},
					padding: 10
				}
			},
			scales: {
				r: {
					angleLines: {
						color: '#dee2e6'
					},
					grid: {
						color: '#e9ecef'
					},
					pointLabels: {
						color: 'rgba(33, 37, 41, 0.8)',
						font: {
							size: 12,
							weight: '500',
							family: '"Plus Jakarta Sans", sans-serif'
						},
						padding: 8
					},
					ticks: {
						backdropColor: 'transparent',
						color: '#6c757d',
						stepSize: 20,
						font: {
							size: 12,
							family: '"Plus Jakarta Sans", sans-serif'
						}
					},
					suggestedMin: 0,
					suggestedMax: 100
				}
			}
		}
	});
}
document.addEventListener('DOMContentLoaded', performanceAnalysisChartConfig);



var averageLectureConfig = {
	series: [
		{
			data: [300, 200, 190, 100, 250, 300, 350, 500]
		}
	],
	chart: {
		height: 280,
		type: 'area',
		toolbar:{
			show: false
		},
	},
	colors:[
		"var(--bs-secondary)",
	],
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 2,
	},
	legend:{
		show: false,
	},
	grid:{
		show: true,
		strokeDashArray: 3,
		borderColor: 'var(--bs-border-color)',
	},
	yaxis: {
		min: 0,
		max: 500,
		tickAmount: 5,
		labels: {
			style: {
				colors: 'var(--bs-body-color)',
				fontSize: '14px',
			},
			formatter: function (value) {
				return value;
			}
		},
	},
	xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
		labels:{
			style: {
				colors: 'var(--bs-body-color)',
				fontSize: '12px',
			},
		},
		axisTicks : {
			show : false
		},
		axisBorder : {
			show : false
		},
	},
	fill:{
		type:'gradient',
		gradient: {
			colorStops:[ 
				[
					{
						offset: 0,
						color: 'var(--bs-secondary)',
						opacity: 0.2
					},
					{
						offset: 50,
						color: 'var(--bs-secondary)',
						opacity: 0.1
					},
					{
						offset: 80,
						color: 'var(--bs-secondary)',
						opacity: 0
					}
				]
			]
		},				
	},
	tooltip: {
		x: {
			show: true,
		},
		y: {
			formatter: function (val) {
				return val.toLocaleString();
			}
		},
		theme: "light"
	},
	responsive: [{
		breakpoint: 575,
		options: {
			chart : {
				height:200,
			},
			yaxis: {
				labels:{
					style: {
						fontSize: '11px',
					},
				},
			},
			xaxis: {
				labels:{
					style: {
						fontSize: '11px',
					},
				},
			},
		},
	}]
}
const averageLecture = document.querySelector("#averageLecture");
if (typeof averageLecture !== undefined && averageLecture !== null) {
    var chartInit = new ApexCharts(averageLecture, averageLectureConfig);
	chartInit.render();
}



function subjectChartConfig() {
	function formatNumber(num) {
		if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
		if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
		if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
		return num.toString();
	}

	const centerTextPlugin = {
		id: 'centerTextPlugin',
		afterDraw(chart) {
			const { ctx, chartArea: { left, right, top, bottom } } = chart;
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			const dataset = chart.data.datasets[0];
			const total = dataset.data.reduce((acc, val) => acc + val, 0);

			let displayValue = total;
			let displayLabel = 'Total';

			const activeElements = chart.getActiveElements();
			if (activeElements.length > 0) {
				const firstPoint = activeElements[0];
				displayValue = dataset.data[firstPoint.index];
				displayLabel = chart.data.labels[firstPoint.index];
			}

			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			// Value
			ctx.font = 'bold 22px sans-serif';
			ctx.fillStyle = '#333';
			ctx.fillText(formatNumber(displayValue), centerX, centerY - 10);

			// Label
			ctx.font = '14px sans-serif';
			ctx.fillStyle = '#666';
			ctx.fillText(displayLabel, centerX, centerY + 15);

			ctx.restore();
		}
	};

	const canvas = document.getElementById('subjectChart');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');

	const labels = ['Subject A','Subject B','Subject C','Subject D','Subject E','Subject F'];
	const values = [132300, 89500, 55100, 32600, 10500, 7800];
	const colors = ['#5E3A7D','#F77C48','#D8D8D8','#C9D6E4','#009875','#F9B233'];

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels,
			datasets: [{
				data: values,
				backgroundColor: colors,
				borderWidth: 2,
				borderColor: "#fff",
				hoverOffset: 10
			}]
		},
		options: {
			cutout: '55%',
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: function(context) {
							const total = context.dataset.data.reduce((a, b) => a + b, 0);
							const value = context.parsed;
							const percent = ((value / total) * 100).toFixed(0);
							return `${context.label}: ${percent}% (${formatNumber(value)})`;
						}
					}
				}
			}
		},
		plugins: [centerTextPlugin]
	});

	const legendContainer = document.getElementById("chartLegend");
	if (legendContainer) {
		const total = values.reduce((a, b) => a + b, 0);
		labels.forEach((label, i) => {
			const percent = ((values[i] / total) * 100).toFixed(0);
			const li = document.createElement("li");
			li.innerHTML = `
				<span class="color-box" style="background:${colors[i]}"></span> 
				${label} - ${percent}% (${formatNumber(values[i])})
			`;
			legendContainer.appendChild(li);
		});
	}
}

document.addEventListener('DOMContentLoaded', subjectChartConfig);



var employeeScore1Config = {
	series: [83],
	chart: {
		type: 'radialBar',
		height: 60,
		width: 60,
		sparkline: {
			enabled: true
		}
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '80%'
			},
			track: {
				background: 'rgba(var(--bs-primary-rgb), 0.1)',
				strokeWidth: '100%',
				margin: -2
			},
			dataLabels: {
				show: true,
				name: {
					show: false
				},
				value: {
					fontSize: '14px',
					fontWeight: '500',
					fontFamily: 'var(--bs-body-font-family)',
					color: 'var(--bs-heading-color)',
					show: true,
					offsetY: 5
				}
			},
		}
	},
	stroke: {
		lineCap: 'round'
	},
	colors: ['var(--bs-primary)'],
}
const employeeScore1 = document.querySelector("#employeeScore1");
if (typeof employeeScore1 !== undefined && employeeScore1 !== null) {
    var chartInit = new ApexCharts(employeeScore1, employeeScore1Config);
	chartInit.render();
}



var employeeScore2Config = {
	series: [37],
	chart: {
		type: 'radialBar',
		height: 60,
		width: 60,
		sparkline: {
			enabled: true
		}
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '80%'
			},
			track: {
				background: 'rgba(var(--bs-danger-rgb), 0.1)',
				strokeWidth: '100%',
				margin: -2
			},
			dataLabels: {
				show: true,
				name: {
					show: false
				},
				value: {
					fontSize: '14px',
					fontWeight: '500',
					fontFamily: 'var(--bs-body-font-family)',
					color: 'var(--bs-heading-color)',
					show: true,
					offsetY: 5
				}
			},
		}
	},
	stroke: {
		lineCap: 'round'
	},
	colors: ['var(--bs-danger)'],
}
const employeeScore2 = document.querySelector("#employeeScore2");
if (typeof employeeScore2 !== undefined && employeeScore2 !== null) {
    var chartInit = new ApexCharts(employeeScore2, employeeScore2Config);
	chartInit.render();
}



var employeeScore3Config = {
	series: [46],
	chart: {
		type: 'radialBar',
		height: 60,
		width: 60,
		sparkline: {
			enabled: true
		}
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '80%'
			},
			track: {
				background: 'rgba(var(--bs-warning-rgb), 0.1)',
				strokeWidth: '100%',
				margin: -2
			},
			dataLabels: {
				show: true,
				name: {
					show: false
				},
				value: {
					fontSize: '14px',
					fontWeight: '500',
					fontFamily: 'var(--bs-body-font-family)',
					color: 'var(--bs-heading-color)',
					show: true,
					offsetY: 5
				}
			},
		}
	},
	stroke: {
		lineCap: 'round'
	},
	colors: ['var(--bs-warning)'],
}
const employeeScore3 = document.querySelector("#employeeScore3");
if (typeof employeeScore3 !== undefined && employeeScore3 !== null) {
    var chartInit = new ApexCharts(employeeScore3, employeeScore3Config);
	chartInit.render();
}



var chartAttendanceRateConfig = {
	series: [
		{
			name: 'Late',
			data: [13, 23, 20, 8, 13, 27, 33, 12, 12, 12, 12, 12]
		},
		{
			name: 'Absent',
			data: [11, 17, 15, 15, 21, 14, 15, 13, 13, 13, 13, 13]
		}
	],
	colors: [
		'var(--bs-secondary)',
		'var(--bs-gray)'
	],
	chart: {
		type: 'bar',
		height: 350,
		stacked: true,
		stackType: '100%',
		toolbar: { show: false }
	},
	stroke: {
		show: true,
		width: 1,
		colors: ['var(--bs-body-bg)']
	},
	grid: {
		borderColor: "var(--bs-border-color)",
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true,
			},
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			endingShape:'rounded',
			columnWidth: '25%',
			borderRadius: 6,
		}
	},
	dataLabels: {
		enabled: false
	},
	markers: {
		size: 0
	},
	legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        markers: {
			size: 5,
            shape: 'circle',
            radius: 10,
			width: 8,
			height: 8,
		},
		labels: {
			colors: 'var(--bs-heading-color)',
			fontFamily: 'var(--bs-body-font-family)',
			fontSize: '13px',
        }
    },
	yaxis: {
		min: 0,
		max: 500,
		tickAmount: 5,
		labels: {
			formatter: function (value) {
				return value + '%';
			},
			style: {
				colors: 'var(--bs-body-color)',
				fontSize: '13px',
				fontFamily: 'var(--bs-body-font-family)'
			}
		}
	},
	xaxis: {
		type: "month",
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		axisBorder: {
			color: 'var(--bs-border-color)',
			axisBorder: {
				show: true,
				color: 'var(--bs-light)',
				height: 0.5,
				width: '100%',
				offsetX: 0,
				offsetY: 0
			},
		},
		axisTicks: {
			show: false,
		},
		labels: {
			rotate: -90,
			style: {
				colors: 'var(--bs-body-color)',
				fontSize: '13px',
				fontFamily: 'var(--bs-body-font-family)'
			}
		},
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + '%';
			}
		}
	},
	grid: {
		show: false,
	}
};
const chartAttendanceRate = document.querySelector("#chartAttendanceRate");
if (typeof chartAttendanceRate !== undefined && chartAttendanceRate !== null) {
    var chartInit = new ApexCharts(chartAttendanceRate, chartAttendanceRateConfig);
	chartInit.render();
}



if(jQuery('#dateTimeFlatpickr').length > 0 ){
	$("#dateTimeFlatpickr").flatpickr({
		enableTime: false,
		dateFormat: "Y-m-d H:i",
		inline: true,
	});
}



if(jQuery('.flatpickr-date').length > 0 ){
	$(".flatpickr-date").flatpickr({
		enableTime: false,
		dateFormat: "Y-m-d H:i",
	});
}