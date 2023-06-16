import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  queryEveryDaily,
  queryEveryCT_BCCNByMaBCCN,
  queryEveryBaocaocongno,
} from "../../graphql/queries";
import {
  addBaocaocongnoMutation,
  addCt_bccnMutation,
} from "../../graphql/mutations";
import { useState, useEffect } from "react";

function BaoCaoCongNo() {
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState(null);
  const [showError, setShowError] = useState(null);

  const { loading, error, data } = useQuery(queryEveryDaily);
  const [queryEvCT_BCCNFunc, bcdsThang] = useLazyQuery(
    queryEveryCT_BCCNByMaBCCN
  );
  const [queryEvBCCNFunc] = useLazyQuery(queryEveryBaocaocongno);
  const [addBCCNFunc] = useMutation(addBaocaocongnoMutation);
  const [addCT_BCCNFunc] = useMutation(addCt_bccnMutation);

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleDateChange = (event) => {
    setShowError(null);
    setDate(event.target.value);
  };

  const getCT_BCCNById = async (msBCCN) => {
    try {
      const res = await queryEvCT_BCCNFunc({
        variables: {
          maBaoCaoCongNo: msBCCN,
        },
      });

      const listCT_BCCN = res.data?.everyCT_BCCNByMaBCCN;
      
      if(res.data) setTableData(listCT_BCCN);
      else throw Error("Lỗi khi tính công nợ.")

    } catch (err) {
      setShowError(err);
    }
  };

  const ifNotCreated = async (date) => {
    const listDaiLy = data?.everyDaily;

    try {
      const BCCN = await addBCCNFunc({
        variables: {
          Thang: date,
        },
      });

      const maBCCN = BCCN.data?.addBaocaocongno?.MaBaoCaoCongNo;

      if (!data) throw Error("Lỗi khi tải dữ liệu!");

      await Promise.all(
        listDaiLy.map((daily) =>
          addCT_BCCNFunc({
            variables: {
              maBaoCaoCongNo: maBCCN,
              maDaiLy: daily.MaDaiLy,
            },
          })
        )
      );

      return maBCCN;
    } catch (err) {
      setShowError(err);
    }
  };

  const checkIsCreated = async (date) => {
    try {
      const msBCCNCreated = await queryEvBCCNFunc();
      const listMS = msBCCNCreated.data?.everyBaocaocongno;

      return listMS.find((bccn) => bccn?.Thang == date)?.MaBaoCaoCongNo;
    } catch (err) {
      setShowError(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date_ = [date.split("-")[0], date.split("-")[1]].join("-");
    const msBCCN = await checkIsCreated(date_);

    if (msBCCN) getCT_BCCNById(msBCCN);
    else {
      const maBCCN = await ifNotCreated(date_);
      getCT_BCCNById(maBCCN);
    }
  };

  const CreateRow = ({ rowData }) => {
    return (
      <tr>
        <td className="border border-gray-300 px-4 py-2">
          {rowData?.relatedDaily?.TenDaiLy}
        </td>
        <td className="border border-gray-300 px-4 py-2">{rowData?.NoDau}</td>
        <td className="border border-gray-300 px-4 py-2">
          {rowData?.PhatSinh}
        </td>
        <td className="border border-gray-300 px-4 py-2">{rowData?.NoCuoi}</td>
      </tr>
    );
  };

  const createCongNoTable = (date, tableData) => {
    let data = [...tableData];
    data.sort((a, b) => b.NoCuoi - a.NoCuoi);

    return (
      <div className="mt-4 mx-auto">
        <h2 className="text-center text-xl mb-2">
          Báo cáo công nợ tháng {date.split("-")[1]} năm {date.split("-")[0]}
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Tên đại lý</th>
              <th className="border border-gray-300 px-4 py-2">Nợ đầu</th>
              <th className="border border-gray-300 px-4 py-2">Phát sinh</th>
              <th className="border border-gray-300 px-4 py-2">Nợ cuối</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row) => (
                <CreateRow rowData={row} key={row?.MaCT_BCDS} />
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {showError && <Error error={showError} />}
      {/* Heading */}
      <div className="mb-10 flex justify-center items-center">
        <BackButton className="mr-4" />
        <h2 className="ml-10 text-4xl font-bold text-left w-full">
          Báo cáo công nợ
        </h2>
      </div>
      {/* Form */}
      <div>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <input
            type="date"
            placeholder="Ngày tháng"
            value={date}
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Gửi
          </button>
        </form>
      </div>
      {tableData && createCongNoTable(date, tableData)}
    </div>
  );
}

export default BaoCaoCongNo;
