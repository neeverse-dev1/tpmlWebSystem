$(document).ready(function () {
  $('#logTable').DataTable({
    language: {
      search: "검색:",
      lengthMenu: "_MENU_",
      info: "_TOTAL_개 중 _START_~_END_ 표시",
      paginate: {
        first: "처음",
        last: "마지막",
        next: "다음",
        previous: "이전"
      },
      zeroRecords: "일치하는 항목 없음"
    },
    "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
    "order": [[6, 'desc']], // Sorts the first column (index 0) in ascending order
    "pageLength": 25// Show 50 records per page initially
  });


  // 로그 row 클릭 시 상세 정보 표시
$('#logTable').on('click', '.log-row', function () {
  $('#detail-id').text($(this).data('id'));
  $('#detail-temp').text($(this).data('temp'));
  $('#detail-hum').text($(this).data('hum'));
  $('#detail-pres').text($(this).data('pres'));
  $('#detail-gps').text($(this).data('gps'));
  $('#detail-time').text($(this).data('time'));      // 장비 시간
  $('#detail-created').text($(this).data('created')); // 수신 시간

  const [lat, long] = $(this).data('gps').split(',');
  updateMap(lat.trim(), long.trim());
});

// 필터 기능
$('#equipmentFilter').on('change', function () {
  const selected = $(this).val();
  $('#logTable tbody tr').each(function () {
    const eqId = $(this).data('id');
    $(this).toggle(!selected || eqId === selected);
  });
});

// 지도 업데이트
let map = L.map('map').setView([37.5665, 126.9780], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let marker;

function updateMap(lat, long) {
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, long]).addTo(map);
  map.setView([lat, long], 15);
}

});