// import components
import Layout from "./component/layout/Layout";
// import pages
import Home from "./pages/home/Home";
import BaoCaoCongNo from "./pages/baocaocongno/BaoCaoCongNo";
import LapPhieuThuTien from "./pages/lapphieuthutien/LapPhieuThuTien";
import LapPhieuXuatHang from "./pages/lapphieuxuathang/LapPhieuXuatHang";
import DangKyDaiLy from "./pages/dangkydaily/DangKyDaiLy";
import TraCuuDaiLy from "./pages/tracuudaily/TraCuuDaiLy";
// import packages
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lap-phieu-xuat-hang" element={<LapPhieuXuatHang />} />
            <Route path="/lap-phieu-thu-tien" element={<LapPhieuThuTien />} />
            <Route path="/bao-cao-cong-no" element={<BaoCaoCongNo />} />
            <Route path="/dang-ky-dai-ly" element={<DangKyDaiLy />} />
            <Route path="/tra-cuu-dai-ly" element={<TraCuuDaiLy />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
