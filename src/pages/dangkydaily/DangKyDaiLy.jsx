import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { queryEveryQuan, queryEveryLoaidaily } from "../../graphql/queries";
import { addDailyMutation } from "../../graphql/mutations";

import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";
import BackButton from "../../component/button/backbutton/BackButton";

const AddDailyForm = () => {
  // Define the mutation
  const [addDaily, { loading: loadingAddDaiLy, error: errorAddDaiLy }] = useMutation(addDailyMutation);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedLoaiDaiLy, setSelectedLoaiDaiLy] = useState("");
  const [selectedQuan, setSelectedQuan] = useState("");
  const [tenDaiLy, setTenDaiLy] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const {
    loading: loadingQuan,
    error: errorQuan,
    data: dataQuan
  } = useQuery(queryEveryQuan);
  const {
    loading: loadingLoaiDaiLy,
    error: errorLoaiDaiLy,
    data: dataLoaiDaiLy,
  } = useQuery(queryEveryLoaidaily);

  useEffect(() => {
    console.log(selectedLoaiDaiLy); // Log the updated value of selectedDaily
  }, [selectedLoaiDaiLy]);

  if (loadingQuan) return <div>Loading...</div>;
  if (errorLoaiDaiLy) setShowError({ message: `${errorLoaiDaiLy.message}` });
  if (errorQuan) setShowError({ message: `${errorQuan.message}` })
  if (errorAddDaiLy) setShowError({ message: `${errorAddDaiLy.message}` })

  const handleLoaiDaiLySelectionChange = (event) => {
    setSelectedLoaiDaiLy(event.target.value);
  };
  const handleQuan = (event) => {
    setSelectedQuan(event.target.value);
  };
  const handleTenDaiLy = (event) => {
    setTenDaiLy(event.target.value);
  };
  const handleDienThoai = (event) => {
    // Validate the phone number format
    const phoneNumberPattern = /^\d+$/;
    if (!phoneNumberPattern.test(event.target.value) && event.target.value !== "") {
      setPhoneNumberError("Số điện thoại không hợp lệ");
    } else {
      setDienThoai(event.target.value);
      setPhoneNumberError("");
    }
  };
  const handleDiaChi = (event) => {
    setDiaChi(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extract the values from the form
    const MaLoaiDaiLy = selectedLoaiDaiLy;
    const MaQuan = selectedQuan;
    const DienThoai = dienThoai;
    const TenDaiLy = tenDaiLy;
    const DiaChi = diaChi;

    try {
      // Perform the mutation
      await addDaily({
        variables: {
          MaLoaiDaiLy,
          MaQuan,
          DienThoai,
          TenDaiLy,
          DiaChi,
        },
      });

      setShowSuccess(true)
      setDiaChi("")
      setDienThoai("")
      setTenDaiLy("")

    } catch (error) {
      setShowError(error);
    }
  };

  const isSubmitDisabled = phoneNumberError || dienThoai === "" || diaChi === "" || tenDaiLy === "" || selectedLoaiDaiLy === "" || selectedQuan === "";

  return (
    <div>
      {showError && <Error error={showError} />}
      {showSuccess && <Success show={showSuccess} />}
      <div className="flex justify-center items-center mb-5">
        <BackButton className="mr-4" />
        <h2 className="ml-10 text-4xl font-bold text-left w-full">
          Đăng ký đại lý
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <div>
          <label htmlFor="TenDaiLy" className="block font-medium">
            Tên đại lý
          </label>
          <input
            type="text"
            id="TenDaiLy"
            name="TenDaiLy"
            value={tenDaiLy}
            onChange={handleTenDaiLy}
            className="w-full p-2 border border-gray-600 rounded-md"
            placeholder="Nhập tên đại lý..."
          />
        </div>
        <div>
          <label htmlFor="DienThoai" className="block font-medium">
            Số điện thoại
          </label>
          <input
            type="text"
            id="DienThoai"
            name="DienThoai"
            value={dienThoai}
            onChange={handleDienThoai}
            className="w-full p-2 border border-gray-600 rounded-md"
            placeholder="Nhập số điện thoại..."
          />
          {phoneNumberError && (
            <p className="text-red-500">{phoneNumberError}</p>
          )}
        </div>
        <div>
          <label htmlFor="DiaChi" className="block font-medium">
            Địa chỉ
          </label>
          <input
            type="text"
            id="DiaChi"
            name="DiaChi"
            value={diaChi}
            onChange={handleDiaChi}
            className="w-full p-2 border border-gray-600 rounded-md"
            placeholder="Nhập địa chỉ..."
          />
        </div>

        <div>
          <label htmlFor="MaQuan" className="block font-medium">
            Quận
          </label>
          <select
            id="MaQuan"
            name="MaQuan"
            value={selectedQuan}
            onChange={handleQuan}
            className="w-full p-2 border border-gray-600 rounded-md"
          >
            {dataQuan && dataQuan?.everyQuan.map((quan) => (
              <option key={quan.MaQuan} value={quan.MaQuan}>
                {quan.TenQuan}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="MaLoaiDaiLy" className="block font-medium">
            Loại đại lý
          </label>
          <select
            id="MaLoaiDaiLy"
            name="MaLoaiDaiLy"
            value={selectedLoaiDaiLy}
            onChange={handleLoaiDaiLySelectionChange}
            className="w-full p-2 border border-gray-600 rounded-md"
          >
            {dataLoaiDaiLy && dataLoaiDaiLy?.everyLoaidaily.map((loai) => (
              <option key={loai.MaLoaiDaiLy} value={loai.MaLoaiDaiLy}>
                {loai.TenLoaiDaiLy}
              </option>
            ))}
          </select>
        </div>

        {/* Repeat the above structure for the remaining fields */}

        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={isSubmitDisabled}
        >
          {loadingAddDaiLy ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddDailyForm;
