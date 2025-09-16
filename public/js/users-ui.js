$(document).ready(function () {
  $('#usersTable').DataTable({
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
    lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
    order: [[0, 'desc']],
    pageLength: 10
  });

  $('.user-row').on('click', function () {
    $('#detail-id').text($(this).data('id'));
    $('#detail-model').text($(this).data('username'));
    $('#detail-voltage').text($(this).data('email'));
    $('#detail-signal').text($(this).data('phone'));
    $('#detail-gps').text($(this).data('expire_time'));
  });

  $('#addBtn').on('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('addModal'));
    modal.show();
  });

  $('.edit-btn').on('click', function () {
    $('#edit-id').val($(this).data('id'));
    $('#edit-username').val($(this).data('username'));
    $('#edit-email').val($(this).data('email'));
    $('#edit-password').val($(this).data('password'));
    $('#edit-phone').val($(this).data('phone'));
    $('#edit-expire_time').val($(this).data('expire_time'));
    $('#edit-img_path').val($(this).data('img_path'));

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  });

  let deleteId = null;
  $('.delete-btn').on('click', function () {
    deleteId = $(this).data('id');
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  });

  $('#confirmDelete').on('click', function () {
    fetch(`/users/delete/${deleteId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) location.reload();
        else alert('삭제 실패');
      });
  });

  $('#addForm').on('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    fetch('/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        if (data.success) location.reload();
        else alert('등록 실패');
      });
  });

  $('#editForm').on('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    fetch(`/users/update/${formData.userid}`, {
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
