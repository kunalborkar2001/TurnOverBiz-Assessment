"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { login } from '../../APIs/index'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';


const LoginPage = () => {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);


    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
    })
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await login(formData)
            if (response.status == 200) {
                localStorage.setItem("token", response?.data?.token);

                router.push("/CategoryPage")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <>

            <div className='h-screen flex items-center justify-center'>
                <div className="min-h-[500px] w-[576px] border rounded-lg flex flex-col items-center pt-[20px] gap-5">
                    <h1 className="font-bold text-[1.5rem] mb-2">Login</h1>
                    <h1 className="font-medium text-[1.3rem] mb-2">Welcome back to ECOMMERCE</h1>
                    <h1 className="font-light text-[1rem] mb-2">The next gen business marketplace</h1>

                    <form className="w-full flex flex-col gap-5" onSubmit={loginSubmit} >
                        <div className="w-[80%] flex flex-col mx-auto relative">
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input type="email" placeholder="Email here..." id="email" className="border mb-2 p-2 rounded-md"
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete='username'
                                required
                            />
                        </div>

                        <div className="w-[80%] flex flex-col mx-auto relative">
                            <label htmlFor="password" className="block mb-1">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password here..."
                                id="password"
                                className="border mb-2 p-2 rounded-md pr-10" // Add pr-10 for padding-right
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete='password'
                                required
                            />
                            <button
                                type="submit"
                                onClick={togglePasswordVisibility}
                                className="absolute top-7 right-0 mt-2 mr-2 focus:outline-none "
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button
                            className="w-[80%] bg-black mx-auto py-2 text-white rounded-md"
                            type="submit"
                        >
                            {loading ? (<CircularProgress color="success" />) : (<p>LOGIN</p>)}
                        </button>
                    </form>

                    <div className="font-light text-[.8rem]">
                        Don{"'"}t have An Account ? <Link href="/RegisterPage"><span className="font-bold">SIGN UP</span></Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;
