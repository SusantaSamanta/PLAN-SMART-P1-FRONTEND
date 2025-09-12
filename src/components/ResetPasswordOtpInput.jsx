import React, { useRef, useState } from 'react'

const ResetPasswordOtpInput = ({ setShowCurrentPage, email, length = 6, }) => {

    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (e, idx) => {
        const val = e.target.value;
        if (!/^\d?$/.test(val)) return; // allow only digits (or empty)

        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        if (val && idx < length - 1) inputsRef.current[idx + 1].focus();

        if (newOtp.every((d) => d !== "")) {
            // onComplete?.(newOtp.join(""));
            console.log(otp);

        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputsRef.current[idx - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, length);
        if (!/^\d+$/.test(paste)) return;

        const chars = paste.split("");
        const newOtp = [...otp];
        chars.forEach((ch, i) => newOtp[i] = ch);
        setOtp(newOtp);

        newOtp.forEach((_, i) => {
            if (inputsRef.current[i]) inputsRef.current[i].value = newOtp[i];
        });

        const nextIdx = chars.length < length ? chars.length : length - 1;
        inputsRef.current[nextIdx].focus();

        if (chars.length >= length) {
            onComplete?.(newOtp.join(""));
        }
    }

    const maskEmailConverter = (email) => {  //susantasamanta@gmail.com
        const [userName, domain] = email.split('@'); // [susantasamanta , gmail.com]
        const last4Letter = userName.slice(-4); // anta
        const maskedPart = "*".repeat(userName.length - 4) + last4Letter;  // 14-4 = 10 ('*') + anta
        return maskedPart + "@" + domain; // **********anta@gmail.com
    }



    const handelNewPasswordInput = (e) => {
        e.preventDefault();
        setShowCurrentPage('EnterNewPassword');
    }



    return (
        <>
            <div>
                <div className='border-0 p-2 w-auto flex justify-center items-center ' >
                    <div className='w-20 bg-gradient-to-b from-[#5060eb56]   to-[rgba(0,0,0,0.42)] px-4 py-[18px] border-1 border-[#4A5CFF] rounded-[50%] flex items-center justify-center'>
                        <img className='w-[90%]' src="src/assets/faKey.png" alt="" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center ">
                    Check Your Email
                </h2>

                <p className="mt-2 text-base text-gray-200 text-center">We've sent an verification code to the address{" "}
                    <span className='text-[#ffffff] md:text-[#4A5CFF]'>{maskEmailConverter(email)}</span>
                </p>
                <p className="mt-2 text-base text-gray-200 text-center">
                    Please check your inbox (and your spam folder, just in case) for our email.
                </p>

                <div className="flex gap-2 justify-center mt-6" onPaste={handlePaste}>
                    {otp.map((num, i) => (
                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            ref={(el) => (inputsRef.current[i] = el)}
                            value={num}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-10 h-10 text-center text-xl border-2 rounded bg-[#20242d4c] text-white focus:border-blue-500 outline-none"
                        />
                    ))}
                </div>
                <form className="mt-8 md:mt-4 ">



                    {/* error message */}
                    <div className='mt-4   p-1 pl-3 border-l-2  rounded-[6px] bg-[#ff8a4f17]  text-[#ff8a4fc8] text-sm' style={{ lineHeight: 1.4 }}>
                        The code you entered is incorrect.
                    </div>


                    <button
                        onClick={(e) => handelNewPasswordInput(e)}
                        type="submit"
                        className="w-full py-2 mt-4 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white  hover:bg-blue-700 transition font-bold"
                    >
                        Continue
                    </button>

                </form>
            </div>


        </>
    )
}

export default ResetPasswordOtpInput