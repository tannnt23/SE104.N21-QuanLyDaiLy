import BackButton from "../../component/button/backbutton/BackButton";
import PhieuXuatHang from "../../component/form/PhieuXuatHang";

function LapPhieuXuatHang() {
    return (
        <div>
            <BackButton />
            <div className="flex flex justify-center">
                <h2 className="text-4xl font-bold">Phiếu xuất hàng</h2>
            </div>
            <div>
                <form className="p-4">
                    <div className="flex flex-col w-1/3">
                        <div className="">
                            <label htmlFor="combo-box" className="block mb-2">Tên đại lý</label>
                            <select id="combo-box" name="combo-box" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>

                        <div className="">
                            <label htmlFor="date-input" className="block mt-4 mb-2">Ngày lập phiếu</label>
                            <input type="date" id="date-input" name="date-input" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="w-2/3">
                        <PhieuXuatHang />
                    </div>



                    <div className="flex justify-end w-2/3">
                        <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LapPhieuXuatHang