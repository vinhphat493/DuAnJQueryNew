function ServiceNguoiDung(){
    this.LayDanhSachNguoiDung = ()=>{
        var apiURL = "http://sv.myclass.vn/api/quanlytrungtam/danhsachnguoidung";
        return $.ajax({
            type:'GET',
            url:apiURL,
            dataType:'json'
        });
    }
    this.ThemNguoiDung = (nguoiDung)=>{
        var apiURL = "http://sv.myclass.vn/api/quanlytrungtam/themnguoidung";
        return $.ajax({
            type:'POST',
            dataType:'json',
            data:nguoiDung,
            url:apiURL
        })
    }
    this.XoaNguoiDung = (tkNguoiDung)=>{
        var apiURL =`http://sv.myclass.vn/api/quanlytrungtam/xoanguoidung/${tkNguoiDung}`;
        return $.ajax({
            url:apiURL,
            type:"DELETE"
        })
    }
    this.LayThongTinNguoiDung=(tkNguoiDung)=>{
        var apiURL = `http://sv.myclass.vn/api/quanlytrungtam/thongtinnguoidung?taikhoan=${tkNguoiDung}`;
        return $.ajax({
            url:apiURL,
            type:'GET',
            dataType:'json'
        })
    }
    this.CapNhatThongTinNguoiDung=(nguoiDung)=>{
        var apiURL = "http://sv.myclass.vn/api/quanlytrungtam/capnhatthongtinnguoidung";
        return $.ajax({
            type:'PUT',
            data:nguoiDung,
            url:apiURL,
            dataType:"json"
        })
    }
}
