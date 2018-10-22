/**
 * Ngày tạo: 20/10/2018
 * Người tạo : Lạc Vĩnh Phát
 * Nội dung chức năng : ghi danh khóa học
 */

 $(document).ready(()=>{
    var DSND = new DanhSachNguoiDung();
    var svNguoiDung = new ServiceNguoiDung();
    var svKhoaHoc = new ServiceKhoaHoc();

    //Lấy danh sách người dùng có mã loại người dùng là HV
    svNguoiDung.LayThongTinNguoiDungHV().done((NDHV)=>{
        DSND.MangDSND = NDHV;
        PhanTrang(DSND.MangDSND)
    }).fail((loi)=>{
        console.log(loi);
    })

    //Hàm trigger popup hiện lên
    $("body").delegate(".btnGD","click",function(){
        $("#btnModal").trigger("click");
        var taikhoan = $(this).attr("taikhoan");
        $(".modal-title").html("Ghi Danh Khóa Học");
        var modalFooter = `
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `
        $(".modal-footer").html(modalFooter);

        //Load list khóa học mà học viên đã ghi danh
        LoadListDSKH(taikhoan);

        $("#btnGhiDanh").attr("taikhoan",taikhoan);
    })

    //Lấy danh sách khóa học
    svKhoaHoc.LayDanhSachKhoaHoc().done((DSKH)=>{
        var optionKH  = loadSelect(DSKH);
        // console.log(DSKH);
        $("#danhSachKH").append(optionKH);
    }).
    fail((loi)=>{
        console.log(loi)
    })

    //Load seclect khóa học
    function loadSelect(mangKH){
        var optionKH = "";
        for(var i=0;i<mangKH.length;i++){
            var khoahoc = mangKH[i];
            if(khoahoc.MaKhoaHoc != ""){
                optionKH += `
                <option value=${khoahoc.MaKhoaHoc}>${khoahoc.TenKhoaHoc}</option>
                `
            }
            
        }
        return optionKH;
    }

    //Hàm thêm khóa học cho học viên lên API
    $("#btnGhiDanh").click(function(){
        var taikhoan = $(this).attr("taikhoan");
        var makh = $("#danhSachKH").val();
        if (taikhoan != "" && makh != 0){
            svKhoaHoc.GhiDanhKH(taikhoan,makh).done(function(ketqua){
                if(ketqua){
                    swal("Thêm thành công!", "Click OK ! Để tiếp tục ghi danh khóa học cho học viên", "success")
                    LoadListDSKH(taikhoan)
                }
            }).fail(function(loi){
                console.log(loi);
            })
        }
    })

    //Hàm Phân Trang
    function PhanTrang(MangNguoiDungHV) {
        $('#pagination-container').pagination({
            dataSource: MangNguoiDungHV,
            pageSize: 10,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                // template method of yourself
                var html = simpleTemplating(data);
                $('#tbodyNDHV').html(html);
            }
        });

        function simpleTemplating(data) {
            html = "";
            for (var i = 0; i < data.length; i++) {
                var nguoiDung = data[i];
                html += `
                <tr>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td class="tdHoTen">${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td>  
                    <td>${nguoiDung.TenLoaiNguoiDung}</td>
                    <td style="padding-left:0;padding-right:0">
                        <button taikhoan="${nguoiDung.TaiKhoan}"  class="btnGD btn btn-danger"><i class="fa fa-plus-square"></i></button> 
                    </td>  
                </tr>
            `
            }
            return html;
        }

    }

    function LoadListDSKH(taikhoan){
        var loadListDSKH = "";
        svKhoaHoc.ListKHHV(taikhoan)
        .done(function(ketqua){
            var DSKHGD = new DanhSachKhoaHoc();
            DSKHGD.MangKH = ketqua;
            if(ketqua == "" || ketqua == "Did not find the course"){
                loadListDSKH = `<li class="list-item" style="font-size: 20px;
                list-style: none;"><i class="fa fa-minus mr-2" style="color:#1641B5"></i><span style="font-size: 20px;color:brown">Học viên chưa đăng ký khóa học nào cả</span></li>`;
            }else {
                for(var i=0 ; i<DSKHGD.MangKH.length; i++){
                    var khoahoc = DSKHGD.MangKH[i];
                    loadListDSKH += `<li class="list-group-item"><i class="fa fa-minus mr-2" style="color:#1641B5"></i>  ${khoahoc.TenKhoaHoc}</li>`
                }
            }
            $("#listKhoaHoc").html(loadListDSKH);
        }).fail(function(loi){
            console.log(loi)
        })
    }
 })