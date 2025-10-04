import React, { useState } from 'react'
import lock_icon from '../assets/lock_icon_for_password.png'
import { useRef } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";






const NewPasswordInput = () => {

    const [password, setPassword] = useState("");

    const [newPassword, setNewPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');




    const handelNewPWInput = (e) => {
        // e.preventDefault();
    }



    const conditions = [
        { text: "At least 8 characters", valid: newPassword.length >= 8 },
        { text: "At least 1 uppercase letter", valid: /[A-Z]/.test(newPassword) },
        { text: "At least 1 number", valid: /\d/.test(newPassword) },
        { text: "At least 1 special character", valid: /[@$!%*?&#]/.test(newPassword) },
    ];


    // Strength checker
    const getStrength = () => {
        let strength = 0;
        if (newPassword.length >= 8) strength++;
        if (/[A-Z]/.test(newPassword)) strength++;
        if (/\d/.test(newPassword)) strength++;
        if (/[@$!%*?&#]/.test(newPassword)) strength++;
        return strength;
    };
    const strength = getStrength();



    return (
        <>
            <div>
                <div className='border-0 p-2 w-auto flex justify-center items-center ' >
                    <div className='w-20 bg-gradient-to-b from-[#5060eb56]   to-[rgba(0,0,0,0.42)] px-4 py-[18px] border-1 border-[#4A5CFF] rounded-[50%] flex items-center justify-center'>
                        <img className='w-[90%]' src="src/assets/faKey.png" alt="" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center ">
                    Enter new password
                </h2>

                <p className="mt-2 text-base text-gray-200 text-center">Please enter unique and strong password.</p>

                <form className="mt-8 md:mt-4 ">

                    {/* <label htmlFor='email' className="block text-sm font-medium text-gray-300">Email</label> */}
                    <div className='mt-1 border-0  relative '>
                        <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            type='password'
                            name='new_password'
                            placeholder='New Password'
                            className=" w-full  h-12 md:h-10  pl-10 py-0 rounded-lg bg-[#20242d4c] text-gray-200 border-2 border-[rgba(255,255,255,0.32)] focus:border-2 focus:border-gray-600 focus:outline-none" />
                        {/* <p className=''>M</p> */}

                        <img
                            className="w-[14px] opacity-70 absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            src={lock_icon}
                            alt="mail"
                        />
                    </div>


                    <div className="flex gap-1 mt-2 px-1 ">
                        {[1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`h-2 flex-1 rounded  ${strength >= level ? "bg-[#2dd575]" : "bg-[#9d9d9d4e]"}`}
                            >
                            </div>
                        ))}
                    </div>

                    {
                        <div
                            className="mt-2 p-2 pl-3 border-l-2 rounded-md bg-[#ffffff17] text-[white] text-sm space-y-1 flex flex-col"
                            style={{ lineHeight: 1.4 }}
                        >
                            {
                                conditions.map((c, i) => (
                                    <p key={i} className="flex items-center gap-2">
                                        {
                                            !c.valid ?
                                                <RiCloseCircleLine className="text-[#ff8a4fc8] text-lg" />
                                                :
                                                <IoMdCheckmarkCircleOutline className="text-[#2dd575] text-lg" />
                                        }
                                        {c.text}
                                    </p>

                                ))
                            }
                        </div>
                    }


                    <div className='mt-4 hidden border-0  relative'>
                        <input
                            type='password'
                            name='conform_password'
                            placeholder='Conform new password'
                            className=" w-full  h-12 md:h-10  pl-10 py-0 rounded-lg bg-[#20242d4c] text-gray-200 border-2 border-[rgba(255,255,255,0.32)] focus:border-2 focus:border-gray-600 focus:outline-none" />
                        {/* <p className=''>M</p> */}

                        <img
                            className="w-[14px] opacity-70 absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            src={lock_icon}
                            alt="mail"
                        />
                    </div>

                    {/* error message */}
                    <div className='mt-4 hidden p-1 pl-3 border-l-2 rounded-[6px] bg-[#ff8a4f17]  text-[#ff8a4fc8] text-sm' style={{ lineHeight: 1.4 }}>
                        Both password are not same
                    </div>
                    {/* <p>At least 8 character </p>
                    <p>At least 8 character </p>
                    <p>At least 8 character </p>
                    <p>At least 8 character </p> */}


                    <button
                        onClick={(e) => handelNewPWInput(e)}
                        type="submit"
                        className="w-full py-2 mt-4 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white  hover:bg-blue-700 transition font-bold"
                    >
                        Continue
                    </button>

                </form >
            </div >




        </>
    )
}

export default NewPasswordInput