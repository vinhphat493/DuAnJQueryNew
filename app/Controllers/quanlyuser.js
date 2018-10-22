/**
 * Ngày tạo : 23-10-2018
 * Người tạo : Lạc Vĩnh Phát
 * Nội dung : Tạo chức năng đăng nhập, đăng ký, hiện thị page user, 
 * đổi mật khẩu, cập nhập thông tin người dùng và hiện thị danh sách khóa học cho học viên
 */

$(document).ready(function() {
    var svNguoiDung = new ServiceNguoiDung();
    var nguoiDung = new NguoiDung();
    $("")

    //Hàm đăng nhập 
    $("#login").click(function () {
        var taikhoan = $("#idUser").val();
        var matkhau = $("#pwdUser").val();
        svNguoiDung.DangNhapND(taikhoan,matkhau).done(function(ketqua){
           if(ketqua!="failed to login"){
            // console.log(ketqua);
            nguoiDung = ketqua[0];
            console.log(nguoiDung)
            $("#btnLogin").hide();
            $("#doneLogin").show();
            $("#tenUserLogin").html(nguoiDung.HoTen);
            swal("Đăng nhập thành công!");
            $(".swal-button").on('click', () => {
                $(".closeModal").trigger('click');
            })
            // console.log(nguoiDung.HoTen)
            luuThongTinND("NguoiDung",nguoiDung);
           }else{
               $("#divError").fadeIn();
               $("#errorText").html("Sai tên đăng nhập hoặc mật khẩu");
           }
        }).fail(function(loi){
            console.log(loi);
        })
    })

    console.log(layThongTinND("NguoiDung"));

    function luuThongTinND(key,value){
        var value = JSON.stringify(value);
        localStorage.setItem(key,value);
    }
    function layThongTinND(key){
        var TTND = JSON.parse(localStorage.getItem(key));
        if(TTND != null){

        }
        return TTND
    }
})