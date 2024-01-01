import React, { useContext } from 'react';
import logo from '../../assets/logolrb.png';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
    const { userLogged, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <header className='w-full z-50 bg-zinc-900'>
            <nav className='flex items-center max-w-screen-xl mx-auto px-6 py-3'>
                <div className='flex flex-grow items-center'>
                    <img src={logo} alt='Logo' className='w-8 cursor-pointer' onClick={() => navigate('/')}/>
                    <h1 className='text-center text-3xl font-semibold text-zinc-100 px-3' onClick={() => navigate('/')}>Loja de Roupas</h1>              
                </div>

                {userLogged ? (
                    <div className='flex items-center justify-end space-x-4'>
                    <div className='relative flex cursor-pointer'>
                      <span className='bg-zinc-600 w-4 h-4 p-1 rounded-full flex items-center justify-center text-zinc-100 absolute -right-2 -top-2'>0</span>
                      <IoMdCart className='w-6 h-6 cursor-pointer text-zinc-100'/>
                    </div>
                    <img src='' alt=''/>
                    <p className='text-zinc-100'>Bem vindo Usuário</p>
                    <TbLogout className='w-6 h-6 cursor-pointer text-zinc-100' onClick={logoutUser}/>
                  </div>
                ) : (
                    <div className=' flex items-center justify-end space-x-6'>
                        <button className='text-zinc-100' onClick={() => navigate('/login')}>Login</button>
                        <button className='bg-zinc-600 px-6 py-1 text-zinc-100 rounded-full transition duration-700 hover:scale-105' onClick={() => navigate('/register')}>Register</button>
                    </div>
                )}                
            </nav>        
        </header>
    )
}

export default Navbar;