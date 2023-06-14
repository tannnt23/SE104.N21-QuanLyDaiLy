import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { queryEveryQuan, queryEveryLoaidaily } from '../../graphql/queries';
import { addDailyMutation } from '../../graphql/mutations';



const AddDailyForm = () => {

  // Define the mutation
  const [addDaily] = useMutation(addDailyMutation);


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extract the values from the form
    const MaLoaiDaiLy = selectedLoaiDaiLy;
    const MaQuan = selectedQuan;
    const DienThoai = dienThoai;
    const TenDaiLy = tenDaiLy;
    const DiaChi = diaChi;
    console.log(MaLoaiDaiLy, MaQuan, DienThoai, TenDaiLy, DiaChi)
    console.log(typeof DienThoai)

    try {
      // Perform the mutation
      const { data } = await addDaily({
        variables: {
          MaLoaiDaiLy,
          MaQuan,
          DienThoai,
          TenDaiLy,
          DiaChi
        },
      });
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  const [selectedLoaiDaiLy, setSelectedLoaiDaiLy] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');
  const [tenDaiLy, setTenDaiLy] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [diaChi, setDiaChi] = useState('');

  const { loading: loadingQuan, error: errorQuan, data: dataQuan } = useQuery(queryEveryQuan);
  const { loading: loadingLoaiDaiLy, error: errorLoaiDaiLy, data: dataLoaiDaiLy } = useQuery(queryEveryLoaidaily);
  useEffect(() => {
    console.log(selectedLoaiDaiLy); // Log the updated value of selectedDaily
  }, [selectedLoaiDaiLy]);

  if (loadingLoaiDaiLy) {
    return <div>Loading...</div>;
  }

  if (errorLoaiDaiLy) {
    return <div>Error fetching dailyData</div>;
  }

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
    setDienThoai(event.target.value);
  };
  const handleDiaChi = (event) => {
    setDiaChi(event.target.value);
  };

  if (loadingQuan) return <p>Loading...</p>;
  if (errorQuan) return <p>Error fetching data</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
      <h1 className='text-4xl font-bold'>Đăng ký đại lý</h1>
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
          placeholder='Nhập tên đại lý...'
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
          placeholder='Nhập số điện thoại...'
        />
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
          placeholder='Nhập địa chỉ...'
        />
      </div>

      <div>
        <label htmlFor="MaQuan" className="block font-medium">
          Mã quận
        </label>
        <select
          id="MaQuan"
          name="MaQuan"
          value={selectedQuan}
          onChange={handleQuan}
          className="w-full p-2 border border-gray-600 rounded-md"
        >
          <option value="">Chọn mã quận...</option>
          {dataQuan.everyQuan.map((quan) => (
            <option key={quan.MaQuan} value={quan.MaQuan}>
              {quan.MaQuan}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="MaLoaiDaiLy" className="block font-medium">
          Mã loại đại lý
        </label>
        <select
          id="MaLoaiDaiLy"
          name="MaLoaiDaiLy"
          value={selectedLoaiDaiLy}
          onChange={handleLoaiDaiLySelectionChange}
          className="w-full p-2 border border-gray-600 rounded-md"
        >
          <option value="">Chọn mã loại đại lý...</option>
          {dataLoaiDaiLy.everyLoaidaily.map((loai) => (
            <option key={loai.MaLoaiDaiLy} value={loai.MaLoaiDaiLy}>
              {loai.MaLoaiDaiLy}
            </option>
          ))}
        </select>
      </div>

      {/* Repeat the above structure for the remaining fields */}

      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddDailyForm;
