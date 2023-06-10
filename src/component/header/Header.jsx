import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex p-5 bg-blue-700 text-white">
      <div className="flex-1 flex">
        <Link to={'/'}>
          <h1 className="text-4xl font-bold ml-10 cursor-pointer">Quản lý đại lý</h1>
        </Link>

      </div>
      <div className="flex-1 flex items-center justify-center">
        {/* <ul className="flex space-x-5 justify-center text-xl font-semibold">
          <li>
            <button>item</button>
          </li>
          <li>
            <button>item</button>
          </li>
          <li>
            <button>item</button>
          </li>
        </ul> */}
      </div>
    </header>
  );
};

export default Header;
