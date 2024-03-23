'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { register } from '../../APIs/index'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';


const RegisterPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // Call the register function with the formData
            const response = await register(formData);
            if (response.status == 201) {
                localStorage.setItem("email", response?.data?.user.email);
                router.push('/EmailVerification')
                
            }
            // Optionally, redirect to another page after successful registration
        } catch (error) {
            console.error('Error registering user:', error); // Log any errors
            // Optionally, display an error message to the user
        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            <div className='h-screen flex items-center justify-center'>
                <div className="min-h-[500px] w-[576px] border rounded-lg flex flex-col items-center pt-[20px] gap-5">
                    <h1 className="font-medium text-[1.5rem] mb-2">Create your account</h1>

                    <form className="w-full flex flex-col gap-5" onSubmit={registerSubmit} >

                        <div className="w-[80%] flex flex-col mx-auto">
                            <label htmlFor="name" className="block mb-1">Name</label>
                            <input type="text" placeholder="name" id="name" className="border mb-2 p-2 rounded-md"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                autoComplete='username'
                            />
                        </div>

                        <div className="w-[80%] flex flex-col mx-auto">
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input type="email" placeholder="Email here..." id="email" className="border mb-2 p-2 rounded-md"
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete='email'
                            />
                        </div>

                        <div className="w-[80%] flex flex-col mx-auto">
                            <label htmlFor="password" className="block mb-1">Password</label>
                            <input type="password" placeholder="Password here..." id="password" className="border mb-2 p-2 rounded-md"
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                autoComplete="password"
                            />
                        </div>

                        <button
                            className="w-[80%] bg-black mx-auto py-2 text-white rounded-md"
                            type="submit"

                        >
                            {loading ? (<CircularProgress color="success" />) : (<p>CREATE ACCOUNT</p>)}
                        </button>
                    </form>

                    <div className="font-light text-[.8rem]">
                        Have An Account ? <Link href="/LoginPage"><span className="font-bold">LOGIN</span></Link>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default RegisterPage