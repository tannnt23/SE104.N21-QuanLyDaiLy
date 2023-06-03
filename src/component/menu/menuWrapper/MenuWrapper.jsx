import MenuItem from "../menuItem/MenuItem";

function MenuWrapper() {
  return (
    <div className=" grid grid-cols-3 gap-4">
      <MenuItem label={"Tại cửa hàng"}/>
      <MenuItem label={"Bán hàng"}/>
      <MenuItem label={"Báo cáo"}/>
      <MenuItem label={"Thu chi"}/>
      
    </div>
  );
}

export default MenuWrapper;
