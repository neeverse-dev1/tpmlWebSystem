/*
$(function () {
  const cpuPercent = parseFloat($('#cpuChart').data('value'));
  const ramPercent = parseFloat($('#ramChart').data('value'));

  new Chart(document.getElementById('cpuChart'), {
    type: 'doughnut',
    data: {
      labels: ['사용 중', '여유'],
      datasets: [{
        data: [cpuPercent, 100 - cpuPercent],
        backgroundColor: ['#ff6384', '#e0e0e0']
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });

  new Chart(document.getElementById('ramChart'), {
    type: 'doughnut',
    data: {
      labels: ['사용 중', '여유'],
      datasets: [{
        data: [ramPercent, 100 - ramPercent],
        backgroundColor: ['#36a2eb', '#e0e0e0']
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });
});
*/

function createDonutChart(id, percent, label, color) {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: ['사용 중', '여유'],
      datasets: [{
        data: [percent, 100 - percent],
        backgroundColor: [color, '#e0e0e0']
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        centerText: {
          text: `${label}\n${percent}%`
        }
      }
    },
    plugins: [{
      id: 'centerText',
      beforeDraw(chart) {
        const { width } = chart;
        const { ctx } = chart;
        const text = chart.options.plugins.centerText.text;
        ctx.save();
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#333';
        ctx.fillText(text.split('\n')[0], width / 2, chart.chartArea.top + chart.chartArea.height / 2 - 10);
        ctx.fillText(text.split('\n')[1], width / 2, chart.chartArea.top + chart.chartArea.height / 2 + 10);
        ctx.restore();
      }
    }]
  });
}

$(function () {
  createDonutChart('cpuChart', parseFloat($('#cpuChart').data('value')), 'CPU', '#ff6384');
  createDonutChart('ramChart', parseFloat($('#ramChart').data('value')), 'RAM', '#36a2eb');
});
