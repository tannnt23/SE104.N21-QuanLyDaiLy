import { useState, } from 'react';
import { useQuery} from '@apollo/client';
import { queryEveryDaily, queryEveryMathang, queryDvtById } from '../../graphql/queries';


const PhieuXuatHang = () => {
    const [rows, setRows] = useState([{ id: 1, values: ['', '', '', '', ''] }]);
    const [selectedDaily, setSelectedDaily] = useState('');
    const [selectedMathang, setSelectedMathang] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState([]);
    const [selectedDVT, setSelectedDVT] = useState([]);
    const { loading: dailyLoading, error: dailyError, data: dailyData } = useQuery(queryEveryDaily);
    const { loading: mathangLoading, error: mathangError, data: mathangData } = useQuery(queryEveryMathang);
    console.log(rows   )

    // useEffect(() => {
    //     if (dailyData && dailyData.everyDaily.length > 0) {
    //         setSelectedDaily(dailyData.everyDaily[0].TenDaiLy);
    //     }
    // }, [dailyData]);

    if (dailyLoading) {
        return <div>Loading...</div>;
    }

    if (dailyError) {
        return <div>Error fetching dailyData</div>;
    }
    if (mathangLoading) {
        return <div>Loading...</div>;
    }

    if (mathangError) {
        return <div>Error fetching mathangData</div>;
    }

    //ten dai ly
    const handleSelectionChange = (event) => {
        setSelectedDaily(event.target.value);
    };


    //ten mat hang
    const handleSelection = (e) => {
        const selectedValue = e.target.value;
        setSelectedMathang([...selectedMathang, selectedValue]);
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

        // Update the selectedMathang state if inputIndex is 0 (Mặt hàng column)
        if (inputIndex === 0) {
            setSelectedMathang((prevSelectedMathang) => {
                const updatedSelectedMathang = [...prevSelectedMathang];
                updatedSelectedMathang[rowIndex] = value;
                return updatedSelectedMathang;
            });
        }

        // Calculate the value and update the calculatedValues state
        const column2Value = parseFloat(updatedRows[rowIndex].values[2]);
        const column3Value = parseFloat(updatedRows[rowIndex].values[3]);

        let result = '';

        if (inputIndex === 0) {
            const selectedMathang = mathangData.everyMathang.find((mathang) => mathang.TenMatHang === value);
            result = selectedMathang ? selectedMathang.DonGia : '';
        } else {
            result = isNaN(column2Value) || isNaN(column3Value) ? '' : column2Value * column3Value;
        }

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
                    {dailyData.everyDaily.map((daily) => (
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
                                    {inputIndex === 0 ? (
                                        <select onChange={handleSelection}>
                                            {mathangData.everyMathang.map((mathang) => (
                                                <option key={mathang.MaMatHang} value={mathang.TenMatHang}>
                                                    {mathang.TenMatHang}
                                                </option>
                                            ))}
                                        </select>
                                        // <select name="" id="">
                                        //     <option value="">1</option>
                                        //     <option value="">1</option>
                                        //     <option value="">1</option>
                                        // </select>
                                    ) : inputIndex === 1 ? (
                                        <input
                                            className="border border-gray-400 mr-2 p-2 font-semibold text-center pointer-events-none"
                                            value={selectedMathang[inputIndex]}
                                        />
                                    ) :
                                        inputIndex === 4 ? (
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
<<<<<<< HEAD
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                                    onClick={() => handleRemoveRow(row.id)}
                                >
                                    Xoá
=======
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2"
                                    onClick={() => handleRemoveRow(row.id)}
                                >
                                    Remove
>>>>>>> aaf2509a388d32c5da317f36a47cf668671be88d
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-4"
                onClick={handleAddRow}
            >
                Thêm mặt hàng
            </button>
        </div>
    );
};

export default PhieuXuatHang;
