function DanhSachNguoiDung(){
    this.MangDSND = [];
    this.ThemNguoiDung= (nguoidung)=>{
        this.MangDSND.push(nguoidung)
    }
    this.LayThongTinNguoiDung = (tkNguoiDung)=>{
        var mangND = this.MangDSND;
        for(var i=0; i<mangND.length; i++){
            if(mangND[i].TaiKhoan == tkNguoiDung){
                return mangND[i];
            }
        }
    }
    this.TimNguoiDung = function(tukhoa){
        var cmSevice = new commonService();
        tukhoa = cmSevice.getSEOtitle(tukhoa);
        var danhsachNguoiDungTK = new DanhSachNguoiDung();
        for (var i=0;i<this.MangDSND.length;i++){
            var nguoidung = this.MangDSND[i];
            var hoten = cmSevice.getSEOtitle(nguoidung.HoTen);
            var taikhoan = cmSevice.getSEOtitle(nguoidung.TaiKhoan);
            if(hoten.search(tukhoa) != -1  ||taikhoan.search(tukhoa) != -1){
                danhsachNguoiDungTK.ThemNguoiDung(nguoidung);
            }
        }
        return danhsachNguoiDungTK;
    }
}