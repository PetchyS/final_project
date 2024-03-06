import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import Link from "next/link";

const ShowPetU = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const [data, setData] = useState([]);

    const showModal = (petId) => {
        setSelectedPetId(petId);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedPetId(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedPetId(null);
    };
    
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/view');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <ul className='overflow-x-auto flex bg-white rounded-3xl scroll-px-5 scroll-py-10'>
                    {data.map((item) => (
                        <li key={item.Pet_id}>
                            <div className='bg-slate-200 w-fit my-5 mx-3 p-10 cursor-pointer' onClick={() => showModal(item.Pet_id)}>
                                Name: {item.Name_pet}, Breeds: {item.Breeds}
                            </div>
                            <Modal title="ข้อมูลสัตว์เลี้ยง" okButtonProps={{ style: { backgroundColor: '#35A9FF' } }} open={isModalOpen} onOk={handleOk } onCancel={handleCancel} style={{ fontFamily: 'Anuphan, sans-serif' }}>
                                {selectedPetId && (
                                    <div>
                                        <div>
                                            Name: {data.find(item => item.Pet_id === selectedPetId)?.Name_pet}, Breeds: {data.find(item => item.Pet_id === selectedPetId)?.Breeds}
                                        </div>
                                        <Link href={`/Components/scoreU?id=${selectedPetId}`} className='text-center'>
                                            <button className=' bg-fuchsia-500 p-3 rounded-xl mt-5 text-white hover:text-blue-400'>Start Quiz</button>
                                        </Link>
                                    </div>
                                )}
                            </Modal>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default ShowPetU;