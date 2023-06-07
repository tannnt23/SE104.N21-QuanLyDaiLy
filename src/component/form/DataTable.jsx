import { useState } from 'react';

const DataTable = () => {
    const [rows, setRows] = useState([]);

    const fields = ['Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5'];

    const addRow = (e) => {
        e.preventDefault();
        setRows([...rows, Array(fields.length).fill('')]);
    };

    const removeRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const updateCellValue = (rowIndex, fieldIndex, value) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldIndex] = value;
        setRows(updatedRows);
    };

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        {fields.map((field, index) => (
                            <th key={index} className="py-2 px-4 text-left">{field}</th>
                        ))}
                        <th className="py-2 px-4"></th> {/* Empty column for remove button */}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cellValue, fieldIndex) => (
                                <td key={fieldIndex} className="py-2 px-4">
                                    <input
                                        type="text"
                                        value={cellValue}
                                        onChange={(e) => updateCellValue(rowIndex, fieldIndex, e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </td>
                            ))}
                            <td>
                                <button
                                    onClick={() => removeRow(rowIndex)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={addRow}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
                Add Row
            </button>
        </div>
    );
};

export default DataTable;
