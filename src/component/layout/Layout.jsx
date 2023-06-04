import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <div className="h-screen min-h-screen relative">
      <Header />
      {/* Content */}
      <div className="p-5 min-h-[calc(100vh-80px)]">
        <div>{children}</div>
      </div>
      {/* ---Content--- */}
    </div>
  );
};

export default Layout;
