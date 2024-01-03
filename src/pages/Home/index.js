import React from 'react'
import Products from '../../components/Products';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { state } = useLocation();
  return (
    <>
      <section className='home-banner w-full bg-zinc-800 bg-blend-soft-light'>
        <div className=' flex flex-col items-center justify-center h-full'>
          <h1 className='text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-100'>Encontre seu estilo {state}</h1>
        </div>
      </section>
      <Products />
    </>
  )
}

export default Home;