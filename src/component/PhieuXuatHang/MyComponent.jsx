import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queryMathangById,  queryEveryMathang} from '../../graphql/queries';

const Table = () => {
  const [rows, setRows] = useState([]);
  const [field1Values, setField1Values] = useState([2]);
  const [field2Values, setField2Values] = useState([]); //don vi tinh
  console.log("Ma mat hang current:", field1Values)

  const { loading: loadingMatHang, error: errorMatHang, data:dataMatHang } = useQuery(queryEveryMathang)
  const { loading: loadingMatHangByID, error: errorMatHangByID, data:dataMatHangByID } = useQuery(queryMathangById, {
    // variables: {MaMatHang: field1Values}
  })

  // if(dataMatHangByID){
  //   console.log(dataMatHangByID.mathang)
  // }

  let allMatHang = []
  if(dataMatHang && dataMatHang.everyMathang){
    allMatHang = dataMatHang.everyMathang
  }
  
 

  useEffect(() => {
    addRow();
  }, []);

  const addRow = () => {
    setRows([...rows, { field1: '', field2: '', field3: '', field4: '', field5: '' }]);
    setField1Values([...field1Values, '']);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedField1Values = [...field1Values];
    updatedField1Values.splice(index, 1);
    setField1Values(updatedField1Values);
  };

  const updateFieldValue = (index, field, value, data) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    if (field === 'field1') {
      const updatedField1Values = [...field1Values];
      const updatedField2Values = [...field2Values];
      updatedField1Values[index] = value;
      updatedField2Values[index] = data;
      setField1Values(updatedField1Values);
      setField2Values(updatedField2Values);
    }
  };

  return (
    <div>
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border">Field 1</th>
            <th className="border">Field 2</th>
            <th className="border">Field 3</th>
            <th className="border">Field 4</th>
            <th className="border">Field 5</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border">
                <select
                  value={row.field1}
                  onChange={(e) => updateFieldValue(index, 'field1', e.target.value)}
                  className="w-full"
                >
                  <option value="">Select</option>
                  {
                    allMatHang.map((matHang, index)=> 
                      (
                        <option key={matHang.MaMatHang} value={matHang.MaMatHang} data={matHang.relatedDvt.TenDVT}>{matHang.TenMatHang}</option>
                      )
                    )
                  }
                </select>
              </td>
              <td className="border">
                <input
                  type="text"
                  value={row.field2}
                  onChange={(e) => updateFieldValue(index, 'field2', e.target.value)}
                  className="w-full"
                  readOnly
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  value={row.field3}
                  onChange={(e) => updateFieldValue(index, 'field3', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  value={row.field4}
                  onChange={(e) => updateFieldValue(index, 'field4', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  value={row.field5}
                  onChange={(e) => updateFieldValue(index, 'field5', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeRow(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={addRow}>
        Add Row
      </button>

      <div className="mt-4">
        <h2>Field 1 Values:</h2>
        <ul>
          {field1Values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <h2>Field 2 Values:</h2>
        <ul>
          {field2Values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
