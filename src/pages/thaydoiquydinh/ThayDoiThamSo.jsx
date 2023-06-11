import BackButton from "../../component/button/backbutton/BackButton";
import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client'
import { queryThamSo } from "../../graphql/queries";
import { updateThamsoMutation } from "../../graphql/mutations";

function ThayDoiThamSo() {
    const { loading, error, data, refetch } = useQuery(queryThamSo);
    const [doUpdateThamSo, { loading: updateLoading, error: updateError }] =
        useMutation(updateThamsoMutation);
    const [maxAgents, setMaxAgents] = useState('');
    const [allowOverdue, setAllowOverdue] = useState('true');
    const [unitPrice, setUnitPrice] = useState('');

    console.log(data);
    const thamSo = data.thamso

    const handleSubmit = (e) => {
        e.preventDefault();

        // Xử lý logic khi submit form
        console.log('Max Agents:', maxAgents);
        console.log('Allow Overdue:', allowOverdue);
        console.log('Unit Price:', unitPrice);

        // Reset giá trị của các input sau khi submit
        setMaxAgents('');
        setAllowOverdue('true');
        setUnitPrice('');
    };



    if (loading && updateLoading) return 'Loading...';

    if (error && updateError) return `Error! ${error.message} || ${updateError.message}`;

    return (
        <div>
            {/* Heading */}
            <div className="flex justify-center items-center mb-5">
                <BackButton className="mr-4" />
                <h2 className="mb-4 text-4xl font-bold text-center w-full">Danh sách tham số</h2>
            </div>
            {/* Form */}
            <div className="w-1/2 ml-0">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Số lượng loại đại lý tối đa:</label>
                        <input
                            type="number"
                            id="max-agents"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.SoLuongLoaiDaiLy}
                            onChange={(e) => setMaxAgents(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Số đại lý tối đa trong một quận:</label>
                        <input
                            type="number"
                            id="max-agents"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.SoDaiLyToiDaTrongQuan}
                            onChange={(e) => setMaxAgents(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Số lượng mặt hàng:</label>
                        <input
                            type="number"
                            id="max-agents"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.SoLuongMatHang}
                            onChange={(e) => setMaxAgents(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Số lượng đơn vị tính:</label>
                        <input
                            type="number"
                            id="max-agents"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.SoLuongDVT}
                            onChange={(e) => setMaxAgents(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Cho phép thu vượt tiền nợ:</label>
                        <select
                            id="allow-overdue"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.SoTienThuKhongVuotQuaSoTienDaiLyDangNo ? "True" : "False"}
                            onChange={(e) => setAllowOverdue(e.target.value)}
                        >
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Tỷ lệ đơn giá xuất:</label>
                        <input
                            type="number"
                            id="unit-price"
                            className="border border-gray-300 p-2 flex-grow"
                            value={thamSo.TyLeDonGiaXuat}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ThayDoiThamSo