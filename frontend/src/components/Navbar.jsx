import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>

            <div className='h-[100px] border flex justify-between items-center px-5 flex-wrap relative'>
                <div>
                    <Link href="/LoginPage"> <h1 className='font-bold text-[1.6rem]'>ECOMMERCE</h1></Link>
                </div>
                <div className='hidden sm:block'>
                    <ul className='flex gap-4'>
                        <li className='font-medium'>Categories</li>
                        <li className='font-medium'>Sale</li>
                        <li className='font-medium'>Clearance</li>
                        <li className='font-medium'>New Stock</li>
                        <li className='font-medium'>Trending</li>
                    </ul>
                </div>
                <div className='flex mx-2'>

                    <p className='px-2'>
                        <SearchIcon />
                    </p>
                    <p className='px-2'>
                        <ShoppingCartIcon />
                    </p>
                </div>

                <div className='absolute flex gap-4 top-2 right-0 text-[.7rem] mr-5'>
                    <p>Help</p>
                    <p>Orders & Returns</p>
                    <p>Hi, John</p>
                </div>
            </div>

            <div className='h-[36px] bg-[#F4F4F4] flex justify-center items-center'>
                <p>{"<"} Get 10% off on business sign up {">"}</p>
            </div>
        </>
    )
}

export default Navbar