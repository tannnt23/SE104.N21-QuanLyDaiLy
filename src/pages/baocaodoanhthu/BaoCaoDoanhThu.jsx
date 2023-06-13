import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";

import { useQuery, useLazyQuery } from "@apollo/client";
import {
  queryEveryDaily,
  queryCt_bcdsByTenDLAndThang,
} from "../../graphql/queries";
import { useState, useEffect } from "react";

function BaoCaoDoanhThu() {
  const [daiLy, setDaiLy] = useState([]);
  const [name, setName] = useState("option 0");
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState(null);
  const [showError, setShowError] = useState(null);

  const { loading, error, data } = useQuery(queryEveryDaily);
  const [queryFunc, dataQuery] = useLazyQuery(queryCt_bcdsByTenDLAndThang);

  useEffect(() => {
    if (data) setDaiLy(data.everyDaily);

    if (dataQuery.data) setTableData(dataQuery.data.ct_bcdsByTenDLAndThang[0]);
    else setShowError(dataQuery.error);
  }, [data, dataQuery, showError]);

  if (loading) return <div>Loading...</div>;
  if (error) setShowError(error);

  const handleNameChange = (event) => {
    setShowError(null);
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setShowError(null);
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let option = parseInt(name.split(" ")[1]);
    let date_ = [date.split("-")[0], date.split("-")[1]].join("-");

    await queryFunc({
      variables: {
        tenDaiLy: daiLy[option].TenDaiLy,
        thang: date_,
      },
    });
  };

  const createTable = () => (
    <div className="mt-4 mx-auto">
      <h2 className="text-center text-xl mb-2">
        Báo cáo doanh thu tháng {date.split("-")[1]} năm {date.split("-")[0]}
      </h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Tên đại lý</th>
            <th className="border border-gray-300 px-4 py-2">Số phiếu xuất</th>
            <th className="border border-gray-300 px-4 py-2">Tổng trị giá</th>
            <th className="border border-gray-300 px-4 py-2">Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              {tableData?.relatedDaily?.TenDaiLy}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {tableData.SoPhieuXuat}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {tableData.TongTriGia}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {tableData.TyLe}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td
              className="border border-gray-300 px-4 py-2 font-bold text-right"
              colSpan="4"
            >
              Tổng số doanh thu: {1800}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

  return (
    <div>
      {showError && <Error error={showError} />}
      {/* Heading */}
      <div className="flex justify-center items-center">
        <BackButton className="mr-4" />
        <h2 className="mb-4 text-4xl font-bold text-center w-full">
          Báo cáo doanh thu
        </h2>
      </div>
      {/* Form */}
      <div>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <select
            value={name}
            onChange={handleNameChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {daiLy.map((item, index) => (
              <option key={index} value={`option ${index}`}>
                {item.TenDaiLy}
              </option>
            ))}
          </select>
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
      {tableData && createTable(tableData)}
    </div>
  );
}

export default BaoCaoDoanhThu;
