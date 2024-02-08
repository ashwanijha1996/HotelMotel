import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-blue-800 py-10'>
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-white text-3xl font-bold tracking-tight">
                    <Link to='/'>HotelMotel</Link>
                </span>
                <span className='text-white font-bold tracking-tight flex gap-4'>
                    <p className='cursor-pointer'>Privacy policy</p>
                    <p className='cursor-pointer'>Terms of services</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;