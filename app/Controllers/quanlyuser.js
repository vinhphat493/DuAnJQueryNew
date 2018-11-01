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
    var DSKH = new DanhSachKhoaHoc();
    //Lấy danh sách người dùng từ api service về
    svNguoiDung.LayDanhSachNguoiDung()
        .done((mangDSND) => {
            DSND.MangDSND = mangDSND;
        })
        .fail((error) => {
            console.log(error);
        })
    LayTTNDDaluu("NguoiDung");
    LoadChiTietKH();


    svKhoaHoc.LayDanhSachKhoaHoc().done((ListKH) => {
        console.log(ListKH)
        DSKH.MangKH = ListKH;
        LoadKH(ListKH);
    }).fail((loi) => {
        console.log(loi + "bị lỗi rồi")
    })

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
                } else {
                    $("#titleDSKH").html("Hiện bạn chưa ghi danh bất kỳ khóa học nào")
                    $("#dskh").hide();
                }
            }).fail(function (loi) {
                console.log(loi)
            })
        }
    }

    $("#laykhoahoc").click(function () {
        LayKhoaHocDayDu();
    })

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
                            LuuDuLieuVaoLocal("NguoiDungAdmin", nguoiDung);
                            swal("Đăng nhập thành công!", "Bấm OK để tiếp tục", "success");
                            $(".swal-button").on('click', () => {
                                setTimeout(() => {
                                    window.location.href = "./admin/main/index.html";
                                    $(".closeModal").trigger('click');
                                }, 1000);
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
                                $("#ghiDanhKHCHV").html("Ghi Danh");
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
        localStorage.clear();
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

    //Hàm lấy load div các khóa học của học viên
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
                            <a href="#" class="btn chiTietKH btn-primary" maKH = "${khoaHoc.MaKhoaHoc}">Xem Chi Tiết</a>
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

    //Load danh sách các khóa học vào page Khóa Học
    function LoadKH(mangKH) {
        $('#pagination-container').pagination({
            dataSource: mangKH,
            pageSize: 6,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                // template method of yourself
                var html = simpleTemplating(data);
                $('#loadListKH').html(html);
            }
        });
        function simpleTemplating(data) {
            html = "";
            for (var i = 0; i < data.length; i++) {
                khoahoc = data[i];
                var mota = khoahoc.MoTa;
                if(khoahoc.MoTa == null){
                    mota = "null";
                }else{
                    khoahoc.MoTa.length >= 100 ? mota = khoahoc.MoTa.substring(0, 100) + "..." : mota = khoahoc.MoTa;
                }
                
                html += `
                <div class="col-md-4 col-sm-6 col-12 pb-5 khoahocItem">
                <div class="card">
                    <div class="imgKhoaHoc">
                        <img class="card-img-top" src="${khoahoc.HinhAnh}" alt="Card image">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${khoahoc.TenKhoaHoc}</h4>
                        <div class="card-text" style="height:70px">${mota}</div>
                        <a href="#" class="btn btn-primary chiTietKH" maKH="${khoahoc.MaKhoaHoc}">Xem Chi Tiết</a>
                    </div>
                </div>
            </div>
            `
            }
            return html;
        }
    }

    //Lấy mã khóa học để hiện thị chi tiết khóa học
    $("body").delegate(".chiTietKH", "click", function () {
        var pathPage = window.location.pathname;
        console.log(pathPage);
        var maKH = $(this).attr("maKH");
        khoaHoc = DSKH.LayThongTinKhoaHoc(maKH);
        LuuDuLieuVaoLocal("KhoaHocDaChon", khoaHoc);
        $("#fountainG").fadeIn();
        $("#ghidanhLoader").fadeIn();
        var urlIndex = "/index.html";
        var urlUser = "/user.html";
        setTimeout(() => {
            $("#fountainG").fadeOut();
            $("#ghidanhLoader").fadeOut();
            if (pathPage == urlIndex || pathPage == "/") {
                window.location.href = "layouts/chitietkhoahoc.html";
            } else if (pathPage == urlUser) {
                window.location.href = "layouts/chitietkhoahoc.html";
                $("#ghiDanhKHCHV").css({ "cursor": "no-drop" });
            } else {
                window.location.href = "chitietkhoahoc.html";
            }
        }, 2000);
    })

    //Load Chi Tiết Khóa Hoc với mã khóa học lấy được ở trên
    function LoadChiTietKH() {
        khoaHoc = LayDuLieuLocal("KhoaHocDaChon");
        if (khoaHoc != null) {
            $(".nameKH").html(khoaHoc.TenKhoaHoc);
            $("#nameGV").html(khoaHoc.NguoiTao);
            $("#noiDungKH").html(khoaHoc.MoTa);
            var hinhAnh = khoaHoc.HinhAnh;
            // console.log(hinhAnh)
            $("#hinhAnhKH").attr("src", hinhAnh);
            $("#ghiDanhKHCHV").attr("maKH", khoaHoc.MaKhoaHoc);
            $("#ghiDanhKHCHV").css({ "cursor": "pointer" });
        }
    }
    {/* */ }
    //Ghi Danh khóa học cho học viên
    $("#ghiDanhKHCHV").click(function () {
        nguoiDung = LayDuLieuLocal("NguoiDung");
        console.log(nguoiDung);
        var makh = $(this).attr("maKH");
        console.log(makh);
        var divLoader = `
                    <div class="cssload-container" id="ghidanhLoader">
                                            <div class="cssload-l">L</div>
                                            <div class="cssload-circle"></div>
                                            <div class="cssload-square"></div>
                                            <div class="cssload-triangle"></div>
                                            <div class="cssload-i">I</div>
                                            <div class="cssload-n">N</div>
                                            <div class="cssload-g">G</div>
                                        </div> 
                    `
        $(this).html(divLoader);
        if (nguoiDung != false) {
            swal({
                title: "Ghi Danh Khóa Học!",
                text: "Bạn muốn ghi danh khóa học này không!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        setTimeout(() => {
                            svKhoaHoc.GhiDanhKH(nguoiDung.TaiKhoan, makh).done((ketqua) => {
                                if (ketqua) {
                                    $("#ghiDanhKHCHV").css({ "cursor": "no-drop" });
                                    $("#ghiDanhKHCHV").html("Ghi Danh Thành Công");
                                    swal("Bạn đã ghi danh thành công! ", {
                                        icon: "success",
                                    });
                                }
                            }).fail((loi) => {
                                console.log(loi + "Bi loi roi")
                                swal("Chú ý!", "Khóa học này bạn đã được ghi danh!", "warning");
                                $("#ghiDanhKHCHV").css({ "cursor": "no-drop" });
                                $("#ghiDanhKHCHV").html("Ghi Danh");
                            })
                        }, 2000);
                    } else {
                        swal("Bạn đã hủy ghi danh khóa học!");
                    }
                });
        } else {
            swal("Chú ý!", "Vui lòng đăng nhập tài khoản!", "error");
            $(".swal-button").on('click', () => {
                $("#btnLogin").trigger("click");
            });
        }
    });

    //Tìm kiếm khóa học
    $("#timkhoahoc").keyup(function () {
        var tuKhoa = $(this).val();

        var danhSachTimKiem = DSKH.TimKhoaHoc(tuKhoa);

        if (danhSachTimKiem.MangKH != null) {
            $("#divItemSearch").fadeIn();
            $("#titleSearch").html("Có " + danhSachTimKiem.MangKH.length + " kết quả tìm kiếm")
            var itemKH = "";
            for (var i = 0; i < danhSachTimKiem.MangKH.length; i++) {
                khoaHoc = danhSachTimKiem.MangKH[i];
                var tenKH = khoaHoc.TenKhoaHoc;
                khoaHoc.TenKhoaHoc.length >= 15 ? tenKH=khoaHoc.TenKhoaHoc.substring(0,15) + "..." : tenKH = khoaHoc.TenKhoaHoc ;
                itemKH += `
                    <a href="#" class="nav-link chiTietKH mt-2 p-1 rounded border" maKH="${khoaHoc.MaKhoaHoc}">
                        <div class="row mx-0 divItemKH">
                            <div class="col-lg-5 col-3 mx-0 px-0">
                                <img src="${khoaHoc.HinhAnh}" class="imgKHTK" alt="HinhAnhKH">
                            </div>
                            <div class="col-lg-7 col-9 px-0 divTenKH">
                            <span class="nameKHTk">${tenKH}</span>
                            </div>
                        </div>
                    </a>
                `
            }
            $("#listDSKHTK").html(itemKH);
        } else {
            $("#titleSearch").html("Không tìm được khóa học có tên " + tuKhoa);
        }

    })

})