import React, { useEffect, useState } from 'react';
import { BiMinusCircle } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom';
import { findProductsById } from '../../service/productService';


const Productinfo = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = async () => {
        const response = await findProductsById(id);
        setProduct(response.data);
    }

    const addToCart = () => {
        const productCart = [
            {
                ...product,
                quantity: quantity
            }
        ]
        const storageCart = JSON.parse(localStorage.getItem('productCart'));

        if (storageCart) {
            productCart.push(
                ...storageCart
            )
            localStorage.setItem('productCart', JSON.stringify(productCart));
        }
        localStorage.setItem('productCart', JSON.stringify(productCart));
        navigate('/cart');
    }


    return (
        <main className='max-w-screen-xl mx-auto px-6'>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                    <div className='order-2 md:order-1 lg:order-1 flex flex-col justify-center'>
                        <h1 className='text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold pb-4 text-gray-700 select-none'>{product.nome}</h1>
                        <p className='text-center md:text-left lg:text-left text-sm text-gray-500 leading-relaxed select-none'>{product.descricao}</p>
                        <div className='flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8'>
                            <h2 className='text-3xl font-bold text-black select-none'>R$ {product.precoUnitario}</h2>
                            <div className='flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full'>
                                <BiMinusCircle
                                    onClick={() => { quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1) }}
                                    className='text-2xl text-zinc-700 w-10 h-10 hover:scale-105 transform duration-300 cursor-pointer p-1' />
                                <span className='text-lg text-gray-700 select-none'>{quantity}</span>
                                <BiPlusCircle
                                    onClick={() => { setQuantity(quantity + 1) }}
                                    className='text-2xl text-zinc-700 w-10 h-10 hover:scale-105 transform duration-300 cursor-pointer p-1' />
                            </div>
                        </div>
                        <div className='mt-8 flex items-center justify-center md:justify-start lg:justify-start'>
                            <button onClick={addToCart} className=' flex items-center space-x-3 px-6 py-3 bg-zinc-600 text-white focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>
                                <TbShoppingCartPlus className='text-2xl' />
                                <span>Adicionar</span>
                            </button>
                        </div>
                    </div>
                    <div className='order-1 md:order-2 lg:order-2'>
                        <img src={product.imagem} alt='imagem produto' className='' />
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Productinfo