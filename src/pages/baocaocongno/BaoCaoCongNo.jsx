import BackButton from "../../component/button/backbutton/BackButton";
import Error from "../../component/pop_up/Error";

import { useQuery, useLazyQuery } from '@apollo/client';
import {queryCt_bccnByTenDLAndThang,queryEveryDaily} from '../../graphql/queries';
import { useState, useEffect } from 'react';

function BaoCaoCongNo() {

    const [daiLy, setDaiLy] = useState([])
    const [name, setName] = useState('option 0');
    const [date, setDate] = useState('');
    const [tableData, setTableData] = useState(null);
    const [showError, setShowError] = useState(null);

    const { loading, error, data } = useQuery(queryEveryDaily);
    const [getDLViaMonth, dataQuery] = useLazyQuery(queryCt_bccnByTenDLAndThang);

    useEffect(() => {
        if (data) setDaiLy(data.everyDaily)
        
        if (dataQuery.data) {
            let data_ = dataQuery.data.ct_bccnByTenDLAndThang[0]
            //console.log(data_)
            setTableData({
                name: data_?.relatedDaily.TenDaiLy,
                noDau: data_?.NoDau,
                noCuoi: data_?.NoCuoi,
                phatSinh: data_?.PhatSinh
            })
        }
        else (
            setShowError(dataQuery.error)
        )
    }, [data, dataQuery, showError]);

    if (loading) return <div>Loading...</div>;
    if (error) setShowError(error);

    const handleNameChange = (event) => {
        setShowError(null)
        setName(event.target.value);
    };

    const handleDateChange = (event) => {
        setShowError(null)
        setDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let option = parseInt(name.split(' ')[1])
        let tenDaiLy = daiLy[option].TenDaiLy

        await getDLViaMonth({
            variables: {
                'tenDaiLy': tenDaiLy,
                'thang': [date.split('-')[0], date.split('-')[1]].join('-')
            }
        })
    };

    const createCongNoTable = () => (

        <div className="mt-4 mx-auto">
            <h2 className="text-center text-xl mb-2">Báo cáo công nợ tháng {date.split('-')[1]} năm {date.split('-')[0]}</h2>
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
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">{tableData.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{tableData.noDau}</td>
                        <td className="border border-gray-300 px-4 py-2">{tableData.phatSinh}</td>
                        <td className="border border-gray-300 px-4 py-2">{tableData.noCuoi}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )

    return (
        <div>
            {showError && <Error error={showError} />}
            {/* Heading */}
            <div className="flex justify-center items-center">
                <BackButton className="mr-4" />
                <h2 className="mb-4 text-4xl font-bold text-center w-full">Báo cáo công nợ</h2>
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
                            <option key={index} value={`option ${index}`}>{item.TenDaiLy}</option>
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
            {
                tableData && createCongNoTable(tableData)
            }
        </div>
    )
}

export default BaoCaoCongNo