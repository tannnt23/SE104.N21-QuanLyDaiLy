import React, { useState } from "react";
import BackButton from "../../component/button/backbutton/BackButton";

function ThayDoiDonVi() {
  const [units, setUnits] = useState([
    { id: 1, name: "Đơn vị A" },
    { id: 2, name: "Đơn vị B" },
    { id: 3, name: "Đơn vị C" },
  ]);

  const [editingUnitId, setEditingUnitId] = useState(null);

  const handleDelete = (id) => {
    setUnits(units.filter((unit) => unit.id !== id));
  };

  const handleEdit = (id) => {
    setEditingUnitId(id);
  };

  const handleSave = (id) => {
    setEditingUnitId(null);
    // Lưu thông tin chỉnh sửa của đơn vị tính
    console.log(`Save changes for unit with ID ${id}`);
  };

  const handleAdd = () => {
    const newUnitId = units.length + 1;
    setUnits([...units, { id: newUnitId, name: "" }]);
    setEditingUnitId(newUnitId);
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-center items-center mb-5">
        <BackButton className="mr-4" />
        <h2 className="mb-4 text-4xl font-bold text-center w-full">
          Danh sách đơn vị tính
        </h2>
      </div>
      {/* Form */}
      <div>
        <div className="flex flex-col items-start">
          <table className="w-1/2 mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Đơn vị tính</th>
                <th className="border px-4 py-2">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id}>
                  <td className="border px-4 py-2">
                    {editingUnitId === unit.id ? (
                      <input
                        type="text"
                        value={unit.name}
                        onChange={(e) =>
                          setUnits((prevUnits) =>
                            prevUnits.map((prevUnit) =>
                              prevUnit.id === unit.id
                                ? { ...prevUnit, name: e.target.value }
                                : prevUnit
                            )
                          )
                        }
                        className="border border-gray-300 p-2"
                      />
                    ) : (
                      unit.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUnitId === unit.id ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleSave(unit.id)}
                      >
                        Lưu
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEdit(unit.id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(unit.id)}
                        >
                          Xóa
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Thêm đơn vị tính
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThayDoiDonVi;
