import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { queryEveryDaily } from "../../graphql/queries";
import Fuse from "fuse.js";


import Error from "../../component/pop_up/Error";
import BackButton from "../../component/button/backbutton/BackButton";

const TraCuuDaiLy = () => {
    const [searchTenDaiLy, setSearchTenDaiLy] = useState(""); //search by TenDaiLy
    const [searchQuan, setSearchQuan] = useState("");
    const [searchDienThoai, setSearchDienThoai] = useState("");
    const [searchDiaChi, setSearchDiaChi] = useState("");
    const [searchLoaiDaiLy, setSearchLoaiDaiLy] = useState("");
    const [searchNgayTiepNhan, setSearchNgayTiepNhan] = useState("");
    const [filteredDaily, setFilteredDaily] = useState([]);
    const { loading, error, data } = useQuery(queryEveryDaily);
    const [showError, setShowError] = useState(null);

    useEffect(() => {
        if (data) {
            const options = {
                keys: ['TenDaiLy', 'relatedQuan.TenQuan', 'DienThoai', 'DiaChi', 'relatedLoaidaily.TenLoaiDaiLy'],
            };

            const fuse = new Fuse(data.everyDaily, options);

            let filteredData = data.everyDaily;

            if (searchTenDaiLy) {
                const searchResults = fuse.search(searchTenDaiLy);
                filteredData = searchResults.map((result) => result.item);
            }

            if (searchQuan) {
                filteredData = filteredData.filter((daily) =>
                    daily.relatedQuan.TenQuan.toLowerCase().includes(searchQuan.toLowerCase())
                );
            }

            if (searchDienThoai) {
                filteredData = filteredData.filter((daily) =>
                    daily.DienThoai.includes(searchDienThoai)
                );
            }

            if (searchDiaChi) {
                filteredData = filteredData.filter((daily) =>
                    daily.DiaChi.toLowerCase().includes(searchDiaChi.toLowerCase())
                );
            }

            if (searchLoaiDaiLy) {
                filteredData = filteredData.filter((daily) =>
                    daily.relatedLoaidaily.TenLoaiDaiLy.toLowerCase().includes(searchLoaiDaiLy.toLowerCase())
                );
            }

            if (searchNgayTiepNhan) {
                filteredData = filteredData.filter((daily) =>
                    daily.NgayTiepNhan.includes(searchNgayTiepNhan)
                );
            }

            setFilteredDaily(filteredData);
        }
    }, [data, searchTenDaiLy, searchQuan, searchDienThoai, searchDiaChi, searchLoaiDaiLy, searchNgayTiepNhan]);

    if (loading) return <div>Loading...</div>;
    if (error) setShowError(error);

    const DailyTableRow = ({ daily, STT }) => (
        <tr className="border border-black">
            <td className="border border-black p-2">{STT}</td>
            <td className="border border-black p-2">{daily?.TenDaiLy}</td>
            <td className="border border-black p-2">{daily?.relatedLoaidaily.TenLoaiDaiLy}</td>
            <td className="border border-black p-2">{daily?.DiaChi}</td>
            <td className="border border-black p-2">{daily?.relatedQuan.TenQuan}</td>
            <td className="border border-black p-2">{daily?.TienNo}</td>
            <td className="border border-black p-2">{daily?.NgayTiepNhan}</td>
            <td className="border border-black p-2">{daily?.DienThoai}</td>
            <td className="border border-black p-2">{daily?.Email}</td>
        </tr>
    );

    return (
        <div>
            {showError && <Error error={showError} />}
            <div className="flex justify-center items-center mb-5">
                <BackButton className="mr-4" />
                <h2 className="ml-10 text-4xl font-bold text-left w-full">
                    Tra cứu đại lý
                </h2>
            </div>
            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2"
                type="text"
                placeholder="Nhập tên đại lý..."
                value={searchTenDaiLy}
                onChange={(e) => setSearchTenDaiLy(e.target.value)}
            />
            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2 mx-2"
                type="text"
                placeholder="Nhập tên quận..."
                value={searchQuan}
                onChange={(e) => setSearchQuan(e.target.value)}
            />

            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2 mx-2"
                type="text"
                placeholder="Nhập số điện thoại..."
                value={searchDienThoai}
                onChange={(e) => setSearchDienThoai(e.target.value)}
            />

            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2 mx-2"
                type="text"
                placeholder="Nhập địa chỉ..."
                value={searchDiaChi}
                onChange={(e) => setSearchDiaChi(e.target.value)}
            />

            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2 mx-2"
                type="text"
                placeholder="Nhập loại đại lý..."
                value={searchLoaiDaiLy}
                onChange={(e) => setSearchLoaiDaiLy(e.target.value)}
            />
            <input
                className="w-96 border border-gray-500 rounded-lg p-2 mb-2 mr-2"
                type="text"
                placeholder="Nhập ngày tiếp nhận..."
                value={searchNgayTiepNhan}
                onChange={(e) => setSearchNgayTiepNhan(e.target.value)}
            />
            <table className="w-2/3 border-collapse border border-black">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-black p-2">STT</th>
                        <th className="border border-black p-2">Tên đại lý</th>
                        <th className="border border-black p-2">Loại đại lý</th>
                        <th className="border border-black p-2">Địa chỉ</th>
                        <th className="border border-black p-2">Quận/Thành phố</th>
                        <th className="border border-black p-2">Tiền nợ</th>
                        <th className="border border-black p-2">Ngày tiếp nhận</th>
                        <th className="border border-black p-2">Số điện thoại</th>
                        <th className="border border-black p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDaily.map((daily, index) => (
                        <DailyTableRow key={index} daily={daily} STT={index + 1} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TraCuuDaiLy;
