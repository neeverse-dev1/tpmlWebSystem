$(document).ready(function () {
  $('#equipmentTable').DataTable({
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
    "order": [[0, 'desc']], // Sorts the first column (index 0) in ascending order
    "pageLength": 10// Show 50 records per page initially
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
  $('#detail-gps').text($(this).data('gps'));
  $('#detail-etc').text($(this).data('etc'));
  $('#detail-created_at').text($(this).data('created'));
  $('#detail-updated_at').text($(this).data('updated'));
});

});

$(function () {
  // 등록 모달 열기

  $('#addBtn').on('click', function () {
    // const newId = 'EQ-' + Date.now(); // 자동생성 예시
    // $('#addModal input[name="equipment_id"]').val(newId);
    const modal = new bootstrap.Modal(document.getElementById('addModal'));
    modal.show();
  });

  // 수정 모달 열기
  $('.edit-btn').on('click', function () {
    $('#edit-id').val($(this).data('id'));
    $('#edit-model').val($(this).data('model'));
    $('#edit-etc').val($(this).data('etc'));
    $('#edit-gps').val($(this).data('gps'));

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  });

  // 삭제 모달 열기
  let deleteId = null;
  $('.delete-btn').on('click', function () {
    deleteId = $(this).data('id');
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  });

  // 삭제 확정
  $('#confirmDelete').on('click', function () {
    fetch(`/equipment/delete/${deleteId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) location.reload();
        else alert('삭제 실패');
      });
  });

  // 등록 처리
  $('#addForm').on('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    fetch('/equipment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        if (data.success) location.reload();
        else alert('등록 실패');
      });
  });

  // 수정 처리
  $('#editForm').on('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    fetch(`/equipment/update/${formData.equipment_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        if (data.success) location.reload();
        else alert('수정 실패');
      });
  });
});
