import { gql } from '@apollo/client'

const queryThamSo = gql`
  {
    thamso {
      SoTienThuKhongVuotQuaSoTienDaiLyDangNo
      SoLuongMatHang
      SoLuongLoaiDaiLy
      SoLuongDVT
      SoDaiLyToiDaTrongQuan
      MaThamSo
      TyLeDonGiaXuat
    }
  }
`

const queryEveryDaily = gql`
  {
    everyDaily {
      MaDaiLy
      TenDaiLy
      DienThoai
      DiaChi
      NgayTiepNhan
      TienNo
      Email
      MaQuan
      MaLoaiDaiLy
      relatedLoaidaily {
        TenLoaiDaiLy
      }
      relatedQuan {
        TenQuan
      }
    }
  }
`

const queryDailyById = gql`
  query ($MaDaiLy: ID!) {
    daily(MaDaiLy: $MaDaiLy) {
      MaDaiLy
      TenDaiLy
      DienThoai
      DiaChi
      NgayTiepNhan
      TienNo
      Email
      MaQuan
      MaLoaiDaiLy
    }
  }
`

const queryEveryQuan = gql`
  {
    everyQuan {
      MaQuan
      TenQuan
    }
  }
`

const queryQuanById = gql`
  query ($MaQuan: ID!) {
    quan(MaQuan: $MaQuan) {
      MaQuan
      TenQuan
    }
  }
`

const queryEveryLoaidaily = gql`
  {
    everyLoaidaily {
      MaLoaiDaiLy
      TenLoaiDaiLy
      SoNoToiDa
    }
  }
`

const queryLoaidailyById = gql`
  query ($MaLoaiDaiLy: ID!) {
    loaidaily(MaLoaiDaiLy: $MaLoaiDaiLy) {
      MaLoaiDaiLy
      TenLoaiDaiLy
      SoNoToiDa
    }
  }
`

const queryEveryDvt = gql`
  {
    everyDvt {
      MaDVT
      TenDVT
    }
  }
`

const queryDvtById = gql`
  query ($MaDVT: ID!) {
    dvt(MaDVT: $MaDVT) {
      MaDVT
      TenDVT
    }
  }
`

const queryEveryPhieunhaphang = gql`
  {
    everyPhieunhaphang {
      MaPhieuNhap
      SoLuong
      MaMatHang
    }
  }
`

const queryPhieunhaphangById = gql`
  query ($MaPhieuNhap: ID!) {
    phieunhaphang(MaPhieuNhap: $MaPhieuNhap) {
      MaPhieuNhap
      SoLuong
      MaMatHang
    }
  }
`

const queryEveryMathang = gql`
  {
    everyMathang {
      DonGiaNhap
      MaDVT
      MaMatHang
      SoLuongTon
      TenMatHang
      relatedDvt {
        TenDVT
      }
    }
  }
`

const queryMathangById = gql`
  query ($MaMatHang: ID!) {
    mathang(MaMatHang: $MaMatHang) {
      MaMatHang
      TenMatHang
      SoLuongTon
      DonGiaNhap
      MaDVT
      relatedDvt {
        TenDVT
      }
    }
  }
`
const queryMatHangByIdArr = gql`
  query MathangbyarrofId($maMatHangArr: [ID!]!) {
    everyMatHangByArrOfMaMatHang(MaMatHangArr: $maMatHangArr) {
      MaMatHang
      MaDVT
      DonGiaNhap
      SoLuongTon
      TenMatHang
      relatedDvt {
        MaDVT
        TenDVT
      }
    }
  }
`

const queryEveryPhieuxuathang = gql`
  {
    everyPhieuxuathang {
      MaPhieuXuat
      NgayLapPhieu
      TongTien
      MaDaiLy
    }
  }
`

const queryPhieuxuathangById = gql`
  query ($MaPhieuXuat: ID!) {
    phieuxuathang(MaPhieuXuat: $MaPhieuXuat) {
      MaPhieuXuat
      NgayLapPhieu
      TongTien
      MaDaiLy
    }
  }
`

const queryEveryCt_phieuxuathang = gql`
  {
    everyCt_phieuxuathang {
      MaCT_PXH
      MaPhieuXuat
      MaMatHang
    }
  }
`

const queryCt_phieuxuathangById = gql`
  query ($MaCT_PXH: ID!) {
    ct_phieuxuathang(MaCT_PXH: $MaCT_PXH) {
      MaCT_PXH
      MaPhieuXuat
      MaMatHang
    }
  }
`

const queryEveryBaocaodoanhso = gql`
  {
    everyBaocaodoanhso {
      MaBaoCaoDoanhSo
      Thang
    }
  }
`

const queryBaocaodoanhsoById = gql`
  query ($MaBaoCaoDoanhSo: ID!) {
    baocaodoanhso(MaBaoCaoDoanhSo: $MaBaoCaoDoanhSo) {
      MaBaoCaoDoanhSo
      Thang
    }
  }
`

const queryEveryCt_bcds = gql`
  {
    everyCt_bcds {
      MaCT_BCDS
      MaBaoCaoDoanhSo
      MaDaiLy
      SoPhieuXuat
      TongTriGia
      Tyle
    }
  }
`

const queryCt_bcdsById = gql`
  query ($MaCT_BCDS: ID!) {
    ct_bcds(MaCT_BCDS: $MaCT_BCDS) {
      MaCT_BCDS
      MaBaoCaoDoanhSo
      MaDaiLy
      SoPhieuXuat
      TongTriGia
      Tyle
    }
  }
`

const queryEveryPhieuthutien = gql`
  {
    everyPhieuthutien {
      MaPhieuThuTien
      MaDaiLy
      NgayThuTien
      SoTienThu
    }
  }
`

const queryPhieuthutienById = gql`
  query ($MaPhieuThuTien: ID!) {
    phieuthutien(MaPhieuThuTien: $MaPhieuThuTien) {
      MaPhieuThuTien
      MaDaiLy
      NgayThuTien
      SoTienThu
    }
  }
`

const queryEveryBaocaocongno = gql`
  {
    everyBaocaocongno {
      MaBaoCaoCongNo
      Thang
    }
  }
`

const queryBaocaocongnoById = gql`
  query ($MaBaoCaoCongNo: ID!) {
    baocaocongno(MaBaoCaoCongNo: $MaBaoCaoCongNo) {
      MaBaoCaoCongNo
      Thang
    }
  }
`

const queryEveryCt_bccn = gql`
  {
    everyCt_bccn {
      MaCT_BCCN
      MaBaoCaoCongNo
      MaDaiLy
      NoDau
      PhatSinh
      NoCuoi
    }
  }
`

const queryCt_bccnById = gql`
  query ($MaCT_BCCN: ID!) {
    ct_bccn(MaCT_BCCN: $MaCT_BCCN) {
      MaCT_BCCN
      MaBaoCaoCongNo
      MaDaiLy
      NoDau
      PhatSinh
      NoCuoi
    }
  }
`

const queryCt_bccnByTenDLAndThang = gql`
  query Ct_bccnByTenDLAndThang($tenDaiLy: String!, $thang: String!) {
    ct_bccnByTenDLAndThang(TenDaiLy: $tenDaiLy, Thang: $thang) {
      NoCuoi
      NoDau
      PhatSinh
      relatedDaily {
        TenDaiLy
        MaDaiLy
      }
    }
  }
`


const queryCt_bcdsByTenDLAndThang = gql`
  query Ct_bcdsByTenDLAndThang($tenDaiLy: String!, $thang: String!) {
    ct_bcdsByTenDLAndThang(TenDaiLy: $tenDaiLy, Thang: $thang) {
      MaBaoCaoDoanhSo
      MaCT_BCDS
      MaDaiLy
      SoPhieuXuat
      TyLe
      TongTriGia
      relatedDaily {
        TenDaiLy
      }
    }
  }
`

const queryEveryCT_BCDSByMaBCDS = gql`
query EveryCT_BCDSByMaBCDS($maBaoCaoDoanhSo: ID!) {
  everyCT_BCDSByMaBCDS(MaBaoCaoDoanhSo: $maBaoCaoDoanhSo) {
    MaCT_BCDS
    MaBaoCaoDoanhSo
    MaDaiLy
    SoPhieuXuat
    TongTriGia
    TyLe
    relatedBaocaodoanhso {
      Thang
    }
    relatedDaily {
      TenDaiLy
    }
  }
}
`
const queryEveryCT_BCCNByMaBCCN = gql`
query Query($maBaoCaoCongNo: ID!) {
  everyCT_BCCNByMaBCCN(MaBaoCaoCongNo: $maBaoCaoCongNo) {
    MaCT_BCCN
    MaBaoCaoCongNo
    MaDaiLy
    relatedDaily {
      TenDaiLy
    }
    NoDau
    PhatSinh
    NoCuoi
  }
}
`




export {
  queryEveryDaily, queryDailyById, queryEveryQuan, queryQuanById, queryEveryLoaidaily,
  queryLoaidailyById, queryEveryDvt, queryDvtById, queryEveryPhieunhaphang,
  queryPhieunhaphangById, queryEveryMathang,
  queryMathangById, queryEveryPhieuxuathang, queryPhieuxuathangById,
  queryEveryCt_phieuxuathang, queryCt_phieuxuathangById,
  queryEveryBaocaodoanhso, queryBaocaodoanhsoById, queryEveryCt_bcds,
  queryCt_bcdsById, queryEveryPhieuthutien, queryPhieuthutienById, queryEveryBaocaocongno,
  queryBaocaocongnoById, queryEveryCt_bccn, queryCt_bccnById, queryThamSo, queryMatHangByIdArr,
  queryCt_bccnByTenDLAndThang, queryCt_bcdsByTenDLAndThang, queryEveryCT_BCDSByMaBCDS, queryEveryCT_BCCNByMaBCCN
};
