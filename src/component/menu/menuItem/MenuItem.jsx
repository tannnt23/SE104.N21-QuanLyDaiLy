const MenuItem = ({ label }) => {
  return (
    <div className="p-10 bg-[#DDE6ED] rounded-md flex justify-center cursor-pointer hover:bg-blue-300 transition ease-in-out duration-150">
      <p className="text-2xl font-semibold">{label}</p>
    </div>
  );
};

export default MenuItem;
