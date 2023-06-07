import { useState } from 'react';

const PhieuXuatHang = () => {
  const [data, setData] = useState([
    { id: 1, field1: '', field2: '', field3: '', field4: '', field5: '' },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index][name] = value;
    setData(updatedData);
  };

  const addRow = (e) => {
    e.preventDefault(); // Prevent form submission
    const newRow = { id: data.length + 1, field1: '', field2: '', field3: '', field4: '', field5: '' };
    setData([...data, newRow]);
  };

  const removeRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Mặt hàng</th>
            <th>Đơn vị tính</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, index) =>
            (  
              // ----------------------------------------------------------------  
              //just a row in the table
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      name="field1"
                      value={row.field1}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="field2"
                      value={row.field2}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="field3"
                      value={row.field3}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="field4"
                      value={row.field4}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="field5"
                      value={row.field5}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td>
                    <button onClick={() => removeRow(index)} className="px-2 py-1 bg-red-500 text-white rounded-md">Xoá</button>
                  </td>
                </tr>
                // --just a row in the table--
                // ----------------------------------------------------------------
              )
            )
          }
        </tbody>
      </table>

      <div className='flex'>
        <button onClick={addRow} className="mt-4 px-2 py-1 bg-green-600 text-white rounded-md">Thêm</button>
      </div>
    </div>
  );
};

export default PhieuXuatHang;
