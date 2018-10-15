function DanhSachNguoiDung(){
    this.MangDSND = [];
    this.LayThongTinNguoiDung = (tkNguoiDung)=>{
        var mangND = this.MangDSND;
        for(var i=0; i<mangND.length; i++){
            if(mangND[i].TaiKhoan == tkNguoiDung){
                return mangND[i];
            }
        }
    }
}