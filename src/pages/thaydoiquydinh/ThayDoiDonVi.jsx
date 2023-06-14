import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";
import { compareArrays } from "../../utils/utils";

import React, { useState, useEffect } from "react";
import { queryEveryDvt, queryThamSo } from "../../graphql/queries";
import {
  addDvtMutation,
  updateDvtMutation,
  deleteDvtMutation,
} from "../../graphql/mutations";
import { useConfirm } from "material-ui-confirm";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

function ThayDoiDonVi() {
  const [units, setUnits] = useState();
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [isNeedToFetch, setIsNeedToFetch] = useState(null);

  const { loading, error, data, refetch } = useQuery(queryEveryDvt);
  const [queryFunc, thamso] = useLazyQuery(queryThamSo);
  const [updateFunc] = useMutation(updateDvtMutation);
  const [addFunc] = useMutation(addDvtMutation);
  const [deleteFunc] = useMutation(deleteDvtMutation);
  const confirm = useConfirm();

  useEffect(() => {
    if (data) setUnits([...data.everyDvt]);
  }, [data]);

  useEffect(()=>{
    if (!isNeedToFetch){ 
        thamso.refetch();
        refetch();
        setIsNeedToFetch(true)
    }
  },[])

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleDelete = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setUnits(units.filter((unit) => unit.MaDVT !== id));
  };

  const handleEdit = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setEditingUnitId(id);
  };

  const handleSave = (id) => {
    setEditingUnitId(null);
    console.log(`Save changes for unit with ID ${id}`);
  };

  const handleAdd = () => {
    setShowError(null);
    setShowSuccess(null);
    const numDVT = thamso.data.thamso.SoLuongDVT;

    if (units.length >= numDVT) {
      setShowError({ message: "Số lượng DVT đã đạt tối đa" });
      return;
    }

    const newUnitId = new Date().getTime();

    setUnits([...units, { MaDVT: newUnitId, TenDVT: "" }]);
    //setEditingUnitId(newUnitId);
  };

  const handleSubmit = () => {
    confirm({ description: "Xác nhận lưu thay đổi?" })
      .then(async () => {
        const { added, deleted, updated } = compareArrays(
          data.everyDvt,
          units,
          "MaDVT"
        );
        console.log({ added, deleted, updated });

        for (let i = 0; i < added.length; i++) {
          addFunc({ variables: added[i] })
            .then((data) => {
              setShowSuccess(true);
              console.log(data);
            })
            .catch((err) => {
              setShowError(err);
            });
        }

        for (let i = 0; i < updated.length; i++) {
          updateFunc({ variables: updated[i] })
            .then((data) => {
              setShowSuccess(true);
              console.log(data);
            })
            .catch((err) => {
              setShowError(err);
            });
        }

        for (let i = 0; i < deleted.length; i++) {
          deleteFunc({ variables: deleted[i] })
            .then((data) => {
              setShowSuccess(true);
              console.log(data);
            })
            .catch((err) => {
              setUnits([...data.everyDvt]);

              if (err.name != "ApolloError") setShowError(err);
              else
                setShowError({
                  message:
                    "Xóa không thành công vì vi phạm ràng buộc khóa ngoại.",
                });
            });
        }
      })
      .catch(() => {
        console.log("cancel");
      });
    console.log(units);
  };

  return (
    <div>
      {showError && <Error error={showError} />}
      {showSuccess && <Success show={showSuccess} />}
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
              {units &&
                units.map((unit) => (
                  <tr key={unit.MaDVT}>
                    <td className="border px-4 py-2">
                      {editingUnitId === unit.MaDVT ? (
                        <input
                          type="text"
                          value={unit.TenDVT}
                          onChange={(e) =>
                            setUnits((prevUnits) =>
                              prevUnits.map((prevUnit) =>
                                prevUnit.MaDVT === unit.MaDVT
                                  ? { ...prevUnit, TenDVT: e.target.value }
                                  : prevUnit
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        unit.TenDVT
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingUnitId === unit.MaDVT ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(unit.MaDVT)}
                        >
                          Lưu
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(unit.MaDVT)}
                          >
                            Sửa
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(unit.MaDVT)}
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
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThayDoiDonVi;
