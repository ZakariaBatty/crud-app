import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../UserContext";
import MessageIcon from '../assets/icons/MessageIcon';
import UserIcon from '../assets/icons/UserIcon';
import LogoIcon from '../assets/icons/LogoIcon';

function Header() {
    const [ready, setReady] = useState(true);
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user?.type === true) {
            setReady(false);
        } else {
            setReady(true);
        }
    }, [user]);

    return (
        <header className='fixed w-full border-b drop-shadow-sm z-50 bg-white px-2 py-2'>
            <div className='flex justify-between mx-auto'>
                <Link to="/" className='flex items-center gap-2 flex-1'>
                    <LogoIcon></LogoIcon>
                    <span className='font-bold text-xl text-primary'>studiebnb</span>
                </Link>
                <div className='flex items-center gap-2 flex-1 justify-center'>
                    <Link to="/" className='flex items-center gap-2 flex-1'>
                        <span className='font-bold text-xl text-primary'>home</span>
                    </Link>
                    {ready && (
                        <Link to="/booking" className='flex items-center gap-2 flex-1'>
                            <span className='font-bold text-xl text-primary'>booking</span>
                        </Link>
                    )}
                    <Link to="/" className='flex items-center gap-2 flex-1 justify-center'>
                        <span className='font-bold text-xl text-primary'>contact</span>
                    </Link>
                </div>
                <div className='flex items-center gap-2 flex-1 justify-end'>
                    <div className='bg-lightGrey rounded-full p-4 py-2 border flex gap-2'>
                        <MessageIcon size={24}></MessageIcon>
                        <Link to={user?.type === false ? "/account" : user?.type === true ? "/dashboard" : "/login"} className='flex gap-2' >
                            <UserIcon size={24}></UserIcon>
                            {!!user && (
                                <span>{user.name}</span>
                            )}
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header