import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import LogoutBtn from './LogoutBtn';

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className='bg-blue-800 py-6'>
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>HotelMotel</Link>
                </span>
                <span className='flex space-x-2'>
                    {isLoggedIn ? <>
                        <Link className='flex items-center text-white py-3 px-3 font-bold hover:bg-blue-600' to={'/my-bookings'}>My Bookings</Link>
                        <Link className='flex items-center text-white py-3 px-3 font-bold hover:bg-blue-600' to={'/my-hotels'}>My Hotels</Link>
                        <LogoutBtn />
                    </> : <Link className='flex items-center bg-gray-50 text-blue-600 px-3 font-bold cursor-pointer hover:bg-gray-400'
                        to='/login'>
                        Sign In
                    </Link>
                    }

                </span>
            </div>

        </div>
    )
}

export default Header