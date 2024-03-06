import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Collapse, Divider } from 'antd';
import axios from 'axios';
import Link from "next/link";
import NavbarSimple from './components/navbar';
// import { useAuth } from './AuthContext'; 00

export default function main_normal() {
  const router = useRouter();
  // const { user } = useAuth(); 00
  const id = router.query.id;
  const idu = parseInt(id, 10); //เมื่อแก้ไขเสร็จแล้วให้เลิอกใช้ตัวนี้แล้วไปใช้ตัวล่างแทน เลิกใช้ด้านล่าง ใช้แล้วรีเฟรชหาย
  // const idu = parseInt(user.User_id, 10);

  // useEffect(() => {    00
  //   // ทำตราบการที่ user มีค่า
  //   if (user) {
  //     console.log('User ID:', user.name);
  //     // ทำสิ่งที่คุณต้องการกับ User ID ที่ได้จาก user
  //   } console.log(user)
  // }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [data, setData] = useState({ pets: [], pet_health: [] });

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
    // เพิ่มบรรทัดนี้เพื่อรีเซ็ตข้อมูล pet_health เมื่อปิด modal
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
    <div className='bg-gray-100 h-screen font-medium text-black' style={{ fontFamily: 'Anuphan, sans-serif' }}>
      <div className='mx-auto max-w-4xl px-2 pt-10'>
        <NavbarSimple></NavbarSimple>
        <h1 className='text-xl mb-10 mt-8 border-white rounded-xl text-black p-2 bg-white border-l-8 rounded-l-none border-l-blue-800 '>หน้าหลัก</h1>
        <div>
          <h1 className='mb-3 ml-3'>สัตว์เลี้ยงของคุณ</h1>
          
          <div>
            <ul className='overflow-x-auto flex bg-white rounded-3xl scroll-px-5 scroll-py-10'>
              {data.pets
                .filter(item => item.User_id === idu)
                .map((item) => (
                  <li key={item.Pet_id}>
                    {/* <div className='bg-blue-100 rounded-3xl md:text-base text-sm w-fit my-5 mx-3 p-8 md:p-10 cursor-pointer' onClick={() => showModal(item.Pet_id)}> */}
                    <div className=' md:text-base text-sm w-fit my-10 px-8 md:px-10 cursor-pointer border-r-2' onClick={() => showModal(item.Pet_id)}>
                      <div className=' w-fit mb-5 mx-auto bg-blue-200 duration-500  hover:bg-white  p-2 rounded-xl '>
                        <svg className='hover:w-20 hover:h-20 duration-500 w-10 h-10 invert hover:invert-0' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                          <path d="m21.937,5.739L14.618.801c-1.589-1.073-3.646-1.074-5.236,0L2.063,5.739c-1.292.872-2.063,2.323-2.063,3.881v9.698c0,2.582,2.101,4.682,4.682,4.682h14.637c2.581,0,4.682-2.1,4.682-4.682v-9.698c0-1.558-.771-3.009-2.063-3.881Zm1.063,13.58c0,2.03-1.651,3.682-3.682,3.682H4.682c-2.03,0-3.682-1.651-3.682-3.682v-9.698c0-1.226.606-2.367,1.622-3.052L9.94,1.63c.626-.422,1.343-.633,2.06-.633s1.434.211,2.06.633l7.318,4.938c1.016.686,1.622,1.827,1.622,3.052v9.698Zm-8.52-10.318c-1.08,0-1.977.479-2.5,1.254-.523-.774-1.42-1.254-2.5-1.254-1.654,0-3,1.436-3,3.2,0,2.328,2.818,5.192,4.31,6.382.351.279.771.419,1.19.419s.841-.14,1.191-.419c1.49-1.188,4.309-4.052,4.309-6.381,0-1.765-1.346-3.2-3-3.2Zm-1.932,8.8c-.333.266-.801.268-1.136,0-1.633-1.303-3.933-3.902-3.933-5.6,0-1.213.897-2.2,2-2.2,1.178,0,2,.804,2,1.955,0,.276.224.5.5.5s.5-.224.5-.5c0-1.151.822-1.955,2-1.955,1.103,0,2,.987,2,2.2,0,1.699-2.299,4.297-3.932,5.6Z" />
                        </svg>
                      </div>
                      <div className='md:text-base text-sm'>ชื่อสัตว์เลี้ยง: {item.Name_pet}</div> <div className='md:text-sm text-xs mt-2'>ชนิดสัตว์เลี้ยง : {item.Types}</div>
                    </div>
                    <Modal width={750} footer titleFontSize title={<span style={{ fontSize: '24px' }}>ข้อมูลสัตว์เลี้ยง</span>} okButtonProps={{ style: { backgroundColor: '#35A9FF' } }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ fontFamily: 'Anuphan, sans-serif' }}>
                      {selectedPetId && (
                        <div>
                          <div className='grid grid-cols-3 gap-2 md:text-sm text-xs mt-5 font-bold text-gray-600'>
                            <div>
                              <span className=' font-normal text-black'>ชื่อสัตว์เลี้ยง:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Name_pet}
                            </div>
                            <div>
                              <span className=' font-normal text-black'>ประเภทสัตว์เลี้ยง:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Types}
                            </div>
                            <div>
                              <span className=' font-normal text-black'>สายพันธุ์:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Breeds}
                            </div>
                            <div>
                              <span className=' font-normal text-black'>ขนาด:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Size}
                            </div>
                            <div>
                              <span className=' font-normal text-black'>ลักษณะขน:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Hair}
                            </div>
                            <div className=' col-span-full md:col-span-1  md:mt-0 mt-5'>
                              <span className=' font-normal text-black'>การรับวัคซีนพิษสุนัขบ้า:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Vaccine} เข็ม
                            </div>
                            <div className=' col-span-full mt-0 md:mt-5'>
                              <span className=' font-normal text-black'>วันที่รับวัคซีนพิษสุนัขบ้าล่าสุด:</span> {new Date(data.pets.find(item => item.Pet_id === selectedPetId)?.Vaccine_date).toLocaleDateString('en-GB')}
                            </div>
                            <div className=' col-span-full'>
                              <span className=' font-normal text-black'>รายละเอียดสัตว์เลี้ยง:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Detail_p}
                            </div>
                            <div className=' col-span-full'>
                              <span className=' font-normal text-black'>โรคของสัตว์เลี้ยง:</span> {data.pets.find(item => item.Pet_id === selectedPetId)?.Disease}
                            </div>
                          </div>

                          <div className='w-full text-center'>
                            <Link href={`/components/form_petU?id=${selectedPetId}`} className='text-center w-full'>
                              <button className='hover:bg-blue-500 duration-700 p-3 rounded-xl mt-5 hover:text-white text-blue-500 hover:border-blue-500 border-2 border-blue-400 bg-white md:text-base text-sm'>แบบประเมินความสมบูรณ์ของสัตว์เลี้ยง (สุนัข/แมว)</button>
                            </Link>
                          </div>
                          <div>
                            <Divider orientation="left" style={{ fontFamily: 'Anuphan, sans-serif' }}>ผลลัพธ์การประเมินที่ผ่านมา</Divider>
                            <ul>
                              {data.pet_health
                                .filter(item => item.Pet_id === selectedPetId)
                                .map((item) => (
                                  <li key={item.Health_id}>
                                    <Collapse key={item.Pet_id} ghost style={{ fontFamily: 'Anuphan, sans-serif' }}
                                      size="small" className='text-xs md:text-base text-black'
                                      items={[
                                        {
                                          key: '1',
                                          label: <div>
                                            วันที่ : {new Date(item.Date_Time).toLocaleString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                            <div>ผลลัพธ์ : {
                                              (item.Result_score <= 1.99) ? (<span>ขาดอาหาร</span>) :
                                                (item.Result_score <= 2.99) ? (<span>ผอม</span>) :
                                                  (item.Result_score <= 3.99) ? (<span>หุ่นดี ไม่อ้วนไม่ผอม</span>) :
                                                    (item.Result_score <= 4.99) ? (<span>น้ำหนักเกิน</span>) :
                                                      (item.Result_score > 4.99) ? (<span>โรคอ้วน</span>) :
                                                        null
                                            }</div>
                                          </div>,
                                          children: <div>
                                            <div>
                                              ลักษณะซี่โครง : {
                                                (item.Question_1 === 1) ? (<span>คลำซี่โครงไม่เจอ</span>) :
                                                  (item.Question_1 === 2) ? (<span>มองไม่เห็นซี่โครง แต่สามารถคลำพบได้</span>) :
                                                    (item.Question_1 === 3) ? (<span>มองเห็นด้วยตาเปล่า โดยไม่ต้องคลำ</span>) :
                                                      null
                                              }
                                            </div>
                                            <div>
                                              ลักษณะหัวไหล่ : {
                                                (item.Question_2 === 1) ? (<span>บริเวณหัวไหลมีไขมันปกคลุม</span>) :
                                                  (item.Question_2 === 2) ? (<span>หัวไหล่กลมมน</span>) :
                                                    (item.Question_2 === 3) ? (<span>มองเห็นกระดูกหัวไหล่ชัดเจน ไม่มีไขมันปกคุลม</span>) :
                                                      null
                                              }
                                            </div>
                                            <div>
                                              ลักษณะหลัง : {
                                                (item.Question_3 === 1) ? (<span>มองไม่เห็นกระดูกสันหลัง</span>) :
                                                  (item.Question_3 === 2) ? (<span>มองกระดูกสันหลังไม่เห็น แต่สามารถคลำพบได้</span>) :
                                                    (item.Question_3 === 3) ? (<span>มองเห็นด้วยตาเปล่า โดยไม่ต้องคลำ</span>) :
                                                      null
                                              }
                                            </div>
                                            <div>
                                              ลักษณะกระดูกเชิงกราน : {
                                                (item.Question_4 === 1) ? (<span>มีไขมันหนาบริเวณกระดูกเชิงกรานจนมองไม่เห็นกระดูก</span>) :
                                                  (item.Question_4 === 2) ? (<span>ไขมันและกล้ามเนื้อปกคลุมเชิงกรานบางๆ ซึ่งสามารถคลำพบกระดูกเชิงกรานได้</span>) :
                                                    (item.Question_4 === 3) ? (<span>มองเห็นกระดูกเชิงกรานได้อย่างชัดเจน</span>) :
                                                      null
                                              }
                                            </div>
                                          </div>,
                                        },
                                      ]}
                                    />
                                  </li>
                                )).reverse()}
                            </ul>
                          </div>
                        </div>
                      )}

                    </Modal>
                  </li>
                )).reverse()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
