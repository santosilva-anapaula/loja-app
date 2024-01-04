import React from 'react';
import image from '../../assets/sucessful-purchase.png'
import { useNavigate } from 'react-router-dom';

const Sucessful = () => {
    const navigate = useNavigate();
    return (
        <main className='h-screen banner bg-zinc-900 bg-blend-soft-light'>
            <div className='max-w-screen-xl py-20 mx-auto px-6'>
                <div className='flex flex-col items-center justify-center h-3/4 pt-24 pb-20'>
                    <h1 className='text-3xl text-center text-zinc-100 font-semibold flex space-y-3'>Pedido Realizado!</h1>
                    <img src={image} alt='Imagem de sucesso do pedido' className='w-2/3 object-contain' />
                    <button onClick={() => navigate('/')} className='px-8 py-2 font-bold rounded-lg bg-zinc-600 text-zinc-100 hover:scale-105 transition duration-300 focus:outline-none'>Voltar para Home</button>
                </div>
            </div>
        </main>
    )
}

export default Sucessful;