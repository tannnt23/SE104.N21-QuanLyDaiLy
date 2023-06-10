import { Link } from "react-router-dom";

const MenuItem = ({ label, icon, link }) => {
  return (
    <div className="p-10 rounded-md flex flex-col space-y-2 justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-105 hover:shadow-[0_3px_10px_rgb(0,0,0,0.4)] cursor-pointer transition ease-in-out duration-150">
      <Link to={link}>
        <div className="flex justify-center">{icon}</div>
        <p className="font-semibold flex justify-center">{label}</p>
      </Link>

    </div>
  );
};

export default MenuItem;
