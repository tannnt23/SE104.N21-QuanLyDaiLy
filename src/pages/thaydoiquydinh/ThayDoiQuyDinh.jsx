import BackButton from "../../component/button/backbutton/BackButton";
import MenuItem from "../../component/menu/menuItem/MenuItem";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';

function ThayDoiQuyDinh() {
  const menuItemContents = [
    {
      id: 1,
      label: "Loại đại lý",
      icon: <ManageAccountsOutlinedIcon fontSize="large" />,
      link: "loai-dai-ly",
    },
    {
      id: 2,
      label: "Đơn vị tính",
      icon: <DynamicFeedOutlinedIcon fontSize="large" />,
      link: "don-vi-tinh",
    },
    {
      id: 3,
      label: "Tham số",
      icon: <DisplaySettingsOutlinedIcon fontSize="large" />,
      link: "tham-so",
    },
    {
      id: 4,
      label: "Mặt hàng",
      icon: <Inventory2OutlinedIcon fontSize="large" />,
      link: "mat-hang",
    },
    {
      id: 5,
      label: "Đại lý",
      icon: <StoreMallDirectoryOutlinedIcon fontSize="large" />,
      link: "dai-ly",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-center items-center mb-10 ">
        <BackButton className="mr-4" />
        <h2 className="text-4xl font-bold text-center w-full">
          Thay đổi
        </h2>
      </div>
      {/* Form */}
      <div>
        <div className=" grid grid-cols-2 gap-6 mx-10">
          {menuItemContents.map((menuItemContent) => (
            <MenuItem
              key={menuItemContent.id}
              label={menuItemContent.label}
              icon={menuItemContent.icon}
              link={menuItemContent.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThayDoiQuyDinh;
