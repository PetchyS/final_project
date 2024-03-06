import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { message } from 'antd';

const quiz = {
    questions: [
        {
            id: 1,
            question: 'จุดที่ 1 ซี่โครง',
            image: '/dog1.png',
            answers: [
                { value: 5, text: 'คลำซี่โครงไม่เจอ', Number: 1 },
                { value: 3, text: 'มองไม่เห็นซี่โครง แต่สามารถคลำพบได้', Number: 2 },
                { value: 1, text: 'มองเห็นด้วยตาเปล่า โดยไม่ต้องคลำ', Number: 3 },
            ],
        },
        {
            id: 2,
            question: 'จุดที่ 2 หัวไหล่',
            image: '/dog2.png',
            answers: [
                { value: 5, text: 'บริเวณหัวไหลมีไขมันปกคลุม', Number: 1 },
                { value: 3, text: 'หัวไหล่กลมมน', Number: 2 },
                { value: 1, text: 'มองเห็นกระดูกหัวไหล่ชัดเจน ไม่มีไขมันปกคุลม', Number: 3 },
            ],
        },
        {
            id: 3,
            question: 'จุดที่ 3 หลัง',
            image: '/dog3.png',
            answers: [
                { value: 5, text: 'มองไม่เห็นกระดูกสันหลัง', Number: 1 },
                { value: 3, text: 'มองกระดูกสันหลังไม่เห็น แต่สามารถคลำพบได้', Number: 2 },
                { value: 1, text: 'มองเห็นด้วยตาเปล่า โดยไม่ต้องคลำ', Number: 3 },
            ],
        },
        {
            id: 4,
            question: 'จุดที่ 4 กระดูกเชิงกราน',
            image: '/dog4.png',
            answers: [
                { value: 5, text: 'มีไขมันหนาบริเวณกระดูกเชิงกรานจนมองไม่เห็นกระดูก', Number: 1 },
                { value: 3, text: 'ไขมันและกล้ามเนื้อปกคลุมเชิงกรานบางๆ ซึ่งสามารถคลำพบกระดูกเชิงกรานได้', Number: 2 },
                { value: 1, text: 'มองเห็นกระดูกเชิงกรานได้อย่างชัดเจน', Number: 3 },
            ],
        },
        // ... (Repeat for other questions)
    ],
};

const quizPet = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [checked, setChecked] = useState('false');
    const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        totalValue: 0,
    });

    const [selectedNumbers, setSelectedNumbers] = useState(Array(quiz.questions.length).fill(null));

    const router = useRouter();
    const { id } = router.query; //ส่งค่าไอดีสัตว์เลี้ยงนั้นๆ จากไฟล์ก่อนมายังแบบประเมิน
    const idu = parseInt(id, 10);


    const { questions } = quiz;
    const { question, answers, image } = questions[activeQuestion];

    const onAnswerSelected = (answer, idx) => {
        setChecked(true);
        setSelectAnswerIndex(idx);
        setSelectedAnswer(answer);
        setSelectedNumbers((prev) => {
            const newSelectedNumbers = [...prev];
            newSelectedNumbers[activeQuestion] = answer.Number;
            return newSelectedNumbers;
        });
    };

    const nextQuestion = () => {
        setSelectAnswerIndex(null);

        setResult((prev) => ({
            ...prev,
            totalValue: prev.totalValue + selectedAnswer.value,
        }));

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
        setChecked(false);
    };

    const restartQuiz = () => {
        setShowResult(false);
        setActiveQuestion(0);
        setResult({
            totalValue: 0,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/insert_health', formData);
            message.success('บันทึกการประเมินเรียบร้อย');
            router.back();
        } catch (error) {
            message.error('Error inserting data:', error);
        }
    };

    const formData = {
        Pet_id: id,
        Question_1: selectedNumbers[0],
        Question_2: selectedNumbers[1],
        Question_3: selectedNumbers[2],
        Question_4: selectedNumbers[3],
        Result_score: result.totalValue / questions.length
    };

    console.log(formData)

    return (
        <div className='bg-blue-100 h-screen font-medium text-black' style={{ fontFamily: 'Anuphan, sans-serif' }}>
            <div className='mx-auto max-w-4xl px-2 pt-10'> <a href="javascript:history.back()" className='bg-white px-3 py-1 '>Home</a>
                <h1 className='text-2xl border-white rounded-xl text-black p-2 bg-white border-l-8 rounded-l-none border-l-blue-800 mt-5 '>ประเมินความสมบูรณ์ของสุนัขและแมว</h1>
                <div>
                    <h2 className='my-5'>
                        <span className='bg-white py-1 pl-3'>ข้อคำถาม:&nbsp;</span>
                        <span className=' font-semibold text-violet-100 bg-gray-700 px-2 py-1'>{activeQuestion + 1}/{questions.length}</span>
                    </h2>
                </div>
                <div>
                    {!showResult ? (
                        <div className='bg-white p-5 rounded-xl border-r-8 border-r-slate-200 border-b-slate-300 border-b-8'>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                <img className=' rounded-2xl' src={image} alt={`Image for question ${activeQuestion + 1}`} />
                                <div>
                                    <h3 className=' text-end text-3xl border-b-2 pb-3 border-gray-300 text-black '>{question}</h3>
                                    <ul>
                                        {answers.map((answer, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => onAnswerSelected(answer, idx)}
                                                className='my-5'
                                            >
                                                <button className='focus:bg-blue-100 focus:text-lg focus:text-black duration-500 cursor-pointer w-full text-start bg-white rounded-lg border p-3 hover:bg-slate-100'>{answer.text}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className=' text-end'>
                                {checked ? (
                                    <button onClick={nextQuestion}
                                        className=" scale-75 overflow-hidden w-32 p-2 h-12 bg-slate-500 text-white border-none rounded-full text-xl font-bold cursor-pointer relative z-10 group"
                                    >
                                        {activeQuestion === question.length + 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                                        ></span>
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                                        ></span>
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"
                                        ></span>
                                        <span
                                            className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                                        >Go!
                                        </span>
                                    </button>
                                ) : (
                                    <button onClick={nextQuestion} disabled
                                        className=" scale-75 overflow-hidden w-32 p-2 h-12 bg-slate-200 text-white border-none rounded-full text-xl font-bold cursor-pointer relative z-10 group"
                                    >
                                        {activeQuestion === question.length + 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                                        ></span>
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-slate-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                                        ></span>
                                        <span
                                            className="absolute w-36 h-32 -top-8 -left-2 bg-slate-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"
                                        ></span>
                                        <span
                                            className="group-hover:opacity-100 text-base group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                                        >เลือกคำตอบ
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='text-end'>
                            <div className=' px-4 text-end -mt-5'>
                                <button disabled className='text-lg text-black  bg-white mb-1 border-b-white rounded-t-3xl px-5 py-1'>ผลลัพธ์ที่ได้</button></div>
                            <div className='text-center bg-white text-black rounded-2xl py-10 px-8'>
                                {(result.totalValue / questions.length) <= 1.99 ? (
                                    <div>
                                        <p className=' text-4xl font-bold text-white py-5 rounded-full bg-black max-w-xs mx-auto'>ขาดอาหาร</p>
                                        <p className='text-start text-lg mt-5 mb-2 text-gray-600 font-semibold'>การดูแลเบื้องต้น :</p>
                                        <p className=' text-base text-start font-normal indent-8 '>
                                            ช่วงแรกพลังงานที่ได้ควรมาจาก อาหารที่มีไขมันและคาร์โบไฮเดรท เป็นอาหารที่คุณค่าทางโภชนาการที่สูงและย่อยง่าย อีกทั้งกระเพาะอาหารที่มีขนาดเล็กลงจากการอดอาหารเป็นเวลานาน อาจต้องใช้ระยะเวลาปรับตัวอย่างน้อย  3-7 วัน จึงแนะนำให้แบ่งให้อาหารเป็นมื้อเล็ก ๆ โดยให้ทุก ๆ 6 ชั่วโมง แทนที่จะให้มื้อใหญ่วันละ  1-2 ครั้ง และควรได้รับอาหารเริ่มต้นที่ 25% ของความต้องการพลังงานปกติต่อวัน โดยคำนวณปริมาณพลังงานจากสูตร RER = (น้ำหนักตัวเป็นกิโลกรัม x 30) + 70 ก็จะได้ออกมาเป็นพลังงานกิโลแคลอรี่ต่อวันที่ร่างการต้องปกติในขณะพัก หลังจากผ่านไป 24 ชั่วโมงแรกก็ค่อยเพิ่มปริมาณอาหารขึ้นอย่างช้า ๆ จนพอครบ 3-5 วัน จึงค่อยให้อาหารเต็มที่ตามความต้องการของพลังงานปกติต่อวัน
                                        </p>
                                    </div>
                                ) : (result.totalValue / questions.length) <= 2.99 ? (
                                    <div>
                                        <p className=' text-4xl font-bold text-white py-5 rounded-full bg-amber-400 max-w-xs mx-auto '>ผอม</p>
                                        <p className='text-start text-lg mt-5 mb-2 text-gray-600 font-semibold'>การดูแลเบื้องต้น :</p>
                                        <p className=' text-base text-start font-normal indent-8 '>
                                            โดยทั่วไปควรให้อาหารสัตว์เลี้ยงโตเต็มวัย 2 มื้อต่อวัน แต่อาจแบ่งจำนวนอาหารต่อวันออกเป็นมื้อเล็กๆ และให้บ่อยขึ้น ซึ่งสามารถช่วยดูแลการย่อยและช่วยลดการทำงานของกระเพาะอาหารให้น้อยลง นอกจากนี้ยังสามารถให้อาหารมากกว่าปกติเล็กน้อย และการทำให้อาหารเปียกขึ้นไม่ว่าจะด้วยการให้อาหารกระป๋องหรือใส่น้ำลงในเม็ดอาหารช่วยกระตุ้นให้กินอาหารง่ายขึ้นมากกว่ากินอาหารแห้ง
                                        </p>
                                    </div>
                                ) : (result.totalValue / questions.length) <= 3.99 ? (
                                    <div>
                                        <p className=' text-4xl font-bold text-white  py-5 rounded-full bg-lime-400 max-w-sm mx-auto '>หุ่นดี ไม่อ้วนไม่ผอม</p>
                                        <p className='text-start text-lg mt-5 mb-2 text-gray-600 font-semibold'>เจ๋งสุดๆ !!! :</p>
                                        <p className=' text-base text-start font-normal indent-8 '>
                                            สัตว์เลี้ยงของคุณมีสุขภาพร่างกายที่ดี มีหุ่นสมส่วน แสดงออกถึงการดูแลเอาใจใส่อย่างดีจากคุณ หากสัตว์เลี้ยงของคุณเป็นสุนัข คุณอาจจะพาน้องไปเดินเล่น เพื่อลดความเครียดและใช้พลังงานที่มีอย่างล้นเหลือของน้องๆได้
                                        </p>
                                    </div>
                                ) : (result.totalValue / questions.length) <= 4.99 ? (
                                    <div>
                                        <p className=' text-4xl font-bold text-white  py-5 rounded-full bg-orange-500 max-w-sm mx-auto '>น้ำหนักเกิน</p>
                                        <p className='text-start text-lg mt-5 mb-2 text-gray-600 font-semibold'>การดูแลเบื้องต้น :</p>
                                        <p className=' text-base text-start font-normal indent-8 '>
                                            การให้อาหารควรแบ่งให้วันละ 2-4 มื้อ โดยแบ่งให้จากพลังงานที่คำนวณได้ต่อวัน การแบ่งให้วันละหลายๆ มื้อมีข้อดี คือ ช่วยกระตุ้นร่างกายให้เกิดการเผาผลาญอาหารได้ดีกว่าให้เพียงวันละมื้อเดียว อีกทั้งยังช่วยลดความหิวของน้องหมาได้มากกว่า การออกกำลังกายร่วมกับการควบคุมอาหารจะช่วยให้การลดน้ำหนักได้ผลดียิ่งขึ้น  การออกกำลังกายที่แนะนำได้แก่ การว่ายน้ำและเดินสายพานใต้น้ำ เนื่องจากจะลดแรงกระแทกของกระดูกและข้อต่อ ซึ่งสุนัขอ้วนมักมีปัญหาด้านนี้ โดยควรออกกำลังอย่างสม่ำเสมอ อย่างน้อยสัปดาห์ละ 2 ครั้ง เพื่อให้ได้ผลสูงสุด  การออกกำลังกายนอกจากเพิ่มการเผาผลาญแล้ว ยังช่วยเพิ่มกล้ามเนื้อ ทำให้ fit and firm ขึ้นด้วย
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className=' text-4xl font-bold text-white  py-5 rounded-full bg-red-600 max-w-sm mx-auto '>โรคอ้วน</p>
                                        <p className='text-start text-lg mt-5 mb-2 text-gray-600 font-semibold'>การดูแลเบื้องต้น :</p>
                                        <p className=' text-base text-start font-normal indent-8 '>
                                            การควบคุมอาหารเป็นการรักษาโรคอ้วนในน้องหมาที่ดีที่สุดถ้าทำอย่างถูกวิธี การลดน้ำหนักน้องหมาควรทำภายใต้การดูแลของสัตวแพทย์ เพื่อดูว่าน้องหมาของเราอ้วนจริงหรือไม่ น้ำหนักที่ควรจะเป็นอยู่ที่เท่าไหร่ แล้วจึงจะคำนวณปริมาณพลังงานและอาหารที่ต้องการต่อวัน นอกจากนี้ยังต้องติดตามผลด้วยว่าน้ำหนักลดช้าหรือเร็วเกินไปหรือไม่
                                        </p>
                                    </div>
                                )}
                            </div>

                            <input name='Result' value={result.totalValue / questions.length} type="hidden" />
                            <button onClick={restartQuiz}
                                className="relative mt-5 py-3 px-8 text-gray-700 text-base font-bold "
                            >
                                ทำแบบประเมินอีกครั้ง
                            </button>
                            <a>
                                <button
                                    onClick={handleSubmit}
                                    className="relative mt-5 py-3 px-8 text-white bg-blue-400 text-base font-bold overflow-hidden rounded-2xl transition-all duration-400 ease-in-out shadow-md hover:scale-110 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
                                >
                                    บันทึก
                                </button></a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default quizPet;
