import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { queryEveryDaily, queryThamSo } from "../../graphql/queries";
import {
  updateDailyMutation,
  addPhieuthutienMutation,
} from "../../graphql/mutations";
import { useState, useEffect } from "react";

function LapPhieuThuTien() {
  const { loading, error, data, refetch } = useQuery(queryEveryDaily);
  const [updateFunc] = useMutation(updateDailyMutation);
  const [addFunc] = useMutation(addPhieuthutienMutation);
  const [queryFunc, thamso] = useLazyQuery(queryThamSo);

  const [daiLy, setDaiLy] = useState(null);
  const [thuTien, setThuTien] = useState(0);
  const [showNo, setShowNo] = useState(false);
  const [daiLyDuocChon, setDaiLyDuocChon] = useState("option 0");
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [isNeedToFetch, setIsNeedToFetch] = useState(null);

  useEffect(() => {
    if (data) setDaiLy([...data.everyDaily]);
  }, [data]);

  useEffect(() => {
    if (!isNeedToFetch) {
      thamso.refetch();
      refetch();
      setIsNeedToFetch(true);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return setShowError(error);

  const handleShowNo = (e) => {
    e.preventDefault();

    setShowError(null);
    setShowSuccess(null);

    let option = 0;
    let choosen = {};

    option = parseInt(daiLyDuocChon.split(" ")[1]);
    choosen = daiLy?.[option];

    setShowNo(true);
  };

  const handleChonDaiLy = (e) => {
    setShowError(null);
    setShowSuccess(null);
    setDaiLyDuocChon(e.target.value);
  };

  const handleSubmit = (e) => {
    setShowError(null);
    setShowSuccess(null);
    e.preventDefault();
    let choosen = daiLy[parseInt(daiLyDuocChon.split(" ")[1])];
    let date = document.querySelector("#date-input").value;

    if (
      thuTien > choosen.TienNo &&
      thamso.data.thamso.SoTienThuKhongVuotQuaSoTienDaiLyDangNo
    ) {
      setShowError({ message: "Tiền thu phải nhỏ hơn số tiền đại lý nợ" });
      return;
    }

    addFunc({
      variables: {
        ngayThuTien: date,
        maDaiLy: choosen.MaDaiLy,
        soTienThu: parseFloat(thuTien),
      },
    }).catch((err) => {
      setShowError(err);
    });

    updateFunc({
      variables: {
        ...choosen,
        TienNo: parseFloat(choosen.TienNo - thuTien),
      },
    })
      .then((data) => {
        setDaiLy((prev) =>
          prev.map((daily) =>
            daily.MaDaiLy == choosen.MaDaiLy
              ? {
                  ...daily,
                  TienNo: parseFloat(choosen.TienNo - thuTien),
                }
              : daily
          )
        );
        if (data.data.updateDaily) setShowSuccess(true);
      })
      .catch((err) => {
        setShowError(err);
      });
  };

  return (
    <div>
      {showError && <Error error={showError} />}
      {showSuccess && <Success show={showSuccess} />}
      {/* Heading */}
      <div className="flex justify-center items-center">
        <BackButton className="mr-4" />
        <h2 className="mb-4 text-4xl font-bold text-center w-full">
          Phiếu Thu Tiền
        </h2>
      </div>
      <div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-1/3">
            <div className="">
              <label htmlFor="combo-box" className="block mb-2">
                Tên đại lý
              </label>
              <select
                required
                id="combo-box"
                name="combo-box"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={daiLyDuocChon}
                onChange={handleChonDaiLy}
              >
                {daiLy &&
                  daiLy.map((item, index) => (
                    <option key={index} value={`option ${index}`}>
                      {item.TenDaiLy}
                    </option>
                  ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="date-input" className="block mt-4 mb-2">
                Ngày lập phiếu
              </label>
              <input
                required
                type="date"
                id="date-input"
                name="date-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <br />
          <br />
          <div className="w-2/3 ">
            <input
              required
              className="w-96 border border-gray-500 rounded-lg p-2 mb-2"
              type="number"
              placeholder="Nhập số tiền (VNĐ)"
              value={thuTien}
              onChange={(e) => {
                setShowError(null);
                setShowSuccess(null);
                setThuTien(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={handleShowNo}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer"
            >
              Xem nợ
            </button>
            {showNo && (
              <div className="mx-4 px-4 py-2">
                {daiLy?.[parseInt(daiLyDuocChon.split(" ")[1])]?.TenDaiLy} :
                {daiLy?.[parseInt(daiLyDuocChon.split(" ")[1])]?.TienNo}
              </div>
            )}
          </div>
          <div className="flex justify-start w-4/5 ">
            <input
              type="submit"
              value="Submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LapPhieuThuTien;
