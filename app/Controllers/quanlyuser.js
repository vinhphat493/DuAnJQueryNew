/**
 * Ngày tạo : 23-10-2018
 * Người tạo : Lạc Vĩnh Phát
 * Nội dung : Tạo chức năng đăng nhập, đăng ký, hiện thị page user, 
 * đổi mật khẩu, cập nhập thông tin người dùng và hiện thị danh sách khóa học cho học viên
 */

$(document).ready(function () {
    var svNguoiDung = new ServiceNguoiDung();
    var nguoiDung = new NguoiDung();
    var kiemtra = new KiemTraForm();
    var svKhoaHoc = new ServiceKhoaHoc();
    layThongTinND("NguoiDung");
    //Reset form đăng nhập khi click vào đăng nhập trên trang chủ
    $("#btnLogin").click(function () {
        $("#errorID").hide();
        $("#errorPass").hide();
        $("form input").val("");
        $("#divError").hide();
    })


    //Hàm đăng nhập 
    $("#login").click(function () {
        $("#divError").fadeOut();
        var taikhoan = $("#idUser").val();
        var matkhau = $("#pwdUser").val();
        if (kiemtra.getKTRong(taikhoan)) {
            $("#errorID").fadeOut();
            if (kiemtra.getKTRong(matkhau)) {
                $("#errorPass").fadeOut();
                svNguoiDung.DangNhapND(taikhoan, matkhau).done(function (ketqua) {
                    if (ketqua != "failed to login") {
                        nguoiDung = ketqua[0];
                        console.log(nguoiDung.MaLoaiNguoiDung);
                        if (nguoiDung.MaLoaiNguoiDung == "GV") {
                            swal("Đăng nhập thành công!", "Bấm OK để tiếp tục", "success");
                            $(".swal-button").on('click', () => {
                                $(".closeModal").trigger('click');
                            });
                        } else {
                            $("#btnLogin").hide();
                            $("#doneLogin").show();
                            var tenNguoiDungChuCaiDau = nguoiDung.HoTen.substring(0, 1).toUpperCase();
                            var tenNguoiDung = nguoiDung.HoTen.substring(1);
                            $("#tenUserLogin").html(tenNguoiDungChuCaiDau + tenNguoiDung);
                            swal("Đăng nhập thành công!", "Bấm OK để tiếp tục", "success");
                            $(".swal-button").on('click', () => {
                                $(".closeModal").trigger('click');
                            });
                            if ($("#rememberID").prop("checked")) {
                                luuThongTinND("NguoiDung", nguoiDung);
                            }
                        }
                    } else {
                        $("#divError").fadeIn();
                        $("#errorText").html("Sai tên đăng nhập hoặc mật khẩu");
                    }
                }).fail(function (loi) {
                    console.log(loi);
                })
            }
            else {
                $("#errorPass").fadeIn();
            }
        } else {
            $("#errorID").fadeIn();
        }

    })

    //Hàm đăng xuất
    $("#logOut").click(function () {
        localStorage.removeItem("NguoiDung");
        $("#doneLogin").hide();
        $("#btnLogin").show();
    })

    $(".btnSignUp").click(function () {
        $("#formSignUP input").val("");
        $("#formSignUP .error").hide();
    })

    xuLyAnTextError();

    //Xử lý text error
    function xuLyAnTextError() {

        $("#idUser").keyup(function () {
            $("#errorID").fadeOut();
        })
        $("#pwdUser").keyup(function () {
            $("#errorPass").fadeOut();
        })
        $("#idUserNew").keyup(function () {
            $("#error-idUserNew").fadeOut();
        });
        $("#pwdUserNew").keyup(function () {
            $("#error-pwdUserNew").fadeOut();
        });
        $("#pwdUserNewP2").keyup(function () {
            $("#error-pwdUserNewP2").fadeOut();
        });
    }

    //Hàm đăng ký
    $("#signUp").click(function () {
        var taikhoan = $("#idUserNew").val();
        var matkhau = $("#pwdUserNew").val();
        var matkhau2 = $("#pwdUserNewP2").val();
        if (kiemtra.getKTRong(taikhoan)) {
            if (kiemtra.getKTDodai(taikhoan, 4, 20)) {
                $("#error-idUserNew").fadeOut();
                if (kiemtra.getKTRong(matkhau)) {
                    if (kiemtra.getKTDodai(matkhau, 8, 20)) {
                        $("#error-pwdUserNew").fadeOut();
                        if (kiemtra.getKTRong(matkhau2)) {
                            if (matkhau == matkhau2) {
                                $("#error-pwdUserNewP2").fadeOut();
                                svNguoiDung.LayThongTinNguoiDung(taikhoan).done(function (ketqua) {
                                    console.log(ketqua.length);
                                    if (ketqua.length == 0) {
                                        $("#error-idUserNew").fadeOut();
                                        nguoiDung.TaiKhoan = taikhoan;
                                        nguoiDung.MatKhau = matkhau;
                                        nguoiDung.Email = "";
                                        nguoiDung.SoDT = "";
                                        nguoiDung.HoTen = "user";
                                        nguoiDung.MaLoaiNguoiDung = "HV";
                                        svNguoiDung.DangKy(nguoiDung).done(function (ketqua) {
                                            swal("Đăng ký thành công", "Bấm OK để đăng nhập!", "success");
                                            $(".swal-button").on('click', () => {
                                                $("#loginUser").trigger('click');
                                                $("#idUser").val(taikhoan);
                                                $("#pwdUser").val(matkhau);
                                            });
                                        }).fail(function (loi) {
                                            console.log(loi);
                                        })
                                    } else {
                                        $("#error-idUserNew").fadeIn().html("Tài khoản đã có người sử dụng");
                                    }
                                }).fail(function (loi) {
                                    console.log(loi)
                                })
                            } else {
                                $("#error-pwdUserNewP2").fadeIn().html("Xác nhận mật khẩu không chính xác");
                            }
                        } else {
                            $("#error-pwdUserNewP2").fadeIn();
                        }
                    } else {
                        $("#error-pwdUserNew").fadeIn().html("Mật khẩu phải từ 8 - 20 kí tự")
                    }
                } else {
                    $("#error-pwdUserNew").fadeIn();
                }
            } else {
                $("#error-idUserNew").fadeIn().html("Tài khoản phải từ 4 - 20 kí tự")
            }
        } else {
            $("#error-idUserNew").fadeIn();
        }
    })

    $("#ttUser").click(function () {

    })

    function luuThongTinND(key, value) {
        var value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }
    function layThongTinND(key) {
        var TTND = JSON.parse(localStorage.getItem(key));
        if (TTND != null) {
            nguoiDung = TTND;
            $("#btnLogin").hide();
            $("#doneLogin").show();
            var tenNguoiDungChuCaiDau = nguoiDung.HoTen.substring(0, 1).toUpperCase();
            var tenNguoiDung = nguoiDung.HoTen.substring(1);
            $("#tenUserLogin").html(tenNguoiDungChuCaiDau + tenNguoiDung);
            $("#nameUser").html(tenNguoiDungChuCaiDau + tenNguoiDung);
            svKhoaHoc.ListKHHV(nguoiDung.TaiKhoan).done(function (ketqua) {
                if (ketqua != "Did not find the course") {
                    console.log(ketqua);
                    var mangDSKHHV = ketqua;
                    var divKH = "";
                    for (var i = 0; i < mangDSKHHV.length; i++) {
                        var khoaHoc = mangDSKHHV[i];
                        divKH += `
                        <div class="col-md-4 col-sm-6 col-12 pb-5 khoahocItem">
                        <div class="card">
                            <div class="imgKhoaHoc">
                                <img class="card-img-top" src="../../../assets/img/pexels-photo-92904.jpeg
                                " alt="Card image" >
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">${khoaHoc.TenKhoaHoc}</h4>
                                <a href="chitietkhoahoc.html" class="btn btn-primary">Xem Chi Tiết</a>
                            </div>
                        </div>
                        </div>
                        `
                    }
                    $("#dskh").html(divKH);
                } else {
                    $("#titleDSKH").html("Hiện bạn chưa ghi danh bất kỳ khóa học nào")
                    $("#dskh").hide();
                }
            }).fail(function (loi) {
                console.log(loi)
            })
        } else {
            $("#doneLogin").hide();
            $("#btnLogin").show();
        }
        return TTND
    }
})