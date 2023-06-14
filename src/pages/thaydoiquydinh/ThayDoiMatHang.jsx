import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";
import { compareArrays } from "../../utils/utils";

import {
  queryEveryMathang,
  queryThamSo,
  queryEveryDvt,
} from "../../graphql/queries";
import {
  addMathangMutation,
  updateMathangMutation,
  deleteMathangMutation,
} from "../../graphql/mutations";
import { useConfirm } from "material-ui-confirm";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

function ThayDoiMatHang() {
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [isNeedToFetch, setIsNeedToFetch] = useState(null);

  const { loading, error, data, refetch } = useQuery(queryEveryMathang);
  const [queryDVT, dvt] = useLazyQuery(queryEveryDvt);
  const [queryFunc, thamso] = useLazyQuery(queryThamSo);
  const [updateFunc] = useMutation(updateMathangMutation);
  const [addFunc] = useMutation(addMathangMutation);
  const [deleteFunc] = useMutation(deleteMathangMutation);
  const confirm = useConfirm();

  useEffect(() => {
    if (data) setProduct([...data.everyMathang]);
  }, [data]);

  useEffect(()=>{
    if (!isNeedToFetch){ 
        thamso.refetch();
        dvt.refetch();
        refetch();
        setIsNeedToFetch(true)
    }
  },[])

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleDelete = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setProduct(product.filter((agency) => agency.MaMatHang !== id));
  };

  const handleEdit = (id) => {
    setShowError(null);
    setShowSuccess(null);
    setEditingProductId(id);
  };

  const handleSave = (id) => {
    setEditingProductId(null);
    console.log(`Save changes for agency with ID ${id}`);
  };

  const handleAdd = () => {
    setShowError(null);
    setShowSuccess(null);
    const numDVT = thamso.data.thamso.SoLuongMatHang;

    if (product.length >= numDVT) {
      setShowError({ message: "Số lượng MH đã đạt tối đa" });
      return;
    }

    const newAgencyId = new Date().getTime();

    setProduct([
      ...product,
      { MaMatHang: newAgencyId, TenMatHang: "", SoLuongTon: 0, MaDVT: "1" },
    ]);
  };

  const handleSubmit = () => {
    confirm({ description: "Xác nhận lưu thay đổi?" })
      .then(async () => {
        const { added, deleted, updated } = compareArrays(
          data.everyMathang,
          product,
          "MaMatHang"
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
              setProduct([...data.everyMathang]);

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
          Danh sách loại đại lý
        </h2>
      </div>
      {/* Form */}
      <div>
        <div className="flex flex-col items-start">
          <table className="w-1/2 mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Tên mặt hàng</th>
                <th className="border px-4 py-2">Số lượng tồn</th>
                <th className="border px-4 py-2">Đơn giá nhập</th>
                <th className="border px-4 py-2">Đơn vị tính</th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.map((agency) => (
                  <tr key={agency.MaMatHang}>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaMatHang ? (
                        <input
                          type="text"
                          value={agency.TenMatHang}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaMatHang === agency.MaMatHang
                                  ? {
                                      ...prevAgency,
                                      TenMatHang: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.TenMatHang
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaMatHang ? (
                        <input
                          type="number"
                          value={agency.SoLuongTon}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaMatHang === agency.MaMatHang
                                  ? {
                                      ...prevAgency,
                                      SoLuongTon:
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
                        agency.SoLuongTon
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaMatHang ? (
                        <input
                          type="number"
                          value={agency.DonGiaNhap}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaMatHang === agency.MaMatHang
                                  ? {
                                      ...prevAgency,
                                      DonGiaNhap:
                                        e.target.value != ""
                                          ? parseInt(e.target.value)
                                          : "",
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        agency.DonGiaNhap
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaMatHang ? (
                        <input
                          type="number"
                          value={agency.MaDVT}
                          onChange={(e) =>
                            setProduct((prevAgencies) =>
                              prevAgencies.map((prevAgency) =>
                                prevAgency.MaMatHang === agency.MaMatHang
                                  ? {
                                      ...prevAgency,
                                      MaDVT: e.target.value,
                                    }
                                  : prevAgency
                              )
                            )
                          }
                          className="border border-gray-300 p-2"
                        />
                      ) : (
                        dvt?.data?.everyDvt.find(
                          (obj) => obj.MaDVT == agency.MaDVT
                        )?.TenDVT
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingProductId === agency.MaMatHang ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(agency.MaMatHang)}
                        >
                          Lưu
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(agency.MaMatHang)}
                          >
                            Sửa
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(agency.MaMatHang)}
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
            Thêm mặt hàng
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

export default ThayDoiMatHang;
