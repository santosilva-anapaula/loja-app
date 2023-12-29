import React from 'react';
import image from '../../assets/image.jpeg'
import autumn from '../../assets/autumn.png'

const ProductList = () => {
  return (
    <div className='bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative'>
        <span className='bg-zinc-300 border border-zinc-800  rounded-full text-primary text-sm px-4 py-1 inline-block mb-4'><img src={autumn} alt='' className='w-6'/></span>
        <img className='w-64 mx-auto transform transition duration-300 hover:scale-105' src={image} alt='Imagem do produto'></img>
        <div className='flex flex-col items-center my-3 space-y-2'>
            <h1 className='text-gray-900 text-lg'>Vestido Florido</h1>
            <p className='text-gray-500 text-sm text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget mi lectus. Donec mollis convallis convallis. Sed eget ultrices lectus. Donec auctor est eu risus finibus dignissim.</p>
            <h2 className='text-gray-900 text-2xl font-bold'>R$25,00</h2>
            <button className='bg-zinc-600 text-white px-8 py-2 rounded-full transition transform duration-300 hover:scale-105'>Comprar Agora</button>
        </div>
    </div>
  )
}

export default ProductList;