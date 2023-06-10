import { useState } from 'react'

function InputTable2() {
    const fields = ['Mặt hàng', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền', '']
    const [rows, setRows] = useState([
        {
            rowId: 1,
            // each object in the array is a cell
            cells: [
                {
                    cellType: 'combo-box',
                    cellValues: ['option1', 'option2', 'option3'],
                },
                {
                    cellType: 'text',
                    cellValue: '',
                },
                {
                    cellType: 'text',
                    cellValue: '',
                },
                {
                    cellType: 'text',
                    cellValue: '',
                },
                {
                    cellType: 'text',
                    cellValue: '',
                },
            ]
        },
    ])
    const addRow = (e) => {
        e.preventDefault();
        setRows(
            [...rows, {
                rowId: rows.length + 1,
                cells: [
                    {
                        cellType: 'combo-box',
                        cellValues: ['option1', 'option2', 'option3'],
                    },
                    {
                        cellType: 'text',
                        cellValue: '',
                    },
                    {
                        cellType: 'text',
                        cellValue: '',
                    },
                    {
                        cellType: 'text',
                        cellValue: '',
                    },
                    {
                        cellType: 'text',
                        cellValue: '',
                    },
                ]

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
                    {/* iterate rows */}
                    {rows.map((row, rowIndex) => (
                        <tr className='' key={row.rowId}>
                            {
                                // iterate cells
                                row.cells.map((cell, cellIndex) => (
                                    <td className='' key={cellIndex}>
                                        {/* render element type based on condition */}
                                        {
                                            cell.cellType == 'combo-box' ?
                                                (
                                                    <select className=''>
                                                        {cell.cellValues.map((value, index) =>
                                                        (
                                                            <option key={index} value={value}>{value}</option>
                                                        ))}
                                                    </select>
                                                ) :
                                                (
                                                    <input type={cell.cellType} onChange={(e) => updateValue(e, rowIndex, cellIndex)} className='w-full border-solid border-gray-300 border-2 ' />
                                                )
                                        }
                                    </td>
                                ))
                            }
                            <td>
                                <button onClick={(e) => removeRow(rowIndex)} className='bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded'>Xóa</button>
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

export default InputTable2

{/* <input type={cell.cellType} onChange={(e) => updateValue(e, rowIndex, colIndex)} className='p-2 border-solid border-2 border-gray-300 rounded ' /> */ }