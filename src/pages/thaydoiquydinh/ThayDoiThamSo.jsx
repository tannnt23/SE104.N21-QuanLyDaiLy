import BackButton from "../../component/button/backbutton/BackButton";
import React, {useState} from "react";

function ThayDoiThamSo() {
    const [maxAgents, setMaxAgents] = useState('');
    const [allowOverdue, setAllowOverdue] = useState('true');
    const [unitPrice, setUnitPrice] = useState('');

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
                        <label className="w-auto mr-3">Số đại lý tối đa trong một quận:</label>
                        <input
                            type="number"
                            id="max-agents"
                            className="border border-gray-300 p-2 flex-grow"
                            value={maxAgents}
                            onChange={(e) => setMaxAgents(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Cho phép thu vượt tiền nợ:</label>
                        <select
                            id="allow-overdue"
                            className="border border-gray-300 p-2 flex-grow"
                            value={allowOverdue}
                            onChange={(e) => setAllowOverdue(e.target.value)}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-auto mr-3">Tỷ lệ đơn giá xuất:</label>
                        <input
                            type="number"
                            id="unit-price"
                            className="border border-gray-300 p-2 flex-grow"
                            value={unitPrice}
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