function ServiceKhoaHoc (){

    this.LayDanhSachKhoaHoc = function (){
        var apiURL = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
        return $.ajax({
            type : "GET",
            url : apiURL
        })
    }

    this.ThemKhoaHoc = function (khoahoc){
        var apiURL = "http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc";
        return $.ajax({
            url : apiURL,
            type : "POST",
            dataType: "json",
            data : khoahoc
        })
    }
    this.SuaKhoaHoc = function (maKhoaHoc,tenKhoaHoc,moTa,hinhAnh,luotXem,nguoiTao){
        var khoahoc = JSON.stringify({MaKhoaHoc:maKhoaHoc,TenKhoaHOc:tenKhoaHoc,MoTa:moTa,HinhAnh:hinhAnh,LuotXem:luotXem,NguoiTao:nguoiTao})
        var apiURL = "http://sv.myclass.vn/api/Quanlytrungtam/CapNhatKhoaHoc"
        return $.ajax({
            url:apiURL,
            type:"PUT",
            contentType : "application/json",
            dataType : "json",
            data : khoahoc
        })
    }
    this.XoaKhoaHoc = function (makh){
        var apiURL = `http://sv.myclass.vn/api/Quanlytrungtam/XoaKhoaHoc/${makh}`
        return $.ajax({
            url:apiURL,
            type:"DELETE"
        })
    }
    this.ListKHHV = function (taikhoan){
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=${taikhoan}`
        return $.ajax({
            url : apiURL,
            type : "GET"
        })
    }
    this.GhiDanhKH = function (taikhoan,makh) {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc`;
        var model = JSON.stringify({MaKhoaHoc:makh,TaiKhoan:taikhoan});
        return $.ajax({
            url:apiURL,
            type:"POST",
            dataType : "json",
            contentType : "application/json",
            data:model
        })
        
    }
    this.ChiTietKhoaHoc = function(maKH) {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${maKH}`;
        return $.ajax({
            url : apiURL,
            type : "GET"
        })
    }
}