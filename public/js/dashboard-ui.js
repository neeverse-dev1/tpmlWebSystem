
document.addEventListener('DOMContentLoaded', () => {
    console.log('gridList:', window.gridList); // ✅ 확인용
  if (!window.gridList) return;

  gridList.forEach(grid => {
    if (grid.view_type === 'equipment') {
      renderEquipmentCard(grid);
    }
  });
});

function renderMiniChart(canvasId, label, data, color, valueId) {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{ label, data, borderColor: color, tension: 0.3 }]
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } }
    }
  });

  // 마지막 값 표시
  const lastValue = data[data.length - 1];
  const valueEl = document.getElementById(valueId);
  if (valueEl) valueEl.textContent = lastValue;
}

function renderEquipmentCard(grid) {
  renderMiniChart(`tempChart-${grid.id}`, '온도', [24.5, 24.7, 24.6, 24.8], 'red', `tempValue-${grid.id}`);
  renderMiniChart(`humidChart-${grid.id}`, '습도', [48, 47, 49, 50], 'blue', `humidValue-${grid.id}`);
  renderMiniChart(`pressChart-${grid.id}`, '압력', [1012, 1013, 1011, 1012], 'green', `pressValue-${grid.id}`);

  const map = L.map(`map-${grid.id}`).setView([37.5665, 126.9780], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([37.5665, 126.9780]).addTo(map).bindPopup(`장비 위치: ${grid.equipment_id}`);
}
