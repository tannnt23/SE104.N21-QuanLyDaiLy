import BackButton from "../../component/button/backbutton/BackButton";
import React, { useState } from "react";

function ThayDoiLoaiDaiLy() {

    const [agencies, setAgencies] = useState([
        { id: 1, name: 'Đại lý A', maxDebt: 1000000 },
        { id: 2, name: 'Đại lý B', maxDebt: 2000000 },
        { id: 3, name: 'Đại lý C', maxDebt: 1500000 },
    ]);

    const [editingAgencyId, setEditingAgencyId] = useState(null);

    const handleDelete = (id) => {
        setAgencies(agencies.filter((agency) => agency.id !== id));
    };

    const handleEdit = (id) => {
        setEditingAgencyId(id);
    };

    const handleSave = (id) => {
        setEditingAgencyId(null);
        // Lưu thông tin chỉnh sửa của đại lý
        console.log(`Save changes for agency with ID ${id}`);
    };

    const handleAdd = () => {
        const newAgencyId = agencies.length + 1;
        setAgencies([
            ...agencies,
            { id: newAgencyId, name: '', maxDebt: 0 }
        ]);
        setEditingAgencyId(newAgencyId);
    };

    return (
        <div>
            {/* Heading */}
            <div className="flex justify-center items-center mb-5">
                <BackButton className="mr-4" />
                <h2 className="mb-4 text-4xl font-bold text-center w-full">Danh sách loại đại lý</h2>
            </div>
            {/* Form */}
            <div>
                <div className="flex flex-col items-start">
                    <table className="w-1/2 mb-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Tên loại đại lý</th>
                                <th className="border px-4 py-2">Số nợ tối đa</th>
                                <th className="border px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agencies.map((agency) => (
                                <tr key={agency.id}>
                                    <td className="border px-4 py-2">
                                        {editingAgencyId === agency.id ? (
                                            <input
                                                type="text"
                                                value={agency.name}
                                                onChange={(e) =>
                                                    setAgencies((prevAgencies) =>
                                                        prevAgencies.map((prevAgency) =>
                                                            prevAgency.id === agency.id
                                                                ? { ...prevAgency, name: e.target.value }
                                                                : prevAgency
                                                        )
                                                    )
                                                }
                                                className="border border-gray-300 p-2"
                                            />
                                        ) : (
                                            agency.name
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editingAgencyId === agency.id ? (
                                            <input
                                                type="number"
                                                value={agency.maxDebt}
                                                onChange={(e) =>
                                                    setAgencies((prevAgencies) =>
                                                        prevAgencies.map((prevAgency) =>
                                                            prevAgency.id === agency.id
                                                                ? { ...prevAgency, maxDebt: parseInt(e.target.value) }
                                                                : prevAgency
                                                        )
                                                    )
                                                }
                                                className="border border-gray-300 p-2"
                                            />
                                        ) : (
                                            agency.maxDebt
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editingAgencyId === agency.id ? (
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleSave(agency.id)}
                                            >
                                                Lưu
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                    onClick={() => handleEdit(agency.id)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleDelete(agency.id)}
                                                >
                                                    Xóa
                                                </button>

                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAdd}
                        >
                            Thêm loại đại lý
                        </button>
                </div>
            </div>
        </div>
    )
}

export default ThayDoiLoaiDaiLy