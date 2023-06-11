import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { queryEveryMathang, queryMatHangByIdArr } from '../../graphql/queries';
import { addPhieuxuathangMutation } from '../../graphql/mutations';

const Table = ({ daily }) => {

  // Define the mutation
  const [addPhieuxuathang] = useMutation(addPhieuxuathangMutation);

  // Function to handle form submission
  const handleSubmit = async () => {
    // Extract the values from the form
    const TongTien = totalThanhTien;
    const MaDaiLy = daily;
    console.log(typeof TongTien)

    try {
      // Perform the mutation
      const { data } = await addPhieuxuathang({
        variables: { TongTien, MaDaiLy },
      });
      console.log(data); 

    } catch (error) {
      console.log(error);
    }
  };


  const [rows, setRows] = useState([]);
  const [field1Values, setField1Values] = useState(['1']);
  const [currentMatHangMap, setCurrentMatHangMap] = useState({});
  const [donGiaNhapMap, setDonGiaNhapMap] = useState({});
  const [field3Values, setField3Values] = useState([]);
  const [thanhTienValues, setThanhTienValues] = useState([]);
  const [totalThanhTien, setTotalThanhTien] = useState(0); // State variable for the sum
  const [amountPaid, setAmountPaid] = useState(0); // State variable for the amount paid by the buyer

  const { loading: loadingMatHang, error: errorMatHang, data: dataMatHang } = useQuery(queryEveryMathang);
  let allMatHang = [];
  if (dataMatHang && dataMatHang.everyMathang) {
    allMatHang = dataMatHang.everyMathang;
  }

  useEffect(() => {
    addRow();
  }, []);

  useEffect(() => {
    // Recalculate the sum whenever "thanhTienValues" changes
    const sum = thanhTienValues.reduce((acc, value) => acc + parseFloat(value || 0), 0);
    setTotalThanhTien(sum);
  }, [thanhTienValues]);

  // Calculate the amount owed whenever the "totalThanhTien" or "amountPaid" changes
  const amountOwed = totalThanhTien - amountPaid;

  const addRow = () => {
    setRows([...rows, { field1: '', field2: '', field3: '', field4: '', field5: '' }]);
    setField1Values([...field1Values, '1']);
    setField3Values([...field3Values, '']);
    setThanhTienValues([...thanhTienValues, '']);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedField1Values = [...field1Values];
    updatedField1Values.splice(index, 1);
    setField1Values(updatedField1Values);

    const updatedField3Values = [...field3Values];
    updatedField3Values.splice(index, 1);
    setField3Values(updatedField3Values);

    const updatedThanhTienValues = [...thanhTienValues];
    updatedThanhTienValues.splice(index, 1);
    setThanhTienValues(updatedThanhTienValues);
  };

  const updateFieldValue = (index, field, value) => {
    const updatedRows = [...rows];
    const row = updatedRows[index]; // Define the row variable
    updatedRows[index][field] = value;
    setRows(updatedRows);

    if (field === 'field1') {
      const updatedField1Values = [...field1Values];
      updatedField1Values[index] = value;
      setField1Values(updatedField1Values);

      const updatedCurrentMatHangMap = { ...currentMatHangMap };
      const matHang = allMatHang.find(item => item.MaMatHang === value);
      if (matHang && matHang.relatedDvt) {
        updatedCurrentMatHangMap[value] = matHang.relatedDvt.TenDVT;
      } else {
        updatedCurrentMatHangMap[value] = 'Loading...';
      }
      setCurrentMatHangMap(updatedCurrentMatHangMap);

      const updatedDonGiaNhapMap = { ...donGiaNhapMap };
      if (matHang) {
        updatedDonGiaNhapMap[value] = matHang.DonGiaNhap;
      } else {
        updatedDonGiaNhapMap[value] = 'Loading...';
      }
      setDonGiaNhapMap(updatedDonGiaNhapMap);
    } else if (field === 'field3') {
      const updatedField3Values = [...field3Values];
      updatedField3Values[index] = value;
      setField3Values(updatedField3Values);

      const updatedThanhTienValues = [...thanhTienValues];
      const donGia = donGiaNhapMap[row.field1] || 0;
      const thanhTien = parseFloat(value) * parseFloat(donGia);
      updatedThanhTienValues[index] = isNaN(thanhTien) ? '' : thanhTien;
      setThanhTienValues(updatedThanhTienValues);
    }
  };

  const { loading: loadingMatHangByID, error: errorMatHangByID, data: dataMatHangByID } = useQuery(queryMatHangByIdArr, {
    variables: { maMatHangArr: field1Values }
  });

  useEffect(() => {
    if (dataMatHangByID && dataMatHangByID.everyMatHangByArrOfMaMatHang) {
      const updatedCurrentMatHangMap = { ...currentMatHangMap };
      const updatedDonGiaNhapMap = { ...donGiaNhapMap };
      dataMatHangByID.everyMatHangByArrOfMaMatHang.forEach((matHang) => {
        if (matHang && matHang.MaMatHang && matHang.relatedDvt) {
          updatedCurrentMatHangMap[matHang.MaMatHang] = matHang.relatedDvt.TenDVT;
          updatedDonGiaNhapMap[matHang.MaMatHang] = matHang.DonGiaNhap;
        }
      });
      setCurrentMatHangMap(updatedCurrentMatHangMap);
      setDonGiaNhapMap(updatedDonGiaNhapMap);
    }
  }, [dataMatHangByID]);

  if (loadingMatHang || loadingMatHangByID) {
    return <div>Loading...</div>;
  }

  if (errorMatHang || errorMatHangByID) {
    return <div>Error occurred.</div>;
  }

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
                  <option value="">Chọn mặt hàng...</option>
                  {allMatHang.map((matHang) => (
                    <option key={matHang.MaMatHang} value={matHang.MaMatHang}>
                      {matHang.TenMatHang}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border">{currentMatHangMap[row.field1]}</td>
              <td className="border">
                <input
                  type="number"
                  value={row.field3}
                  onChange={(e) => updateFieldValue(index, 'field3', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border">{donGiaNhapMap[row.field1]}</td>
              <td className="border">{thanhTienValues[index]}</td>
              <td className="border">
                <button className='p-2 block bg-red-400 text-white font-bold' onClick={() => removeRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-right">
              Tổng tiền:
            </td>
            <td className="border">{totalThanhTien}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4" className="text-right">
              Số tiền khách trả:
            </td>
            <td className="border">
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                className="w-full"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4" className="text-right">
              Số tiền còn nợ:
            </td>
            <td className="border">{amountOwed}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <button onClick={addRow} className='block bg-green-400 text-white font-bold p-2 '>Add Row</button>
      <button onClick={handleSubmit} className='block bg-blue-700 text-white font-bold p-2'>Submit</button>
    </div>
  );
};

export default Table;
