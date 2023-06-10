import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { queryEveryDaily } from '../../graphql/queries';

const TraCuuDaiLy = () => {
    const [searchQuery, setSearchQuery] = useState(''); //search by TenDaiLy
    const [filteredDaily, setFilteredDaily] = useState([]);
    const { loading, error, data } = useQuery(queryEveryDaily);
    useEffect(() => {
        if (data) {
            const filteredData = data.everyDaily.filter(daily =>
                daily.TenDaiLy.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDaily(filteredData);
        }
    }, [data, searchQuery]);

    if (loading) {
        // Display a loading state
        return <div>Loading...</div>;
    }

    if (error) {
        // Handle the error
        return <div>Error: {error.message}</div>;
    }

    const DailyTableRow = ({ daily }) => (
        <tr className='border border-black'>
            <td className="border border-black p-2">{daily.MaDaiLy}</td>
            <td className="border border-black p-2">{daily.TenDaiLy}</td>
            <td className="border border-black p-2">{daily.MaLoaiDaiLy}</td>
            <td className="border border-black p-2">{daily.MaQuan}</td>
            <td className="border border-black p-2">{daily.TienNo}</td>
            <td className="border border-black p-2">{daily.NgayTiepNhan}</td>
        </tr>
    );

    return (
        <div>
            <h1 className='text-4xl font-bold mb-4'>Tra cứu đại lý</h1>
            <input className='w-96 border border-gray-500 rounded-lg p-2 mb-2' type="text" placeholder="Nhập tên đại lý..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <table className="w-2/3 border-collapse border border-black">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="border border-black p-2">Mã đại lý</th>
                        <th className="border border-black p-2">Tên đại lý</th>
                        <th className="border border-black p-2">Mã loại đại lý</th>
                        <th className="border border-black p-2">Mã quận</th>
                        <th className="border border-black p-2">Tiền nợ</th>
                        <th className="border border-black p-2">Ngày tiếp nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDaily.map((daily, index) => (
                        <DailyTableRow key={index} daily={daily} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TraCuuDaiLy;
