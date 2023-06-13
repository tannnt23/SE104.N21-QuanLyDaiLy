import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";
import { compareArrays } from "../../utils/utils";

import { queryEveryLoaidaily, queryThamSo } from "../../graphql/queries";
import {
  updateLoaidailyMutation,
  addLoaidailyMutation,
  deleteLoaidailyMutation,
} from "../../graphql/mutations";
import { useConfirm } from "material-ui-confirm";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

function ThayDoiLoaiDaiLy() {
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [editingAgencyId, setEditingAgencyId] = useState(null);
  const [daiLy, setDaiLy] = useState(null);

  const { loading, error, data } = useQuery(queryEveryLoaidaily);
  const [queryFunc, thamso] = useLazyQuery(queryThamSo);
  const [updateFunc] = useMutation(updateLoaidailyMutation);
  const [addFunc] = useMutation(addLoaidailyMutation);
  const [deleteFunc] = useMutation(deleteLoaidailyMutation);
  const confirm = useConfirm();

  useEffect(() => {
    if (data) setDaiLy([...data.everyLoaidaily]);
    if (!thamso.data) queryFunc();
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleDelete = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setDaiLy(daiLy.filter((agency) => agency.MaLoaiDaiLy !== id));
  };

  const handleEdit = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setEditingAgencyId(id);
  };

  const handleSave = (id) => {
    setEditingAgencyId(null);
    console.log(`Save changes for agency with ID ${id}`);
  };

  const handleAdd = () => {
    setShowError(null);
    setShowSuccess(null);
    const numDVT = thamso.data.thamso.SoLuongLoaiDaiLy;

    if (daiLy.length >= numDVT) {
      setShowError({ message: "Số lượng DL đã đạt tối đa" });
      return;
    }

    const newAgencyId = new Date().getTime();

    setDaiLy([
      ...daiLy,
      { MaLoaiDaiLy: newAgencyId, TenLoaiDaiLy: "", SoNoToiDa: 0 },
    ]);
  };

  const handleSubmit = () => {
    confirm({ description: "Xác nhận lưu thay đổi?" })
      .then(async () => {
        const { added, deleted, updated } = compareArrays(
          data.everyLoaidaily,
          daiLy,
          "MaLoaiDaiLy"
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
              setDaiLy([...data.everyLoaidaily]);

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
    console.log(daiLy);
  };

  return (
    <div>
      {showError && <Error error={showError} />}
      {showSuccess && <Success show={showSuccess} />}
      {/* Heading */}
      <div className="flex justify-center items-center mb-5">
        <BackButton className="mr-4" />
        <h2 className="mb-4 text-4xl font-bold text-center w-full">
          Danh sách loại đại lý
        </h2>
      </div>
      {/* Form */}
      <div>
        <div className="flex flex-col items-start">
          <table className="w-1/2 mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Tên loại đại lý</th>
                <th className="border px-4 py-2">Số nợ tối đa</th>
                <th className="border px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {daiLy &&
                daiLy.map((agency) => (
                  <tr key={agency.MaLoaiDaiLy}>
                    <td className="border px-4 py-2">
                      {editingAgencyId === agency.MaLoaiDaiLy ? (
                        <input
                          type="text"
                          value={agency.TenLoaiDaiLy}
                          onChange={(e) =>
                            setDaiLy((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaLoaiDaiLy === agency.MaLoaiDaiLy
                                  ? {
                                      ...prevAgency,
                                      TenLoaiDaiLy: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.TenLoaiDaiLy
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingAgencyId === agency.MaLoaiDaiLy ? (
                        <input
                          type="number"
                          value={agency.SoNoToiDa}
                          onChange={(e) =>
                            setDaiLy((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaLoaiDaiLy === agency.MaLoaiDaiLy
                                  ? {
                                      ...prevAgency,
                                      SoNoToiDa:
                                        e.target.value == ""
                                          ? ""
                                          : parseInt(e.target.value),
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.SoNoToiDa
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingAgencyId === agency.MaLoaiDaiLy ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(agency.MaLoaiDaiLy)}
                        >
                          Lưu
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(agency.MaLoaiDaiLy)}
                          >
                            Sửa
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(agency.MaLoaiDaiLy)}
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
            Thêm loại đại lý
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

export default ThayDoiLoaiDaiLy;
