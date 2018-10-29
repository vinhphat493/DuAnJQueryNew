/**
 * Ngày tạo : 23-10-2018
 * Người tạo : Lạc Vĩnh Phát
 * Nội dung : Tạo chức năng đăng nhập, đăng ký, hiện thị page user, 
 * đổi mật khẩu, cập nhập thông tin người dùng và hiện thị danh sách khóa học cho học viên
 */

$(document).ready(function () {
    var svNguoiDung = new ServiceNguoiDung();
    var nguoiDung = new NguoiDung();
    var khoaHoc = new KhoaHoc();
    var DSND = new DanhSachNguoiDung();
    var kiemtra = new KiemTraForm();
    var svKhoaHoc = new ServiceKhoaHoc();
    //Lấy danh sách người dùng từ api service về
    svNguoiDung.LayDanhSachNguoiDung()
        .done((mangDSND) => {
            DSND.MangDSND = mangDSND;
        })
        .fail((error) => {
            console.log(error);
        })
    LayTTNDDaluu("NguoiDung");

    //Hàm lấy dữ liệu thông tin người dùng mới đăng nhập hiện thị lên
    function LayTTNDDaluu(keyLocal) {
        var nguoiDung = LayDuLieuLocal(keyLocal);
        if (nguoiDung != false) {
            $("#btnLogin").hide();
            $("#doneLogin").show();
            var tenNguoiDungChuCaiDau = nguoiDung.HoTen.substring(0, 1).toUpperCase();
            var tenNguoiDung = nguoiDung.HoTen.substring(1);
            $("#tenUserLogin").html(tenNguoiDungChuCaiDau + tenNguoiDung);
            $("#nameUser").html(tenNguoiDungChuCaiDau + tenNguoiDung);
            $("#name").val(nguoiDung.HoTen);
            $("#email").val(nguoiDung.Email);
            $("#soDT").val(nguoiDung.SoDT);
            svKhoaHoc.ListKHHV(nguoiDung.TaiKhoan).done(function (ketqua) {
                if (ketqua != "Did not find the course") {
                    LuuDuLieuVaoLocal("MaKhoaHoc", ketqua);
                    /*var mangDSKHHV = ketqua;
                    var divKH = "";
                    for (var i = 0; i < mangDSKHHV.length; i++) {
                        var khoaHocDaGhiDanh = mangDSKHHV[i];
                        divKH += `
                        <div class="col-md-4 col-sm-6 col-12 pb-5 khoahocItem">
                        <div class="card">
                            <div class="imgKhoaHoc">
                                <img class="card-img-top" src="" alt="Card image" >
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">${khoaHocDaGhiDanh.TenKhoaHoc}</h4>
                                <a href="chitietkhoahoc.html" class="btn btn-primary">Xem Chi Tiết</a>
                            </div>
                        </div>
                        </div>
                        `
                    }
                    $("#dskh").html(divKH);*/
                } else {
                    $("#titleDSKH").html("Hiện bạn chưa ghi danh bất kỳ khóa học nào")
                    $("#dskh").hide();
                }
            }).fail(function (loi) {
                console.log(loi)
            })
            LayKhoaHocDayDu();
        }
    }

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
                            luuThongTinND("NguoiDungAdmin", nguoiDung);
                            swal("Đăng nhập thành công!", "Bấm OK để tiếp tục", "success");
                            $(".swal-button").on('click', () => {
                                window.location.href = "./admin/main/index.html";
                                $(".closeModal").trigger('click');
                            });
                        } else {
                            $("#btnLogin").hide();
                            $("#doneLogin").show();
                            var tenNguoiDungChuCaiDau = nguoiDung.HoTen.substring(0, 1).toUpperCase();
                            var tenNguoiDung = nguoiDung.HoTen.substring(1);
                            $("#tenUserLogin").html(tenNguoiDungChuCaiDau + tenNguoiDung);
                            LuuDuLieuVaoLocal("NguoiDung", nguoiDung);
                            swal("Đăng nhập thành công!", "Bấm OK để tiếp tục", "success");
                            $(".swal-button").on('click', () => {
                                $(".closeModal").trigger('click');
                            });
                            // if ($("#rememberID").prop("checked")) {
                            //     luuThongTinND("NguoiDung", nguoiDung);
                            // }
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

    //Hàm reset form đăng ký
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

    //Hàm sửa thông tin người dùng
    $("#luuTTND").click(function () {
        var nguoidungDangDangNhap = LayDuLieuLocal("NguoiDung");
        // console.log(nguoidungDangDangNhap);
        var ttNguoiDung = DSND.LayThongTinNguoiDung(nguoidungDangDangNhap.TaiKhoan);
        ttNguoiDung.HoTen = $("#name").val();
        ttNguoiDung.Email = $("#email").val();
        ttNguoiDung.SoDT = $("#soDT").val();
        svNguoiDung.CapNhatThongTinNguoiDung(ttNguoiDung).done((ketqua) => {
            if (ketqua) {
                ttNguoiDung.MatKhau = "";
                swal({
                    title: "Cập nhập thông tin thành công!",
                    icon: "success",
                });
                setTimeout(() => {
                    LuuDuLieuVaoLocal("NguoiDung", ttNguoiDung)
                    location.reload();//reload lại trang
                }, 1000);
            };
        }).fail((loi) => {
            console.log(loi)
        })
    })

    //Hàm đổi mật khẩu
    $("#doiMK").click(function () {
        var passOld = $("#pwdUserOld").val();
        var passNew = $("#pwdUserNew").val();
        var passNew2 = $("#pwdUserNew2").val();
        var nguoidungDangDangNhap = LayDuLieuLocal("NguoiDung");
        var ttNguoiDung = DSND.LayThongTinNguoiDung(nguoidungDangDangNhap.TaiKhoan);
        if (kiemtra.getKTRong(passOld)) {
            if (kiemtra.getKTDodai(passOld, 8, 20)) {
                if (kiemtra.getKTRong(passNew)) {
                    if (kiemtra.getKTDodai(passNew, 8, 20)) {
                        if (ttNguoiDung.MatKhau == passOld) {
                            if (passNew == passNew2) {
                                $("#divError").fadeOut();
                                ttNguoiDung.MatKhau = passNew;
                                swal({
                                    title: "Bạn có chắc chắn muốn đổi mật khẩu không ?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            svNguoiDung.CapNhatThongTinNguoiDung(ttNguoiDung).done((ketqua) => {
                                                if (ketqua) {
                                                    console.log(ketqua);
                                                    swal("Chúc mừng ! Bạn đã đổi mật khẩu thành công. Bạn vui lòng đăng nhập lại hệ thống!", {
                                                        icon: "success",
                                                      });
                                                    setTimeout(() => {
                                                        localStorage.clear();
                                                        window.location.href = "./index.html";
                                                    }, 2000);
                                                }
                                            }).fail((loi) => {
                                                console.log("loi");
                                                swal({
                                                    title: "Bị lỗi hệ thống!",
                                                    text: "Tạm thời không đổi mật khẩu được!",
                                                    icon: "warring",
                                                });
                                            })
                                        } else {
                                            swal("Bạn đã từ chối đổi mật khẩu!");
                                        }
                                    });

                            } else {
                                $("#divError").fadeIn().html("Mật khẩu xác nhận không chính xác !");
                            }
                        } else {
                            $("#divError").fadeIn().html("Mật khẩu cũ không chính xác !");
                        }
                    } else {
                        $("#divError").fadeIn().html("Mật khẩu mới phải từ 8 đến 20 kí tự !");
                    }
                } else {
                    $("#divError").fadeIn().html("Mật khẩu mới không được để trống !");
                }
            } else {
                $("#divError").fadeIn().html("Mật khẩu cũ phải từ 8 đến 20 kí tự !");
            }
        } else {
            $("#divError").fadeIn().html("Mật khẩu cũ không được để trống !");
        }

    })

    //Hàm lấy chi tiết các khóa học
    function LayKhoaHocDayDu() {
        var mangKHDAGD = LayDuLieuLocal("MaKhoaHoc");
        // var mangKH = [];
        var divKH = "";
        if (mangKHDAGD != false) {
            for (var i = 0; i < mangKHDAGD.length; i++) {
                var khoaHocDAGD = mangKHDAGD[i];
                svKhoaHoc.ChiTietKhoaHoc(khoaHocDAGD.MaKhoaHoc).done(function (ketqua) {
                    khoaHoc = ketqua;
                    var mota = khoaHoc.MoTa;
                    khoaHoc.MoTa.length >= 100 ? mota = khoaHoc.MoTa.substring(0, 100) + "..." : mota = khoaHoc.MoTa;
                    divKH += `
                    <div class="col-md-4 col-sm-6 col-12 pb-5 khoahocItem">
                    <div class="card">
                        <div class="imgKhoaHoc">
                            <img class="card-img-top" src="${khoaHoc.HinhAnh}" alt="Card image" >
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">${khoaHoc.TenKhoaHoc}</h4>
                            <div class="card-text" style="height:70px">${mota}</div>
                            <a href="chitietkhoahoc.html" class="btn btn-primary">Xem Chi Tiết</a>
                        </div>
                    </div>
                    </div>
                    `
                    $("#dskh").html(divKH);
                }).fail(function (loi) {
                    return console.log("bi loi roi");
                })
            }

        }

    }

    // Hàm lưu dữ liệu vào localStorage
    function LuuDuLieuVaoLocal(key, value) {
        var value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }
    //Hàm lấy dữ liệu từ locaStorage
    function LayDuLieuLocal(key) {
        var dulieu = JSON.parse(localStorage.getItem(key));
        if (dulieu != null) {
            return dulieu;
        } else {
            return false;
        }
    }


})