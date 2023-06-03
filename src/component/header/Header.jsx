const Header = () => {
  return (
    <header className="flex w-screen p-5 bg-[#27374D] text-white">
      <div className="flex-1 flex">
        <h1 className="text-4xl font-bold cursor-pointer">Quản lý đại lý</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ul className="flex space-x-5 justify-center text-xl font-semibold">
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>About</button>
          </li>
          <li>
            <button>Item 1</button>
          </li>
          <li>
            <button>Item 2</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
