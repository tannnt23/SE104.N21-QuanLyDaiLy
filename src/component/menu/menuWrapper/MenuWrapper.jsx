import MenuItem from "../menuItem/MenuItem";

function MenuWrapper() {
  return (
    <div className=" grid grid-cols-3 gap-6">
      <MenuItem label={"Tại cửa hàng"}/>
      <MenuItem label={"Bán hàng"}/>
      <MenuItem label={"Báo cáo"}/>
      <MenuItem label={"Thu chi"}/>
      <MenuItem label={"Khách hàng"}/>
      <MenuItem label={"Thiết lập"}/>
      
    </div>
  );
}

export default MenuWrapper;
