import { useState, useEffect } from 'react';
import { queryEveryDaily } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import TableXuatHang from './TableXuatHang';

function PhieuXuatHang() {
    const [selectedDaily, setSelectedDaily] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');

    const { loading: dailyLoading, error: dailyError, data: dailyData } = useQuery(queryEveryDaily);

    useEffect(() => {
        console.log(selectedDaily); // Log the updated value of selectedDaily
    }, [selectedDaily]);

    if (dailyLoading) {
        return <div>Loading...</div>;
    }

    if (dailyError) {
        return <div>Error fetching dailyData</div>;
    }

    const handleSelectionChange = (event) => {
        setSelectedDaily(event.target.value);
    };


    return (
        <div>
            <div className="mb-4">
                <label htmlFor="daily-selection" className="block mb-2 font-bold">
                    Tên đại lý
                </label>
                <select
                    id="daily-selection"
                    value={selectedDaily}
                    onChange={handleSelectionChange}
                    className="border rounded-md p-2 mb-4"
                >
                    <option value="">Chọn đại lý...</option>
                    {dailyData.everyDaily.map((daily) => (
                        <option key={daily.MaDaiLy} value={daily.MaDaiLy}>
                            {daily.TenDaiLy}
                        </option>
                    ))}
                </select>

            </div>

            <TableXuatHang daily={selectedDaily} />
        </div>
    );
}

export default PhieuXuatHang;
