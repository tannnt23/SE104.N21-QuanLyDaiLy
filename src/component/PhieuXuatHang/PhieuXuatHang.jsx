import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { queryEveryDaily } from '../../graphql/queries';

const PhieuXuatHang = () => {
    const [rows, setRows] = useState([{ id: 1, values: ['', '', '', '', ''] }]);
    const [selectedDaily, setSelectedDaily] = useState('');
    const [calculatedValues, setCalculatedValues] = useState([]);
    const { loading, error, data } = useQuery(queryEveryDaily);


    useEffect(() => {
        if (data && data.everyDaily.length > 0) {
            setSelectedDaily(data.everyDaily[0].TenDaiLy);
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    const handleSelectionChange = (event) => {
        setSelectedDaily(event.target.value);
    };

    const handleAddRow = () => {
        const newRow = { id: Date.now(), values: ['', '', '', '', ''] };
        setRows([...rows, newRow]);
    };

    const handleRemoveRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };

    const handleInputChange = (event, rowIndex, inputIndex) => {
        const { value } = event.target;

        // Update the value in the rows state
        const updatedRows = [...rows];
        updatedRows[rowIndex].values[inputIndex] = value;
        setRows(updatedRows);

        // Calculate the value and update the calculatedValues state
        const column2Value = parseFloat(updatedRows[rowIndex].values[2]);
        const column3Value = parseFloat(updatedRows[rowIndex].values[3]);
        const result = isNaN(column2Value) || isNaN(column3Value) ? '' : column2Value * column3Value;

        const updatedCalculatedValues = [...calculatedValues];
        updatedCalculatedValues[rowIndex] = result;
        setCalculatedValues(updatedCalculatedValues);
    };


    return (
        <div>
            <div className="mb-4">
                <label htmlFor="daily-selection" className="block mb-2 font-bold">
                    Tên đại lý
                </label>
                <select
                    id="daily-selection"
                    value={selectedDaily}
                    onChange={handleSelectionChange}
                    className="border rounded-md p-2 mb-4"
                >
                    {data.everyDaily.map((daily) => (
                        <option key={daily.MaDaiLy} value={daily.TenDaiLy}>
                            {daily.TenDaiLy}
                        </option>
                    ))}
                </select>
                <label htmlFor="daily-selection" className="block mb-2 font-bold">
                    Ngày lập phiếu
                </label>
                <input
                    type="date"
                    id="date-input"
                    className="border rounded-md p-2"
                    pattern="\d{2}-\d{2}-\d{4}"
                    placeholder="dd-mm-yyyy"
                />
            </div>

            <table className=''>
                <thead>
                    <tr>
                        <th>Mặt hàng</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row.id} className="">
                            {row.values.map((value, inputIndex) => (
                                <td key={inputIndex} className='p-2'>
                                    {inputIndex === 0 || inputIndex === 1 ? (
                                        <select
                                            // value={value.matHang}
                                            // onChange={(event) => handleInputChange(event, rowIndex, inputIndex)}
                                            className="border border-gray-400 mr-2 p-2"
                                        >
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                            <option value="Option 3">Option 3</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    ) : inputIndex === 4 ? (
                                        <input
                                            className="border border-gray-400 mr-2 p-2 bg-yellow-100 font-semibold text-center pointer-events-none"
                                            value={calculatedValues[rowIndex]}
                                        />
                                    ) :
                                        (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(event) => handleInputChange(event, rowIndex, inputIndex)}
                                                className="border border-gray-400 mr-2 p-2 "
                                            />
                                        )}
                                </td>
                            ))}
                            <td>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2"
                                    onClick={() => handleRemoveRow(row.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
                onClick={handleAddRow}
            >
                Add Row
            </button>
        </div>
    );
};

export default PhieuXuatHang;
