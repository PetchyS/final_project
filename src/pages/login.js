import { message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import { useAuth } from './AuthContext';   00

export default function Login() {
  const router = useRouter();
  const [User_Id, setUser_Id] = useState(null);
  // const { login } = useAuth();   00

  const [Email, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        handleLoginSuccess(data.user);
      } else {
        console.error('Login failed');
        message.error("เข้าสู่ระบบผิดพลาด โปรดตรวจสอบ Email Password")
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleLoginSuccess = (user) => {
    // login(user);     00
    if (user.Role === 'user') {
      setUser_Id(user.User_id);

      message.success("เข้าสู่ระบบสำเร็จ");

      router.push({
        pathname: '/mainU',
        query: { id: user.User_id },
      });
    } else if (user.Role === 'admin') {
      router.push({
        pathname: '/score',
      });
    }
  }

  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@300&display=swap" rel="stylesheet" />
      </Head>

      <div className=" w-full h-auto bg-white " style={{ fontFamily: 'Anuphan, sans-serif' }}>
        <div className=' pb-12 md:pb-36 bg-blue-200 pt-8 rounded-b-3xl md:rounded-b-full'>
        <div className='text-black mt-5 grid-cols-5 gap-3 md:gap-4 flex  lg:mt-8 justify-center text-xs md:text-base cursor-pointer'>
                    <a href='/#' className='border px-4 border-gray-700 rounded-xl'>หน้าหลัก</a>|
                    <div className='border px-4 border-gray-700 rounded-xl'>เกร็ดความรู้ ?</div>|
                    <a href='/score#' className='border border-gray-700 px-4 rounded-xl'>คำนวณมวลสัตว์เลี้ยง</a>
                </div>
        </div>


        <div className=' mx-auto max-w-5xl pt-10 -mt-0 md:-mt-32 grid grid-cols-1 md:grid-cols-2 px-5 gap-y-5' >

          <div className='text-center self-center'>
            <div className='w-full text-start '>
              {/* <img className='' width={140} height={140} alt='logo' src="/logo_animal.png" /> */}
            </div>
            <p className=' text-blue-400 text-xl md:text-4xl px-7 md:px-0'>บ้านรัก สัตว์ เมืองเลย</p>
            <p className=' text-slate-600 text-xs mt-2 md:text-xl px-7 md:px-0 '>บริการรับฝากสัตว์เลี้ยง อาบน้ำ ตัดขน</p>
          </div>

          <div class="bg-white scale-90 rounded-2xl shadow-xl relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
            <div class="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
              <div class="flex flex-col">
                <div>
                  <h2 class="text-2xl text-black">Login</h2>
                </div>
              </div>
              <form>
                <input value="https://jamstacker.studio/thankyou" type="hidden" name="_redirect" />
                <div class="mt-4 space-y-6">
                  <div class="col-span-full">
                    <label class="block mb-3 text-sm font-medium text-gray-600"> email</label>
                    <input
                      value={Email}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Example@Gmail.com"
                      class="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                  </div>
                  <div class="col-span-full">
                    <label class="block mb-3 text-sm font-medium text-gray-600">  password   </label>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      class="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                  </div>
                  <div class="col-span-full">
                    <button onClick={handleLogin} type="submit" class="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-none border-2 border-black rounded-full nline-flex hover:bg-black hover:border-black hover:text-white focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"> Enter   </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className=' col-span-full h-96 bg-slate-100/50 shadow-xl rounded-2xl'></div>
        </div>
      </div>
    </>
  );
}
