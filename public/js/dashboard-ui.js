const equipmentMarkers = {}; // ✅ 장비별 마커 저장소
const equipmentPaths = {};   // ✅ 장비별 좌표 이력 저장소
const dashboardMarkers = {};
let modalUpdateInterval = null;


document.addEventListener('DOMContentLoaded', () => {
  if (!window.gridList) return;

  loadServerStatus();
  setInterval(loadServerStatus, 2000); // ✅ 2초마다 갱신

  gridList.forEach(grid => {
    if (grid.view_type === 'equipment') {
      renderEquipmentCard(grid);
    }
  });

  setInterval(() => {
    gridList.forEach(grid => {
        if (grid.view_type === 'equipment' && grid.id) {
        updateMiniChart(grid); // ✅ 센서값 + 좌표 갱신
        }
    });
    }, 10000); // ✅ 10초마다 장비 상태 갱신


});

// ✅ 모달 하나만 반응하도록 이벤트 분리
document.addEventListener('shown.bs.modal', (event) => {
  const modalId = event.target.id; // 예: modal-TPML-001
  const equipmentId = modalId.replace('modal-', '');
  // ✅ DOM이 완전히 렌더링된 후 실행
  setTimeout(() => {
    loadModalData(equipmentId);
  }, 100); // 100ms 지연

  // ✅ 실시간 업데이트 시작
  modalUpdateInterval = setInterval(() => {
    loadModalData(equipmentId);
  }, 10000); // 10초
});

// 모달 닫을때
document.addEventListener('hidden.bs.modal', (event) => {
  if (modalUpdateInterval) {
    clearInterval(modalUpdateInterval);
    modalUpdateInterval = null;
  }

  const modalId = event.target.id;
  const equipmentId = modalId.replace('modal-', '');

  // ✅ 경로 초기화
  equipmentPaths[equipmentId] = [];
});

function renderMiniChart(canvasId, label, data, color, valueId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // ✅ 기존 차트 제거
  const existingChart = Chart.getChart(canvasId);
  if (existingChart) existingChart.destroy();

  const reversedData = data.slice().reverse(); // ✅ 시간 순서로 그리기

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

  // const lastValue = data[data.length - 1];
  const lastValue = data[0]; // 최신값
  const valueEl = document.getElementById(valueId);
  if (valueEl) valueEl.textContent = lastValue;
}

async function renderEquipmentCard(grid) {

  if (!grid.id || !grid.equipment_id) {
    console.warn('❌ grid.id 또는 equipment_id 누락:', grid);
    return; // ✅ 안전하게 스킵
  }
  const res = await fetch(`/api/equipment/${grid.equipment_id}/status?limit=5`);
  const result = await res.json();
  if (!result.success) return;

  const { temp, humid, press, lat, lng } = result.data;

  renderMiniChart(`tempChart-${grid.id}`, '온도', temp.values, 'red', `tempValue-${grid.id}`);
  renderMiniChart(`humidChart-${grid.id}`, '습도', humid.values, 'blue', `humidValue-${grid.id}`);
  renderMiniChart(`pressChart-${grid.id}`, '압력', press.values, 'green', `pressValue-${grid.id}`);

  const map = L.map(`map-${grid.id}`).setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  const marker = L.marker([lat, lng]).addTo(map).bindPopup(`장비 위치`);
  dashboardMarkers[grid.equipment_id] = { map, marker };

}

async function updateMiniChart(grid) {
  if (!grid.id || !grid.equipment_id) {
    console.warn(`❌ 센서값 갱신 생략: id 누락 → ${grid.equipment_id}`);
    return;
  }
  const res = await fetch(`/api/equipment/${grid.equipment_id}/status?limit=5`);
  const result = await res.json();
  if (!result.success) return;

  const { temp, humid, press, lat, lng } = result.data;

  renderMiniChart(`tempChart-${grid.id}`, '온도', temp.values, 'red', `tempValue-${grid.id}`);
  renderMiniChart(`humidChart-${grid.id}`, '습도', humid.values, 'blue', `humidValue-${grid.id}`);
  renderMiniChart(`pressChart-${grid.id}`, '압력', press.values, 'green', `pressValue-${grid.id}`);

  updateDashboardMarker(grid.equipment_id, lat, lng); // ✅ 좌표도 갱신
}

function updateDashboardMarker(equipmentId, lat, lng) {
  const markerObj = dashboardMarkers[equipmentId];
  if (!markerObj) return;

  const { map, marker } = markerObj;
  marker.setLatLng([lat, lng]);
  map.setView([lat, lng], 13);
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

async function loadModalData(equipmentId) {
  const res = await fetch(`/api/equipment/${equipmentId}/status?limit=100`);
  const result = await res.json();
  if (!result.success) return;
  console.log('📦 equipmentId:', equipmentId);

  const { temp, humid, press, lat, lng } = result.data;

  const mapContainer = document.getElementById(`modal-map-${equipmentId}`);
  if (!mapContainer) return;

  // ✅ 최초 생성
  if (!equipmentMarkers[equipmentId]) {
    if (mapContainer._leaflet_id) mapContainer._leaflet_id = null;

    const map = L.map(mapContainer).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([lat, lng]).addTo(map).bindPopup(`장비 위치`);
    equipmentMarkers[equipmentId] = { map, marker };

    equipmentPaths[equipmentId] = [[lat, lng]]; // ✅ 최초 좌표 저장
  } else {
    const { map, marker } = equipmentMarkers[equipmentId];
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);

    // ✅ 좌표 변화 감지 및 경로 저장
    const path = equipmentPaths[equipmentId];
    const last = path[path.length - 1];
    if (last[0] !== lat || last[1] !== lng) {
      path.push([lat, lng]);
    }

    // ✅ 기존 경로 제거
    if (equipmentMarkers[equipmentId].polyline) {
      map.removeLayer(equipmentMarkers[equipmentId].polyline);
    }

    // ✅ 새 경로 선 추가
    const polyline = L.polyline(path, { color: 'orange' }).addTo(map);
    equipmentMarkers[equipmentId].polyline = polyline;
  }

  renderModalChart(`modal-tempChart-${equipmentId}`, '온도', temp.values, temp.timestamps, 'red');
  renderModalChart(`modal-humidChart-${equipmentId}`, '습도', humid.values, humid.timestamps, 'blue');
  renderModalChart(`modal-pressChart-${equipmentId}`, '압력', press.values, press.timestamps, 'green');
}


function renderModalChart(canvasId, label, data, timestamps, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const existingChart = Chart.getChart(canvasId);
  if (existingChart) existingChart.destroy();

  const reversedData = data.slice().reverse();
  const reversedTimestamps = timestamps.slice().reverse();

  const chartData = reversedData.map((value, i) => ({
    x: i + 1,
    y: value,
    timestamp: reversedTimestamps[i]
  }));


  new Chart(canvas, {
    type: 'line',
    data: {
        datasets: [{
        label,
        data: chartData, // [{ x: 1, y: 23.5, timestamp: ... }, ...]
        borderColor: color,
        fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        tooltip: {
            callbacks: {
            label: function(context) {
                const point = context.raw;
                const time = point.timestamp === 'N/A'
                ? '시간 없음'
                : formatTimestamp(point.timestamp);
                return `값: ${point.y}, 시간: ${time}`;
            }
            }
        }
        },
        scales: {
        x: {
            type: 'linear', // ✅ 핵심
            beginAtZero: true,
            display: false
        },
        y: {
            beginAtZero: true
        }
        }
    }
    });

}

function formatTimestamp(ts) {
  if (ts === 'N/A') return '시간 없음';
  if (ts.length === 14) {
    const year = ts.slice(0, 4);
    const month = ts.slice(4, 6);
    const day = ts.slice(6, 8);
    const hour = ts.slice(8, 10);
    const minute = ts.slice(10, 12);
    const second = ts.slice(12, 14);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  return ts; // ✅ fallback
}
