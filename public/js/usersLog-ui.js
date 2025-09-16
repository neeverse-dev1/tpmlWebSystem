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
    "order": [[0, 'desc']], // Sorts the first column (index 0) in ascending order
    "pageLength": 25// Show 50 records per page initially
  });
});