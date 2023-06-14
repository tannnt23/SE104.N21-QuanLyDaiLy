import { useQuery, useMutation } from '@apollo/client';
import { queryEveryMathang } from '../../graphql/queries';
import { addPhieunhaphangMutation } from '../../graphql/mutations';

function PhieuNhapHang() {
  const { loading, error, data } = useQuery(queryEveryMathang);
  const [addPhieunhaphang] = useMutation(addPhieunhaphangMutation);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const options = data.everyMathang.map((item) => ({
    value: item.MaMatHang,
    label: item.TenMatHang,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const maMatHang = form.MaMatHang.value;
    const soLuong = parseInt(form.SoLuong.value);

    try {
      const { data } = await addPhieunhaphang({
        variables: { MaMatHang: maMatHang, SoLuong: soLuong },
      });

      console.log('Mutation response:', data);
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3">
      <h1 className='font-bold text-4xl mb-4'>Lập phiếu nhập hàng</h1>
      <div className="mb-4">
        <label htmlFor="MaMatHang" className="block">
          Tên mặt hàng:
        </label>
        <select name="MaMatHang" id="MaMatHang" className="w-full border border-gray-300 rounded px-2 py-1">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="SoLuong" className="block">
          Số lượng:
        </label>
        <input type="number" name="SoLuong" id="SoLuong" className="w-full border border-gray-300 rounded px-2 py-1" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );

}

export default PhieuNhapHang;
