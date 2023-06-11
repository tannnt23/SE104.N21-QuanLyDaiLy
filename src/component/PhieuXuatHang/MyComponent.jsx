import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queryEveryMathang, queryMatHangByIdArr } from '../../graphql/queries';

const Table = () => {
  const [rows, setRows] = useState([]);
  const [field1Values, setField1Values] = useState(['1']);
  const [field2Values, setField2Values] = useState([]); //don vi tinh


  const { loading: loadingMatHang, error: errorMatHang, data: dataMatHang } = useQuery(queryEveryMathang)
  let allMatHang = []
  if (dataMatHang && dataMatHang.everyMathang) {
    allMatHang = dataMatHang.everyMathang
  }
  // console.log(typeof field1Values[0])

  const { loading: loadingMatHangByID, error: errorMatHangByID, data: dataMatHangByID } = useQuery(queryMatHangByIdArr, {
    variables: { maMatHangArr: field1Values }
  })
  let allCurrentMatHang = []
  if (dataMatHangByID && dataMatHangByID.everyMatHangByArrOfMaMatHang) {
    allCurrentMatHang = dataMatHangByID.everyMatHangByArrOfMaMatHang
  }
  // console.log(typeof allCurrentMatHang[0])
  

  useEffect(() => {
    addRow();
  }, []);

  const addRow = () => {
    setRows([...rows, { field1: '', field2: '', field3: '', field4: '', field5: '' }]);
    setField1Values([...field1Values, '1']);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedField1Values = [...field1Values];
    updatedField1Values.splice(index, 1);
    setField1Values(updatedField1Values);
  };

  const updateFieldValue = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    if (field === 'field1') {
      const updatedField1Values = [...field1Values];
      updatedField1Values[index] = value;
      setField1Values(updatedField1Values);


    }
  };

  return (
    <div>
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border">Mặt hàng</th>
            <th className="border">Đơn vị tính</th>
            <th className="border">Số lượng</th>
            <th className="border">Đơn giá</th>
            <th className="border">Thành tiền</th>
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
                    allMatHang.map((matHang, index) =>
                    (
                      <option key={matHang.MaMatHang} value={matHang.MaMatHang}>{matHang.TenMatHang}</option>
                    )
                    )
                  }
                </select>
              </td>
              <td className="border">
                <input
                  type="text"
                  value={(allCurrentMatHang[index] !== undefined) ? allCurrentMatHang[index].relatedDvt.TenDVT : 'Loading...'}
                  // onChange={(e) => updateFieldValue(index, 'field2', e.target.value)}
                  className="w-full p-2"
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
