import React from 'react';
import logo from '../../assets/logolrb.png'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='w-full z-50 bg-zinc-900'>
        <nav className='flex items-center max-w-screen-xl mx-auto px-6 py-3'>
            <div className='flex flex-grow items-center'>
                <Link to='/' className='flex items-center'>
                    <img src={logo} alt='Logo' className='w-8 cursor-pointer'/>
                    <h1 className='text-center text-3xl font-semibold text-zinc-100 px-3'>Loja de Roupas</h1>
                </Link>                
            </div>
            <div className=' flex items-center justify-end space-x-6'>
                <Link to='/login'  className='text-white'>Login</Link>
                <Link to='/register' className='bg-zinc-600 px-6 py-1 text-white rounded-full transition duration-700 hover:scale-105'>Register</Link>
            </div>
        </nav>        
    </header>
  )
}

export default Navbar;