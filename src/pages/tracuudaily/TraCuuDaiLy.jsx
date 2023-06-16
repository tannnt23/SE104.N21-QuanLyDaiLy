import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { queryEveryDaily } from "../../graphql/queries";

import Error from "../../component/pop_up/Error";
import BackButton from "../../component/button/backbutton/BackButton";

const TraCuuDaiLy = () => {
    const [searchQuery, setSearchQuery] = useState(""); //search by TenDaiLy
    const [filteredDaily, setFilteredDaily] = useState([]);
    const { loading, error, data } = useQuery(queryEveryDaily);
    const [showError, setShowError] = useState(null);

    useEffect(() => {
        if (data) {
            const filteredData = data.everyDaily.filter((daily) =>
                daily.TenDaiLy.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDaily(filteredData);
        }
    }, [data, searchQuery]);

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
