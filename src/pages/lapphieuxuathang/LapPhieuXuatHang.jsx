// import PhieuXuatHang from "../../component/PhieuXuatHang/PhieuXuatHang"
import PhieuXuatHang from "../../component/PhieuXuatHang/PhieuXuatHang";
import BackButton from "../../component/button/backbutton/BackButton";

function LapPhieuXuatHang() {
  return (
    <div>
      {/* Heading */}
      <div className="flex justify-center items-center mb-5">
        <BackButton className="mr-4" />
        <h2 className="ml-10 text-4xl font-bold text-left w-full">
          Lập phiếu xuất hàng
        </h2>
      </div>
      <PhieuXuatHang />
    </div>
  );
}

export default LapPhieuXuatHang;
