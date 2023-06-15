import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";
import { compareArrays } from "../../utils/utils";

import {
  queryEveryDaily,
  queryEveryLoaidaily,
  queryEveryQuan,
} from "../../graphql/queries";
import { updateDailyMutation } from "../../graphql/mutations";
import { useConfirm } from "material-ui-confirm";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

function ThayDoiDaiLy() {
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [isNeedToFetch, setIsNeedToFetch] = useState(null);

  const { loading, error, data, refetch } = useQuery(queryEveryDaily);
  const [queryloaiDL, loaiDL] = useLazyQuery(queryEveryLoaidaily);
  const [queryFunc, quan] = useLazyQuery(queryEveryQuan);
  const [updateFunc] = useMutation(updateDailyMutation);
  const confirm = useConfirm();

  useEffect(() => {
    if (data) setProduct([...data.everyDaily]);
  }, [data]);

  useEffect(() => {
    if (!isNeedToFetch) {
      quan.refetch();
      loaiDL.refetch();
      refetch();
      setIsNeedToFetch(true);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleEdit = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setEditingProductId(id);
  };

  const handleSave = (id) => {
    setEditingProductId(null);
    console.log(`Save changes for agency with ID ${id}`);
  };

  const handleSubmit = () => {
    confirm({ description: "Xác nhận lưu thay đổi?" })
      .then(async () => {
        const { updated } = compareArrays(
          data.everyDaily,
          product,
          "MaDaiLy"
        );
        console.log({ updated });

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
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(product);
  };

  return (
    <div>
      {showError && <Error error={showError} />}
      {showSuccess && <Success show={showSuccess} />}
      {/* Heading */}
      <div className="flex justify-center items-center mb-5">
        <BackButton className="mr-4" />
        <h2 className="mb-4 text-4xl font-bold text-center w-full">
          Danh sách đại lý
        </h2>
      </div>
      {/* Form */}
      <div>
        <div className="flex flex-col items-start">
          <table className="mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Tên đại lý</th>
                <th className="border px-4 py-2">Số điện thoại</th>
                <th className="border px-4 py-2">Địa chỉ</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Loại đại lý</th>
                <th className="border px-4 py-2">Quận</th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.map((agency) => (
                  <tr key={agency.MaDaiLy}>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <input
                          type="text"
                          value={agency.TenDaiLy}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      TenDaiLy: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.TenDaiLy
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <input
                          type="text"
                          value={agency.DienThoai}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      DienThoai: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.DienThoai
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <input
                          type="text"
                          value={agency.DiaChi}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      DiaChi: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.DiaChi
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <input
                          type="mail"
                          value={agency.Email}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      Email: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.Email
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <select
                          value={agency.MaLoaiDaiLy}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      MaLoaiDaiLy: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        >
                          {loaiDL?.data?.everyLoaidaily.map((obj) => (
                            <option
                              key={obj.MaLoaiDaiLy}
                              value={obj.MaLoaiDaiLy}
                            >
                              {obj.TenLoaiDaiLy}
                            </option>
                          ))}
                        </select>
                      ) : (
                        loaiDL?.data?.everyLoaidaily?.find(
                          (obj) => obj.MaLoaiDaiLy === agency.MaLoaiDaiLy
                        )?.TenLoaiDaiLy
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <select
                          value={agency.MaQuan}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaDaiLy === agency.MaDaiLy
                                  ? {
                                      ...prevAgency,
                                      MaQuan: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        >
                          {quan?.data?.everyQuan.map((obj) => (
                            <option
                              key={obj.MaQuan}
                              value={obj.MaQuan}
                            >
                              {obj.TenQuan}
                            </option>
                          ))}
                        </select>
                      ) : (
                        quan?.data?.everyQuan?.find(
                          (obj) => obj.MaQuan === agency.MaQuan
                        )?.TenQuan
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaDaiLy ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(agency.MaDaiLy)}
                        >
                          Lưu
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(agency.MaDaiLy)}
                          >
                            Sửa
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThayDoiDaiLy;
