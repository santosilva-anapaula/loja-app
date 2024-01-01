import React from 'react';

const ProductList = ({product}) => {
  return (
    <div className='bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative'>
        <span className='bg-zinc-300 border border-zinc-800  rounded-full text-primary text-sm px-4 py-1 inline-block mb-4'>{product.estacao}</span>
        <img className='w-64 mx-auto transform transition duration-300 hover:scale-105' src={product.imagem} alt='Imagem do produto'></img>
        <div className='flex flex-col items-center my-3 space-y-2'>
            <h1 className='text-gray-900 text-lg'>{product.nome}</h1>
            <p className='text-gray-500 text-sm text-center'>{product.descricao}</p>
            <h2 className='text-gray-900 text-2xl font-bold'>R${product.precoUnitario}</h2>
            <button className='bg-zinc-600 text-white px-8 py-2 rounded-full transition transform duration-300 hover:scale-105'>Comprar Agora</button>
        </div>
    </div>
  )
}

export default ProductList;