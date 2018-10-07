//Owl-carousel
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
      loop:true,
      nav:true,
      items:3
  })
});

//Phần phân trang
function PhanTrang() {
  $('#pagination-container').pagination({
      dataSource: $(".khoahocItem"),
      pageSize: 3,
      callback: function (data, pagination) {
          // template method of yourself
          var html = simpleTemplating(data);
          $('#tblDanhSachNguoiDung').html(html);
      }
  });
}