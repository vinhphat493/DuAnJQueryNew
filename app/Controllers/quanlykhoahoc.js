/**
 * Ngày tạo : 19/10/2018
 * Người tạo : Lạc Vĩnh Phát
 * Chức năng controller : Quản lý khóa học với các chức năng thêm xem sửa xóa tìm kiếm khóa học
 */

$(document).ready(() => {

    var DSKH = new DanhSachKhoaHoc();
    var svKhoaHoc = new ServiceKhoaHoc();
    var svNguoiDung = new ServiceNguoiDung();

    //Load Danh Sách Khóa Học vào page
    svKhoaHoc.LayDanhSachKhoaHoc().done(function (mangDSKH) {
        // console.log(mangDSKH);
        DSKH.MangKH = mangDSKH;
        PhanTrang(DSKH.MangKH);

    }).fail(function (loi) {
        console.log(loi);
    })

    //Load Danh Sách Người Dùng để lấy option Người Tạo
    svNguoiDung.LayDanhSachNguoiDung().done(function (mangDSND) {
        loadSelectNguoiTao(mangDSND);
    }).fail(function (loi) {
        console.log(loi)
    })

    //Load Select Người Tạo có trường Mã Loại Người Dùng là GV
    function loadSelectNguoiTao(mangDanhSachNguoiDung) {
        var optionNT = "";
        mangDanhSachNguoiDung.map(function (nguoiTao, index) {
            if (nguoiTao.HoTen != "" && nguoiTao.MaLoaiNguoiDung == "GV") {
                optionNT += `
                <option value="0" disabled></option>
                <option value=${nguoiTao.TaiKhoan}>${nguoiTao.HoTen}</option>
                `
            }
        })
        $("#nguoitao").append(optionNT);
    }

    //Hàm xử lý hiện popup khi click vào nút Thêm Khóa Học
    $("#themKH").click(function () {
        $("#btnModal").trigger('click');
        $(".modal-title").html("Thêm Khóa Học Mới");
        var modalFooter = `
        <button class="btn btn-primary" id="addKH">Thêm mới</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `
        $(".modal-footer").html(modalFooter);
        $(".modal-body input").val("");
        CKEDITOR.instances.MoTa.setData("");
    })

    //Hàm xử lý thêm khóa học vào api
    $("body").delegate("#addKH", "click", function () {

        var maKhoaHoc = $("#makhoahoc").val();
        var tenKhoaHoc = $("#tenkhoahoc").val();
        var hinhAnh = $("#hinhanh").val();
        var luotXem = $("#luotxem").val();
        var nguoiTao = $("#nguoitao").val();
        var moTa = CKEDITOR.instances.MoTa.getData();

        var khoaHoc = new KhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);

        svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (ketqua) {
            if (ketqua) {
                swal({
                    title: "Thêm thành công!",
                    text: "Bạn đã thêm khóa học mới thành công!",
                    icon: "success",
                });
                $(".swal-button").on('click', () => {
                    $(".close").trigger('click');
                })
                setTimeout(() => {
                    location.reload();//reload lại trang
                }, 3000)
            }
        }).fail(function (loi) {
            console.log(loi);
        });
        // console.log(khoaHoc);
    })

    //Hàm chỉnh sửa khóa học
    $("body").delegate(".btnChinhSua", 'click', function () {
        var maKH = $(this).attr("makh");
        $("#btnModal").trigger('click');
        $(".modal-title").html("Chỉnh sửa khóa học");
        var htmlModalFooter = `
        <button class="btn btn-primary" id="suaKH">Lưu lại</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `
        $(".modal-footer").html(htmlModalFooter);

        var khoaHoc = DSKH.LayThongTinKhoaHoc(maKH);
        $("#makhoahoc").val(khoaHoc.MaKhoaHoc);
        $("#tenkhoahoc").val(khoaHoc.TenKhoaHoc);
        $("#hinhanh").val(khoaHoc.HinhAnh);
        $("#luotxem").val(khoaHoc.LuotXem);
        $("#nguoitao").val(khoaHoc.NguoiTao);
        CKEDITOR.instances.MoTa.setData(khoaHoc.MoTa);
    })

    //Hàm thêm chỉnh sửa khóa học vào API service
    $("body").delegate("#suaKH", 'click', function () {
        var maKhoaHoc = $("#makhoahoc").val();
        var tenKhoaHoc = $("#tenkhoahoc").val();
        var hinhAnh = $("#hinhanh").val();
        var luotXem = $("#luotxem").val();
        var nguoiTao = $("#nguoitao").val();
        var moTa = CKEDITOR.instances.MoTa.getData();


        svKhoaHoc.SuaKhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao).done(function (ketqua) {
            if (ketqua) {
                swal({
                    title: "Sửa thành công!",
                    text: "Bạn đã chỉnh sửa khóa học thành công!",
                    icon: "success",
                });
                $(".swal-button").on('click', () => {
                    $(".close").trigger('click');
                })
                setTimeout(() => {
                    location.reload();//reload lại trang
                }, 3000)
            }
        }).fail(function (loi) {
            console.log(loi);
        });
    })

    //Hàm xóa khóa học trên tầng nút button xóa của khóa học
    $("body").delegate(".btnXoa", 'click', function () {
        var maKH = $(this).attr("makh");
        swal({
            title: "Bạn có chắc muốn xóa không ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    svKhoaHoc.XoaKhoaHoc(maKH).done(function (ketqua) {
                        if (ketqua) {
                            swal({
                                title: "Xóa thành công!",
                                text: "Bạn đã xóa khóa học thành công!",
                                icon: "success"
                            });
                            $(".swal-button").on('click', () => {
                                location.reload();//reload lại trang
                            })
                        }
                    }).fail(function (loi) {
                        console.log(loi)
                    })
                } else {
                    swal("Bạn đã hủy xóa khóa học!");
                }
            });

    })

    //Hàm checked tất cả người dùng một lúc
    $("#allCheckBox").click(function () {
        var checked = $(this).prop("checked");
        var listCheckBox = $(".cbMaKhoaHoc");
        for (var i = 0; i < listCheckBox.length; i++) {
            var checkbox = listCheckBox[i];
            checkbox.checked = checked;
        }
    })

    //Hàm xóa nhiều khóa học một lượt
    $("#xoaKH").click(function () {
        var listCheckbox = $(".cbMaKhoaHoc");
        swal({
            title: "Bạn có chắc muốn xóa không ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    for (var i = 0; i < listCheckbox.length; i++) {
                        var checkbox = listCheckbox[i];
                        if (checkbox.checked) {
                            svKhoaHoc.XoaKhoaHoc(checkbox.value).done(function (ketqua) {
                                if (ketqua) {
                                    swal({
                                        title: "Xóa thành công!",
                                        text: "Bạn đã xóa khóa học thành công!",
                                        icon: "success"
                                    });
                                    $(".swal-button").on('click', () => {
                                        location.reload();//reload lại trang
                                    })
                                }
                            }).fail(function (loi) {
                                console.log(loi)
                            })
                        }
                    }
                } else {
                    swal("Bạn đã hủy xóa khóa học!");
                }
            });

    })

    //Tìm kiếm khóa học
    $("#timkhoahoc").keyup(function () {
        var tuKhoa = $(this).val();
        var doDaiTuKhoa = tuKhoa.length;
        var danhSachTimKiem = DSKH.TimKhoaHoc(tuKhoa);
        PhanTrang(danhSachTimKiem.MangKH);
        //Duyệt các thẻ td
        $(".tdTenKH").each(function () {
            var tenKH = $(this).text(); //Lấy ra họ tên
            var viTriTuKhoa = tenKH.search(tuKhoa); //vị trí từ khóa trong chuỗi hoTen
            if (viTriTuKhoa != -1) {
                var chuoiKetQua = `
                ${tenKH.substring(0, viTriTuKhoa)} 
                <span class="InDam">${tuKhoa}</span> 
                ${tenKH.substring(viTriTuKhoa + doDaiTuKhoa)}
            `;
                $(this).html(chuoiKetQua); //Gán lại cho html() của chính thẻ td đó
            }
        });
        $(".InDam").NhapNhay({ soLan: 3, size: "17px", color: "red" });
    })


    //Hàm Phân Trang để load danh sách khóa học lên page
    function PhanTrang(mangKH) {
        $('#pagination-container').pagination({
            dataSource: mangKH,
            pageSize: 5,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                // template method of yourself
                var html = simpleTemplating(data);
                $('#tbodyKH').html(html);
            }
        })

        function simpleTemplating(data) {
            var html = "";

            data.map(function (khoaHoc, index) {
                var mota = khoaHoc.MoTa;
                if (khoaHoc.MoTa != null) {
                    khoaHoc.MoTa.length >= 100 ? mota = khoaHoc.MoTa.substring(0, 100) : mota = khoaHoc.MoTa;
                }
                html += `
                    <tr class="trKhoaHoc">
                        <td>
                            <input type="checkbox" class="cbMaKhoaHoc"  value = ${khoaHoc.MaKhoaHoc}>
                        </td>
                        <td>${khoaHoc.MaKhoaHoc}</td>
                        <td class="tdTenKH">${khoaHoc.TenKhoaHoc}</td>
                        <td>${mota}</td>
                        <td><img src="${khoaHoc.HinhAnh}" alt="null" width="75" height="50"></td>
                        <td>${Number(khoaHoc.LuotXem).toLocaleString()}</td>
                        <td>${khoaHoc.NguoiTao}</td>
                        <td>
                        <button maKH="${khoaHoc.MaKhoaHoc}"  class="btnChinhSua btn btn-primary"><i class="fa fa-pencil-square-o"></i></button> 
                        <button class="btn btn-danger btnXoa" maKH="${khoaHoc.MaKhoaHoc}"><i class="fa fa-trash"></i></button> 
                        </td>
                    </tr>
                `
            })
            return html;
        }

    }

})