import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";
import Success from "../../component/pop_up/Success";

import { useQuery, useMutation } from '@apollo/client';
import { queryEveryDaily } from '../../graphql/queries';
import { updateDailyMutation, addPhieuthutienMutation } from '../../graphql/mutations'
import { updateDailyMutation, addPhieuthutienMutation } from '../../graphql/mutations'
import { useState, useEffect } from 'react';

function LapPhieuThuTien() {
    const { loading, error, data } = useQuery(queryEveryDaily);
    const [updateFunc, updateDataReturn] = useMutation(updateDailyMutation)
    const [addFunc, addDataReturn] = useMutation(addPhieuthutienMutation)

    const [daiLy, setDaiLy] = useState([])
    const [thuTien, setThuTien] = useState(0)
    const [showNo, setShowNo] = useState(false)
    const [tienNo, setTienNo] = useState(0.0)
    const [daiLyDuocChon, setDaiLyDuocChon] = useState('option 0')
    const [showError, setShowError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(null);

    useEffect(() => {
        if (data) {
            // console.log(data)
            setDaiLy(data.everyDaily);
        }

        if (addDataReturn.error) setShowError(addDataReturn.error)
        if (updateDataReturn.error) setShowError(updateDataReturn.error)

    }, [data, daiLy, updateDataReturn, addDataReturn]);

    if (loading) return <div>Loading...</div>;
    if (error) return setShowError(error);

    const handleShowNo = (e) => {
        e.preventDefault();

        let option = 0
        let choosen = {}



        option = parseInt(daiLyDuocChon.split(' ')[1])
        choosen = daiLy[option]

        setTienNo(parseFloat(choosen.TienNo))
        setShowNo(true)
    }

    const handleChonDaiLy = (e) => {
        setShowError(null)
        setShowSuccess(null)
        setDaiLyDuocChon(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let choosen = daiLy[parseInt(daiLyDuocChon.split(' ')[1])]
        let date = document.querySelector('#date-input').value

        if (thuTien > choosen.TienNo) setShowError({ message: 'Tiền thu phải nhỏ hơn số tiền đại lý nợ' })
        else {
            await addFunc({
                variables: {
                    ngayThuTien: date,
                    maDaiLy: choosen.MaDaiLy,
                    soTienThu: parseFloat(thuTien)
                }
            })
            await updateFunc({
                variables: {
                    ...choosen,
                    TienNo: parseFloat(choosen.TienNo - thuTien)
                }
            })

            setTimeout(()=>{
                if (!updateDataReturn.error) {
                    setTienNo(choosen.TienNo - thuTien)
                    setShowSuccess(true)
                }
            }, 2000)
        }
    }

    return (
        <div>
            {showError && <Error error={showError} />}
            {showSuccess && <Success show={showSuccess}/>}
            {/* Heading */}
            <div className="flex justify-center items-center">
                <BackButton className="mr-4" />
                <h2 className="mb-4 text-4xl font-bold text-center w-full">Phiếu Thu Tiền</h2>
            </div>
            <div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-1/3">
                        <div className="">
                            <label htmlFor="combo-box" className="block mb-2">Tên đại lý</label>
                            <select required id="combo-box" name="combo-box" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            <input required type="date" id="date-input" name="date-input" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-2/3 ">
                        <input required className='w-96 border border-gray-500 rounded-lg p-2 mb-2' type="number" placeholder="Nhập số tiền (VNĐ)" value={thuTien}
                            onChange={(e) => {
                                setShowError(null)
                                setShowSuccess(null)
                                setThuTien(e.target.value)
                            }} />
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleShowNo} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer">
                            Xem nợ</button>
                        {showNo && (
                            <div className="mx-4 px-4 py-2">
                                {daiLy[parseInt(daiLyDuocChon.split(' ')[1])].TenDaiLy}: {tienNo}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-start w-4/5 ">
                        <input type="submit" value="Submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 ease-in-out transition duration-300 cursor-pointer" />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LapPhieuThuTien