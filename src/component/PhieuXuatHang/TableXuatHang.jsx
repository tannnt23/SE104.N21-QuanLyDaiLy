import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { queryEveryMathang, queryMatHangByIdArr, queryThamSo } from '../../graphql/queries';
import { addPhieuxuathangMutation, addCt_phieuxuathangMutation, updateTienNo } from '../../graphql/mutations';
import Error from "../../component/pop_up/Error";

const Table = ({ daily }) => {
  const [addPhieuxuathang] = useMutation(addPhieuxuathangMutation);
  const [addCt_phieuxuathang] = useMutation(addCt_phieuxuathangMutation);
  const [accumulateTienNoMutation] = useMutation(updateTienNo);

  // Define the query for fetching 'thamso' data
  const { loading: loadingThamSo, error: errorThamSo, data: dataThamSo } = useQuery(queryThamSo);
  // console.log(dataThamSo?.thamso?.TyLeDonGiaXuat)
  const TyLeDonGiaXuat = dataThamSo?.thamso?.TyLeDonGiaXuat;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform the addPhieuxuathang mutation
      const { data } = await addPhieuxuathang({
        variables: {
          TongTien: totalThanhTien, // Replace with the desired value for NgayLapPhieu
          MaDaiLy: daily, // Replace with the actual ID of the DaiLy
        },
      });

      const maPhieuXuat = data.addPhieuxuathang.MaPhieuXuat;

      // Perform the addCt_phieuxuathang mutation for each row
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const maMatHang = row.field1;
        const soLuongXuat = parseInt(row.field3);
        const donGiaXuat = parseFloat(donGiaXuatMap[maMatHang]);
        const thanhTien = parseFloat(thanhTienValues[i]);

        // Perform the addCt_phieuxuathang mutation for each row
        const { data } = await addCt_phieuxuathang({
          variables: {
            maPhieuXuat,
            maMatHang,
            soLuongXuat,
            donGiaXuat,
            thanhTien,
          },
        });

        console.log(data);
      }
      console.log(amountOwed);
      const { data: { accumulateTienNo } } = await accumulateTienNoMutation({
        variables: {
          maDaiLy: daily,
          tienNo: amountOwed,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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

      const updateddonGiaXuatMap = { ...donGiaXuatMap };
      if (matHang) {
        updateddonGiaXuatMap[value] = (matHang.DonGiaNhap * TyLeDonGiaXuat).toString(); // Updated formula
      } else {
        updateddonGiaXuatMap[value] = 'Loading...';
      }
      setDonGiaXuatMap(updateddonGiaXuatMap);

      const updatedThanhTienValues = [...thanhTienValues];
      const donGia = parseFloat(updateddonGiaXuatMap[value]) || 0;
      const soLuong = parseFloat(row.field3) || 0;
      const thanhTien = donGia * soLuong;
      updatedThanhTienValues[index] = isNaN(thanhTien) ? '' : thanhTien.toString();
      setThanhTienValues(updatedThanhTienValues);
    } else if (field === 'field3') {
      const updatedField3Values = [...field3Values];
      updatedField3Values[index] = value;
      setField3Values(updatedField3Values);

      const updatedThanhTienValues = [...thanhTienValues];
      const donGia = parseFloat(donGiaXuatMap[row.field1]) || 0;
      const thanhTien = parseFloat(value) * donGia;
      updatedThanhTienValues[index] = isNaN(thanhTien) ? '' : thanhTien.toString();
      setThanhTienValues(updatedThanhTienValues);
    }
  };

  const { loading: loadingMatHangByID, error: errorMatHangByID, data: dataMatHangByID } = useQuery(queryMatHangByIdArr, {
    variables: { maMatHangArr: field1Values }
  });

  useEffect(() => {
    if (dataMatHangByID && dataMatHangByID.everyMatHangByArrOfMaMatHang) {
      const updatedCurrentMatHangMap = { ...currentMatHangMap };
      const updateddonGiaXuatMap = { ...donGiaXuatMap };
      dataMatHangByID.everyMatHangByArrOfMaMatHang.forEach((matHang) => {
        if (matHang && matHang.MaMatHang && matHang.relatedDvt) {
          updatedCurrentMatHangMap[matHang.MaMatHang] = matHang.relatedDvt.TenDVT;
          updateddonGiaXuatMap[matHang.MaMatHang] = matHang.DonGiaNhap * TyLeDonGiaXuat;
        }
      });
      setCurrentMatHangMap(updatedCurrentMatHangMap);
      setDonGiaXuatMap(updateddonGiaXuatMap);
    }
  }, [dataMatHangByID]);

  if (loadingMatHang || loadingMatHangByID || loadingThamSo) {
    return <div>Loading...</div>;
  }

  if (errorMatHang || errorMatHangByID || errorThamSo) {
    return <div>Error occurred.</div>;
  }

  return (
    <div>
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border px-2">Mặt hàng</th>
            <th className="border px-2">Đơn vị tính</th>
            <th className="border px-2">Số lượng</th>
            <th className="border px-2">Đơn giá xuất</th>
            <th className="border px-2 underline">Thành tiền</th>
            <th className="border px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* Mat hang */}
              <td className="border">
                <select
                  value={row.field1}
                  onChange={(e) => updateFieldValue(index, 'field1', e.target.value)}
                  className="w-full"
                >
                  <option value="">Chọn mặt hàng...</option>
                  {allMatHang.map((matHang) => (
                    <option key={matHang.MaMatHang} value={matHang.MaMatHang}>
                      {matHang.TenMatHang} (Số lượng tồn: {matHang.SoLuongTon})
                    </option>
                  ))}
                </select>
              </td>
              {/* Don vi tinh */}
              <td className="border bg-yellow-100 text-gray-500 px-2">{currentMatHangMap[row.field1]}</td>
              {/* So luong */}
              <td className="border">
                <input
                  type="number"
                  value={row.field3}
                  onChange={(e) => updateFieldValue(index, 'field3', e.target.value)}
                  className="w-24 px-2"
                />
              </td>
              {/* Don gia */}
              <td className="border bg-yellow-100 text-gray-500 px-2">{(parseFloat(donGiaXuatMap[row.field1]) * TyLeDonGiaXuat).toFixed(2)}</td>
              {/* Thanh tien */}
              <td className="border px-2 font-bold">{thanhTienValues[index]}</td>
              <td className="border">
                <button className='p-2 block bg-red-600 text-white font-bold' onClick={() => removeRow(index)}>Remove</button>
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
      <button onClick={addRow} className='block bg-green-600 text-white font-bold p-2 mt-2 '>Add Row</button>
      <button onClick={handleSubmit} className='block bg-blue-700 text-white font-bold p-2 mt-2'>Submit</button>

    </div>
  );
};

export default Table;