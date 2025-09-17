
document.addEventListener('DOMContentLoaded', () => {
    console.log('gridList:', window.gridList); // ✅ 확인용
  if (!window.gridList) return;
    
    loadServerStatus();
    setInterval(loadServerStatus, 2000); // ✅ 2초마다 갱신
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


async function loadServerStatus() {
  const res = await fetch('/api/server/status');
  const result = await res.json();
  if (!result.success) return;

  const s = result.data;
  document.getElementById('cpuValue').textContent = `${s.cpu}%`;
  document.getElementById('ramValue').textContent = `${s.ram_used} / ${s.ram_total} GB`;
  document.getElementById('diskValue').textContent = `${s.disk_used} / ${s.disk_total} GB`;
  document.getElementById('netValue').textContent = `업 ${s.net_up} / 다운 ${s.net_down} Mbps`;

  document.getElementById('localIp').textContent = s.local_ip;
  document.getElementById('nodeVersion').textContent = s.node_version;
  document.getElementById('uptime').textContent = s.uptime;
  document.getElementById('startedAt').textContent = s.started_at;

  document.getElementById('cpuBar').style.width = `${s.cpu}%`;
  document.getElementById('ramBar').style.width = `${s.ram_percent}%`;
  document.getElementById('diskBar').style.width = `${s.disk_percent}%`;
}


