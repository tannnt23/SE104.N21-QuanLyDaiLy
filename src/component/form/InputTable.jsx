import { useState } from 'react'

function InputTable() {
    const fields = ['Mặt hàng', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền', '']
    const [rows, setRows] = useState(
        [
            {
                rowID: 1,
                cells: Array(fields.length - 1).fill(''),
            }
        ],
    )
    const addRow = (e) => {
        e.preventDefault();
        setRows(
            [...rows, {
                rowID: rows.length + 1,
                cells: Array(fields.length - 1).fill(''),
            }]
        )
    }
    const removeRow = (rowIndex) => {
        const updatedRows = [...rows];
        updatedRows.splice(rowIndex, 1);
        setRows(updatedRows);
    }
    const updateValue = (e, rowIndex, colIndex) => {
        const { value } = e.target;
        const updatedRow = [...rows];
        updatedRow[rowIndex][colIndex] = value;
        setRows(updatedRow);
    }
    return (
        <div className=''>
            <table className='w-full'>
                <thead className=''>
                    <tr className='border-solid border-2 border-black'>
                        {fields.map((field, index) => (
                            <th className=' border-solid border-2 border-black ' key={index}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className=''>
                    {rows.map((row, rowIndex) => (
                        <tr className='' key={row.rowID}>
                            {
                                row.cells.map((cell, colIndex) => (
                                    <td className='py-2 ' key={colIndex}>
                                        <input onChange={(e) => updateValue(e, rowIndex, colIndex)} className='p-2 border-solid border-2 border-gray-300 rounded ' />
                                    </td>
                                ))
                            }
                            <td>
                                <button onClick={(rowIndex) => removeRow(rowIndex)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow} className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Thêm sản phẩm
            </button>

        </div>
    )
}

export default InputTable