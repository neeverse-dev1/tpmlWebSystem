$('#saveGridConfig').on('click', async function () {
  const configs = [];

  $('.grid-eq').each(function () {
    const id = $(this).data('id');
    const equipment_id = $(this).val();
    const view_type = $(`.grid-type[data-id="${id}"]`).val();
    const title = $(`.grid-title[data-id="${id}"]`).val();

    configs.push({ id, equipment_id, view_type, title });
  });

  const res = await fetch('/api/dashboard/grid/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(configs) // ✅ configs만 보내는 구조
  });

  const result = await res.json();
  if (result.success) {
    showToast('그리드 설정이 저장되었습니다.');
    setTimeout(() => location.reload(), 1500); // ✅ 1.5초 후 새로고침
  } else {
    alert('저장 실패: ' + result.message);
  }
});

function showToast(message = '저장되었습니다') {
  const toastEl = document.getElementById('gridToast');
  toastEl.querySelector('.toast-body').textContent = message;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

