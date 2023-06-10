import BackButton from "../../component/button/backbutton/BackButton";

import { useQuery, useMutation } from '@apollo/client';
import { queryEveryDaily } from '../../graphql/queries';
import {updateDailyMutation, addPhieuthutienMutation} from '../../graphql/mutations'
import { useState, useEffect } from 'react';

function LapPhieuThuTien() {
    const { loading, error, data } = useQuery(queryEveryDaily);

    const [daiLy, setDaiLy] = useState([])
    const [thuTien, setThuTien] = useState(0)
    const [showNo, setShowNo] = useState(false)
    const [tienNo, setTienNo] = useState('0')
    const [daiLyDuocChon, setDaiLyDuocChon] = useState('option 0')

    useEffect(() => {
        if (data) {
            console.log(data)
            setDaiLy(data.everyDaily);
        }
    }, [data, daiLy]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleShowNo = (e) => {
        e.preventDefault();

        let option = 0
        let choosen = {}

        
        option = parseInt(daiLyDuocChon.split(' ')[1])
        choosen = daiLy[option]

        setTienNo(`${choosen.TenDaiLy}: ${choosen.TienNo}`)
        setShowNo(true)
    }

    const handleChonDaiLy = (e) => {
        setDaiLyDuocChon(e.target.value)
    }

    return (
        <div>
            <BackButton />
            {/* Heading */}
            <div className="flex flex justify-center">
                <h2 className="text-4xl font-bold">Phiếu Thu Tiền</h2>
            </div>
            {/* Form */}
            <div>
                <form className="p-4">
                    <div className="flex flex-col w-1/3">
                        <div className="">
                            <label htmlFor="combo-box" className="block mb-2">Tên đại lý</label>
                            <select id="combo-box" name="combo-box" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={daiLyDuocChon}
                                onChange={handleChonDaiLy}
                            >
                                {daiLy.map((item, index) => (
                                    <option key={index} value={`option ${index}`}>{item.TenDaiLy}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="date-input" className="block mt-4 mb-2">Ngày lập phiếu</label>
                            <input type="date" id="date-input" name="date-input" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-2/3 ">
                        <input className='w-96 border border-gray-500 rounded-lg p-2 mb-2' type="number" placeholder="Nhập số tiền (VNĐ)" value={thuTien} onChange={(e) => setThuTien(e.target.value)} />
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleShowNo} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer">
                            Xem nợ</button>
                        {showNo && (
                            <div className="mx-4 px-4 py-2">
                                {tienNo}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end w-4/5 ">
                        <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer" />
                    </div>

                </form>
            </div>

        </div>
    )
}

export default LapPhieuThuTien