import MenuItem from "../menuItem/MenuItem";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FireTruckIcon from '@mui/icons-material/FireTruck';

function MenuWrapper() {
  const menuItemContents = [
    {
      id: 1,
      label: "Đăng ký đại lý",
      icon: <AddCircleIcon fontSize="large"/>,
    },
    {
      id: 2,
      label: "Nhập hàng vào kho",
      icon: <WarehouseIcon fontSize="large"/>,
    },
    {
      id: 3,
      label: "Lập phiếu xuất hàng",
      content: "This is my first post!",
      icon: <FireTruckIcon fontSize="large"/>,
    },

  ];

  return (
    <div className=" grid grid-cols-3 gap-6">
      {menuItemContents.map((menuItemContent) => (
        <MenuItem key={menuItemContent.id} label={menuItemContent.label} icon={menuItemContent.icon} />
      ))}
    </div>
  );
}

export default MenuWrapper;
