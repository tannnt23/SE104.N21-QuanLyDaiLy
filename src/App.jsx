// import components
import Layout from "./component/layout/Layout";
// import pages
import Home from "./pages/home/Home";
import BaoCaoCongNo from "./pages/baocaocongno/BaoCaoCongNo";
import BaoCaoDoanhThu from "./pages/baocaodoanhthu/BaoCaoDoanhThu";
import LapPhieuThuTien from "./pages/lapphieuthutien/LapPhieuThuTien";
import LapPhieuXuatHang from "./pages/lapphieuxuathang/LapPhieuXuatHang";
import DangKyDaiLy from "./pages/dangkydaily/DangKyDaiLy";
import TraCuuDaiLy from "./pages/tracuudaily/TraCuuDaiLy";
import ThayDoiQuyDinh from "./pages/thaydoiquydinh/ThayDoiQuyDinh";
import ThayDoiLoaiDaiLy from "./pages/thaydoiquydinh/ThayDoiLoaiDaiLy";
import ThayDoiDonVi from "./pages/thaydoiquydinh/ThayDoiDonVi";
import ThayDoiThamSo from "./pages/thaydoiquydinh/ThayDoiThamSo";
import ThayDoiMatHang from "./pages/thaydoiquydinh/ThayDoiMatHang";
import NotFoundPage from "./pages/404_not_found/NotFound";

// import packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <div className="App">
      <ConfirmProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lap-phieu-xuat-hang" element={<LapPhieuXuatHang />} />
              <Route path="/lap-phieu-thu-tien" element={<LapPhieuThuTien />} />
              <Route path="/bao-cao-cong-no" element={<BaoCaoCongNo />} />
              <Route path="/bao-cao-doanh-thu" element={<BaoCaoDoanhThu />} />
              <Route path="/dang-ky-dai-ly" element={<DangKyDaiLy />} />
              <Route path="/tra-cuu-dai-ly" element={<TraCuuDaiLy />} />
              <Route path="/thay-doi-quy-dinh" element={<ThayDoiQuyDinh />} />
              <Route path="/thay-doi-quy-dinh/loai-dai-ly" element={<ThayDoiLoaiDaiLy />} />
              <Route path="/thay-doi-quy-dinh/don-vi-tinh" element={<ThayDoiDonVi />} />
              <Route path="/thay-doi-quy-dinh/tham-so" element={<ThayDoiThamSo />} />
              <Route path="/thay-doi-quy-dinh/mat-hang" element={<ThayDoiMatHang />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ConfirmProvider>
    </div>
  );
}

export default App;
