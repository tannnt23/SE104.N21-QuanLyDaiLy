// import components
import Layout from "./component/layout/Layout";
// import pages
import Home from "./pages/home/Home";
import LapPhieuXuatHang from "./pages/lapphieuxuathang/LapPhieuXuatHang";
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
