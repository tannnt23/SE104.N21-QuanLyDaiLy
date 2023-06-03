const MenuItem = ({ label }) => {
  return (
    <div className="p-10 bg-[#F2B6A0] hover:bg-[#FFDEB4] text-[#4F200D]  rounded-md flex justify-center cursor-pointer transition ease-in-out duration-150">
      <p className="text-2xl font-semibold">{label}</p>
    </div>
  );
};

export default MenuItem;
