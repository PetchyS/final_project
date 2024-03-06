import { Dropdown, Button, Image } from 'antd';
import Head from 'next/head';
import GoogleMap from './components/Map';

const items = [
    {
        key: '1',
        label: (
            <a className='p-2 text-center border-b-2' style={{ fontFamily: 'Anuphan, sans-serif' }} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                ฝากสัตว์เลี้ยง
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a style={{ fontFamily: 'Anuphan, sans-serif' }} className=' p-2 text-center w-full' target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                อาบน้ำ ตัดขน
            </a>
        ),
    },
];

export default function Home() {
    return (
        <>
            <Head>
                <title>บ้านรักสัตว์ เมืองเลย</title>
                <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@300&display=swap" rel="stylesheet" />
                <link rel="icon" href="/logo_animal.png" />
            </Head>
            {/*  bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-sky-300 to-blue-200 */}
            <div className=" w-full bg-white" style={{ fontFamily: 'Anuphan, sans-serif' }}>
                <div className='md:pt-8 pb-5 mx-auto max-w-5xl text-right ' >
                    <div className='grid grid-cols-3 md:grid-cols-5 px-5 md:px-0 '>
                        <a href="/login?_redirect=https%3A%2F%2Fjamstacker.studio%2Fthankyou#" className='col-end-6 border-b-2 px-5 rounded-t-xl text-xs md:text-base mt-5 bg-opacity-30 py-2 border-b-gray-600 text-blue-400 cursor-pointer capitalize hover:text-xl hover:text-blue-300 duration-500 link-underline'>
                            Login/Register
                        </a>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:mt-0 mt-12'>
                    <div>
                        <div style={{ fontFamily: 'Anuphan, sans-serif' }} className='text-black text-end mr-5 mt-20 md:mt-24'>
                            <Dropdown className='bg-black text-xs lg:text-base shadow-lg p-1 md:p-2 rounded-3xl ms-2 nav-links px-6 md:px-12 cursor-pointer capitalize font-medium text-white hover:scale-110 hover:text-black hover:bg-white duration-200 link-underline'
                                menu={{
                                    items,
                                }} 
                                placement="top"
                                arrow={{
                                    pointAtCenter: true,
                                }}
                            >
                                <button>จองเลย</button>
                            </Dropdown>
                            <div className='mt-5 md:text-base text-xs'>
                                <p>เปิดให้บริการ 10.00 น. ถึง 17.00 น. </p><p> สนใจจองล่วงหน้า 1 วัน</p>
                            </div>
                        </div>
                    </div>
                    <div className='pl-5 border-l-4 h-full pb-20 '>
                        <img className='invert brightness-100 md:scale-100 md:-ml-0 -ml-9 scale-50' width={150} height={150} alt='logo' src="/dogC.png" />

                        <p className=' text-3xl md:text-6xl font-extrabold -mt-4 md:mt-2 text-slate-600'>บ้านรักสัตว์</p>
                        <p className=' text-2xl md:text-5xl font-semibold mt-1 text-blue-400'>เมืองเลย</p>
                        <div className=' text-xs md:text-xl mt-2 md:mt-6 my-auto text-blue-400'>บริการรับฝากสัตว์เลี้ยง อาบน้ำ ตัดขน</div>

                    </div>
                </div>
                <div className='text-black mt-12 grid-cols-5 gap-3 md:gap-4 flex  lg:mt-8 justify-center text-xs md:text-base cursor-pointer'>
                    <div className='border px-4 border-gray-700 rounded-xl'>หน้าหลัก</div>|
                    <div className='border px-4 border-gray-700 rounded-xl'>เกร็ดความรู้ ?</div>|
                    <a href='/form_pet#' className='border border-gray-700 px-4 rounded-xl'>คำนวณมวลสัตว์เลี้ยง</a>
                </div>

                <div className='px-2 mx-auto max-w-5xl grid gap-4 lg:grid-cols-3 pt-8 grid-cols-2'>

                    <div className='bg-gray-200  w-full h-24 col-span-2'>
                    </div>
                    <div className=' w-full rounded-3xl col-span-2 lg:col-span-1'>
                        <p className='bg-gray-400 text-white w-full p-5'>ที่ตั้งของบ้านรักสัตว์ เมืองเลย</p>
                        <GoogleMap ></GoogleMap>
                    </div>
                </div>
            </div>
        </>
    );
}
