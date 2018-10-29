/**
 * Ngày tạo : 15/10/2018
 * Người tạo : Lạc Vĩnh Phát
 * Chức năng : Thực hiện chức năng xem, thêm, sửa, xóa người dùng
 */

$(document).ready(() => {
    var svNguoidung = new ServiceNguoiDung();
    var DSND = new DanhSachNguoiDung();

    //Lấy danh sách người dùng từ api service về
    svNguoidung.LayDanhSachNguoiDung()
        .done((mangDSND) => {
            // console.log(mangDSND);
            DSND.MangDSND = mangDSND;
            // console.log(DSND.MangDSND)
            //Hàm hiện thị danh sách người dùng gồm cả NT và HV vào table và phân trang
            PhanTrang(DSND.MangDSND);
            //Lưu Danh Sách Người Dùng vào localStore
            // LuuLocalStorage()
        })
        .fail((error) => {
            console.log(error);
        })

    //Hiện thị popup thêm người dùng
    $("#themND").on('click', () => {
        $("#btnModal").trigger('click');

        $(".modal-title").html("Thêm Người Dùng Mới");

        var htmlModalFooter = `
        <button class="btn btn-primary" id="luuNguoiDung">Lưu Người Dùng</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `
        $(".modal-footer").html(htmlModalFooter);
        //Clear dữ liệu input
        $('.modal-body input').val('');
        $("#TaiKhoan").removeAttr("readonly");
        $("#MatKhau").removeAttr("readonly")
    })

    //Thêm người dùng vào page và upload len api
    $("body").delegate("#luuNguoiDung", "click", () => {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#LoaiND").val();
        var tenLoaiNguoiDung = $("#LoaiND option:selected").text();

        var nguoiDungNew = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
        //Thêm người dùng vào service API

        svNguoidung.ThemNguoiDung(nguoiDungNew).done((ketqua) => {
            if (ketqua) {
                swal({
                    title: "Thêm thành công!",
                    text: "Bạn đã thêm người dùng mới thành công!",
                    icon: "success",
                });
                $(".swal-button").on('click', () => {
                    $(".close").trigger('click');
                })
                setTimeout(() => {
                    location.reload();//reload lại trang
                }, 3000)
            }
        }).fail((error) => {
            console.log(error)
        })

    })

    //Xóa 1 người dùng trong 
    $("body").delegate(".btnXoa", "click", function () {
        var tkNguoiDung = $(this).attr("taikhoan");
        // console.log(tkNguoiDung);
        swal({
            title: "Bạn có chắc muốn xóa không ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    XoaNguoiDung(tkNguoiDung);
                } else {
                    swal("Bạn đã hủy xóa người dùng!");
                }
            });

        
    })

    //Check tất cả checkbox
    $("#checkAll").on('click', function () {
        var checked = $(this).prop("checked");
        var listCheckbox = $(".ckbTaiKhoan")
        for (var i = 0; i < listCheckbox.length; i++) {
            var checkbox = listCheckbox[i];
            checkbox.checked = checked;
        }
    })

    //Xóa nhiều người dùng bằng checkbox
    $("#xoaND").on('click', function () {
        console.log($(".ckbTaiKhoan"));
        var listCheckbox = $(".ckbTaiKhoan")
        for (var i = 0; i < listCheckbox.length; i++) {
            var checkbox = listCheckbox[i];
            if (checkbox.checked) {
                swal({
                    title: "Bạn có chắc muốn xóa không ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            XoaNguoiDung(checkbox.value);
                        } else {
                            swal("Bạn đã hủy xóa người dùng!");
                        }
                    });   
            }
        }
    })

    //Hiện thị popup khi người dùng click vào nút chỉnh sửa
    $("body").delegate(".btnChinhSua", "click", function () {
        var tkNguoiDung = $(this).attr("taikhoan");
        $("#btnModal").trigger('click');

        $(".modal-title").html("Cập Nhật Người Dùng");

        var htmlModalFooter = `
        <button class="btn btn-primary" id="luu">Lưu</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `
        $(".modal-footer").html(htmlModalFooter);
        // svNguoidung.LayThongTinNguoiDung(tkNguoiDung).done((ketqua) => {
        //     // var nguoiDungCanSua = JSON.parse(ketqua);
        //     console.log(ketqua);
        //     $("#TaiKhoan").val(ketqua[0].TaiKhoan).attr("readonly", "true");
        //     $("#MatKhau").val(ketqua[0].matKhau);
        //     $("#HoTen").val(ketqua[0].HoTen);
        //     $("#Email").val(ketqua[0].Email);
        //     $("#SoDienThoai").val(ketqua[0].SoDT);
        //     $("#LoaiND").val(ketqua[0].MaLoaiNguoiDung);
        //     $("#LoaiND option:selected").text(ketqua[0].TenLoaiNguoiDung);
        // }).fail((loi) => {
        //     console.log(loi)
        // })
        var nguoiDungCanSua = DSND.LayThongTinNguoiDung(tkNguoiDung);
        console.log(nguoiDungCanSua);
        $("#TaiKhoan").val(nguoiDungCanSua.TaiKhoan).attr("readonly", "true");
        $("#MatKhau").val(nguoiDungCanSua.MatKhau);
        $("#HoTen").val(nguoiDungCanSua.HoTen);
        $("#Email").val(nguoiDungCanSua.Email);
        $("#SoDienThoai").val(nguoiDungCanSua.SoDT);
        $("#LoaiND").val(nguoiDungCanSua.MaLoaiNguoiDung);
        $("#LoaiND option:selected").text(nguoiDungCanSua.TenLoaiNguoiDung);

    })

    //Lưu chỉnh sửa thông tin người dùng vào api
    $("body").delegate("#luu", "click", () => {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#LoaiND").val();
        var tenLoaiNguoiDung = $("#LoaiND option:selected").text();

        var nguoiDungNew = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
        svNguoidung.CapNhatThongTinNguoiDung(nguoiDungNew).done((ketqua) => {
            if (ketqua) {
                swal({
                    title: "Sửa thành công!",
                    text: "Bạn đã sửa người dùng thành công!",
                    icon: "success",
                });
                $(".swal-button").on('click', () => {
                    $(".close").trigger('click');
                })
                setTimeout(() => {
                    location.reload();//reload lại trang
                }, 2000)
            }
        }).fail((loi) => {
            console.log(loi)
        })
    })

    //Tìm kiếm người dùng
    $("#timnguoidung").keyup(function () {
        var tuKhoa = $(this).val();
        var doDaiTuKhoa = tuKhoa.length;
        var danhsachNguoiDungTK = DSND.TimNguoiDung(tuKhoa);
        PhanTrang(danhsachNguoiDungTK.MangDSND);
        //Duyệt các thẻ td
        $(".tdHoTen").each(function () {
            var hoTen = $(this).text(); //Lấy ra họ tên
            var viTriTuKhoa = hoTen.search(tuKhoa); //vị trí từ khóa trong chuỗi hoTen
            if (viTriTuKhoa != -1) {
                var chuoiKetQua = `
                ${hoTen.substring(0, viTriTuKhoa)} 
                <span class="InDam">${tuKhoa}</span> 
                ${hoTen.substring(viTriTuKhoa + doDaiTuKhoa)}
            `;
                $(this).html(chuoiKetQua); //Gán lại cho html() của chính thẻ td đó
            }
        });
        $(".InDam").NhapNhay({ soLan: 3, size: "17px", color: "red" });
    })

    //Hàm Phân Trang
    function PhanTrang(MangNguoiDung) {
        $('#pagination-container').pagination({
            dataSource: MangNguoiDung,
            pageSize: 10,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                // template method of yourself
                var html = simpleTemplating(data);

                $('#tbodyND').html(html);
            }
        });

        function simpleTemplating(data) {
            html = "";
            for (var i = 0; i < data.length; i++) {
                var nguoiDung = data[i];
                html += `
                <tr>
                    <td><input class="ckbTaiKhoan" type="checkbox" value="${nguoiDung.TaiKhoan}"></td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td class="tdHoTen">${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td>  
                    <td>${nguoiDung.TenLoaiNguoiDung}</td>
                    <td style="padding-left:0;padding-right:0">
                        <button taikhoan="${nguoiDung.TaiKhoan}"  class="btnChinhSua btn btn-primary"><i class="fa fa-pencil-square-o"></i></button> 
                        <button class="btn btn-danger btnXoa" taikhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-trash"></i></button> 
                    </td>  
                </tr>
            `
            }
            return html;
        }

    }

    //Hàm Xóa Người Dùng
    function XoaNguoiDung(tkNguoiDung) {
        svNguoidung.XoaNguoiDung(tkNguoiDung).done((ketqua) => {
            if (ketqua) {
                swal("Người dùng đã được xóa thành công!", {
                    icon: "success",
                });
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }).fail((loi) => {
            console.log(loi);
            swal({
                title: "Xóa không thành công!",
                icon: "warning"
            });
            // return false;
        })
    }

})