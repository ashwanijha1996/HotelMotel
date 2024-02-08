import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-blue-800 py-6'>
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>HotelMotel</Link>
                </span>
                <span className='flex space-x-2'>
                    <Link className='flex items-center bg-gray-50 text-blue-600 px-3 font-bold cursor-pointer hover:bg-gray-400' to='/sign-in'>Sign In</Link>
                </span>
            </div>

        </div>
    )
}

export default Header