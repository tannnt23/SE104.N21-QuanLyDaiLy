import { useState } from 'react'
import { queryEveryDaily } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

import TableXuatHang from './TableXuatHang'

function PhieuXuatHang() {
    const [selectedDaily, setSelectedDaily] = useState('');
    const { loading: dailyLoading, error: dailyError, data: dailyData } = useQuery(queryEveryDaily);
    if (dailyLoading) {
        return <div>Loading...</div>;
    }

    if (dailyError) {
        return <div>Error fetching dailyData</div>;
    }
    //ten dai ly
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
                    {dailyData.everyDaily.map((daily) => (
                        <option key={daily.MaDaiLy} value={daily.TenDaiLy}>
                            {daily.TenDaiLy}
                        </option>
                    ))}
                </select>
                <label htmlFor="daily-selection" className="block mb-2 font-bold">
                    Ngày lập phiếu
                </label>
                <input
                    type="date"
                    id="date-input"
                    className="border rounded-md p-2"
                    pattern="\d{2}-\d{2}-\d{4}"
                    placeholder="dd-mm-yyyy"
                />
            </div>
            <TableXuatHang />
        </div>
    )

}

export default PhieuXuatHang