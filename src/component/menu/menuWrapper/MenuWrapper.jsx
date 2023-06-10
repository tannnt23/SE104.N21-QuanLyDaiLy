import MenuItem from "../menuItem/MenuItem";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BarChartIcon from '@mui/icons-material/BarChart';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LapPhieuXuatHang from "../../../pages/lapphieuxuathang/LapPhieuXuatHang";

function MenuWrapper() {
  const menuItemContents = [
    {
      id: 1,
      label: "Đăng ký đại lý",
      icon: <AddCircleIcon fontSize="large" />,
      link: 'dang-ky-dai-ly',
    },
    {
      id: 2,
      label: "Nhập hàng vào kho",
      icon: <WarehouseIcon fontSize="large" />,
    },
    {
      id: 3,
      label: "Lập phiếu xuất hàng",
      icon: <FireTruckIcon fontSize="large" />,
      link: 'lap-phieu-xuat-hang'

    },
    {
      id: 4,
      label: "Lập phiếu thu tiền",
      icon: <ReceiptIcon fontSize="large" />,
      link: 'lap-phieu-thu-tien'
    },
    {
      id: 5,
      label: "Tra cứu đại lý",
      icon: <ManageSearchIcon fontSize="large" />,
      link: 'tra-cuu-dai-ly',
    },
    {
      id: 6,
      label: "Báo cáo công nợ",
      icon: <SummarizeIcon fontSize="large" />,
    },
    {
      id: 7,
      label: "Báo cáo doanh số",
      icon: <BarChartIcon fontSize="large" />,
    },
    {
      id: 8,
      label: "Thay đổi quy định",
      icon: <DisplaySettingsIcon fontSize="large" />,
    },

  ];

  return (
    <div className=" grid grid-cols-4 gap-6">
      {menuItemContents.map((menuItemContent) => (
        <MenuItem
          key={menuItemContent.id}
          label={menuItemContent.label}
          icon={menuItemContent.icon}
          link={menuItemContent.link}
        />
      ))}
    </div>
  );
}

export default MenuWrapper;
