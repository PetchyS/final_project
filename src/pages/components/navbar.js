import React, { useEffect, useState } from 'react';
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import axios from 'axios';
import { message } from 'antd';

function NavList() {
    const router = useRouter();

    const LogoutS = () => {
        router.push('/');
        message.success('ออกจากระบบเสร็จสิ้น');
    };
    return (
        <ul className="my-2 flex flex-col gap-2  text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6" style={{ fontFamily: 'Anuphan, sans-serif' }}>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors" style={{ fontFamily: 'Anuphan, sans-serif' }}>
                    หน้าหลัก
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors" style={{ fontFamily: 'Anuphan, sans-serif' }}>
                    จองคิวฝากสัตว์เลี้ยง
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors" style={{ fontFamily: 'Anuphan, sans-serif' }}>
                    จองคิวอาบน้ำ-ตัดขน
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium cursor-pointer"
            >
                <a onClick={LogoutS}  className="flex items-center hover:text-red-200 text-red-500 transition-colors" style={{ fontFamily: 'Anuphan, sans-serif' }}>
                    ออกจากระบบ
                </a>
            </Typography>
        </ul>
    );
}

const NavbarSimple = () => {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    //โค้ดใหม่
    const [data, setData] = useState({ members: [] });
    const router = useRouter();
    const id = router.query.id;
    const idu = parseInt(id, 10);

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
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-white" style={{ fontFamily: 'Anuphan, sans-serif' }}>
            <div className="flex items-center justify-between text-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                  
                >
                    <div style={{ fontFamily: 'Anuphan, sans-serif' }} className='flex'>สวัสดี : &nbsp;{data.members
                        ?.filter((item) => item.User_id === idu)
                        .map((item) => (
                            <span className=' text-blue-500' key={item.User_id}> {item.Name}</span>
                        ))}</div>
                </Typography>

                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto -mt-5 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}

export default NavbarSimple;