import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/pageNotFound.png';

const NotFound = () => {
  return (
    <div className='flex
    flex-col items-center justify-center mx-auto w-screen h-screen gap-4'>
        <img src={ notFound } alt='Página não encontrada' className='w-5/6'/>
        <h1 className=''>404 - Not Found</h1>
        <Link to='/' className='bg-zinc-600 text-white px-8 py-2 rounded-full transition transform duration-300 hover:scale-105'>Go Home</Link><br/>
    </div>
  )
}

export default NotFound