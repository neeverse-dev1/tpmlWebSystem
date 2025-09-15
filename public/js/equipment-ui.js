$(document).ready(function () {
  $('#equipmentTable').DataTable({
    language: {
      search: "검색:",
      lengthMenu: "보기 _MENU_ 개",
      info: "_TOTAL_개 중 _START_~_END_ 표시",
      paginate: {
        first: "처음",
        last: "마지막",
        next: "다음",
        previous: "이전"
      },
      zeroRecords: "일치하는 항목 없음"
    }
  });

  const mapContainer = document.getElementById('map');
  if (!mapContainer) return; // 없으면 실행 안 함

  const map = L.map('map').setView([37.5665, 126.9780], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

$('.equipment-row').on('click', function () {
  const latlong = $(this).data('gps').split(',');
  const lat = parseFloat(latlong[0]);
  const lng = parseFloat(latlong[1]);

  L.marker([lat, lng]).addTo(map)
    .bindPopup(`장비 위치: ${lat}, ${lng}`)
    .openPopup();

  map.setView([lat, lng], 15);
});


  $('.equipment-row').on('click', function () {
    $('#detail-id').text($(this).data('id'));
    $('#detail-model').text($(this).data('model'));
    $('#detail-voltage').text($(this).data('voltage') + 'V');
    $('#detail-signal').text($(this).data('signal'));
    $('#detail-gps').text($(this).data('gps'));
  });

});