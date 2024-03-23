'use client'

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { emailVerify } from '../../APIs/index'
import CircularProgress from '@mui/material/CircularProgress';


let currentOTPIndex = 0;
const EmailVerification = () => {
    const router = useRouter()
    const [otp, setOtp] = useState(new Array(8).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const [maskMail, setMaskMail] = useState("ran@gmail.com")
    const inputRef = useRef(null);


    const handleOnChange = ({ target }) => {
        const { value } = target;
        const newOTP = [...otp];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);

        if (!value) setActiveOTPIndex(currentOTPIndex - 1);
        else setActiveOTPIndex(currentOTPIndex + 1);

        setOtp(newOTP);
    };

    const handleOnKeyDown = (e, index) => {
        currentOTPIndex = index;
        if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    const otpSubmit = async (e) => {
        e.preventDefault()

        let email = localStorage.getItem("email")
        if (otp.join('').length < 8) {
            return
        }
        try {
            setLoading(true)
            const response = await emailVerify({
                email: email, "verificationCode": otp.join('')
            })
            if (response.status == 200) {
                router.push("/LoginPage")
            }
        } catch (error) {
            console.log(error.message);
        }
        finally {
            setLoading(false)
        }
    }


    function maskEmail(email) {
        // Split the email address at the "@" symbol
        const [username, domain] = email.split('@');

        // Extract the first three characters of the username
        const maskedUsername = username.substring(0, 3) + '***';

        // Concatenate the masked username with the domain and return the masked email
        return `${maskedUsername}@${domain}`;
    }

    useEffect(() => {
        const email = typeof localStorage !== 'undefined' ? localStorage.getItem('email') : null;
        setMaskMail(maskEmail(email));
    }, [])

    return (
        <div className='h-screen flex items-center justify-center'>
            <form onSubmit={otpSubmit}>
                <div className="min-h-[500px] w-[576px] border rounded-lg flex flex-col items-center pt-[20px] gap-5 relative">
                    <h1 className="font-bold text-[1.5rem] mb-2">Verify your email</h1>
                    <h1 className="font-medium text-[1.3rem] mb-2 text-center">Enter the 8 digit code you have received on <br />
                        {maskMail}</h1>
                    <div>
                        <p className="relative left-2">Code</p> <br />
                        {otp.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <input
                                        ref={activeOTPIndex === index ? inputRef : null}
                                        type="number"
                                        className="mx-2 w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                                        onChange={handleOnChange}
                                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                                        value={otp[index]}
                                    />
                                    {index === otp.length - 1 ? null : (
                                        <span className="w-2 py-0.5 bg-gray-400" />
                                    )}
                                </React.Fragment>
                            );
                        })}

                    </div>
                    <button
                        className="w-[80%] bg-black mx-auto py-2 text-white rounded-md absolute bottom-10"
                        type="submit"
                    >
                        {loading ? (<CircularProgress color="success" />) : (<p>VERIFY</p>)}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerification;
