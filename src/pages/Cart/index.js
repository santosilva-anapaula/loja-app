import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { addOrder, sendCart } from '../../service/orderService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();

    const [productsCart, setProductsCart] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [address, setAddress] = useState({
        rua: '',
        numero: '',
        complemento: '',
        cep: ''
    });

    useEffect(() => {
        const storageCart = JSON.parse(localStorage.getItem('productCart'));
        setProductsCart(storageCart);
        const total = productsCart.reduce((valor, product) => {
            return valor + product.precoUnitario;
        }, 0)
        setTotalValue(total);
    }, [])

    const remove = (id) => {
        const storageCart = JSON.parse(localStorage.getItem('productCart')); //busca dados no storage
        const filterCart = storageCart.filter((product) => product._id !== id);
        localStorage.setItem('productCart', JSON.stringify(filterCart));
        setProductsCart(filterCart);
    }

    const findAdress = async () => {
        if (address.cep) {
            const response = await axios.get(`http://viacep.com.br/ws/${address.cep}/json`);
            setAddress({
                ...address,
                rua: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}`
            });
        }

    }

    const handleChangeValues = (event) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        })
        console.log(address);
    }

    const sendOrder = async () => {
        const productsOrder = productsCart.map((product => {
            return {
                _id: product._id,
                quantidade: product.quantity
            }
        }))

        const cartInfo = {
            produtos: productsOrder,
            precoTotal: totalValue,
            frete: 5
        }

        const response = await sendCart(cartInfo);

        if (response.data) {
            const order = {
                produtos: response.data.produtos,
                precoTotal: response.data.precoTotal,
                frete: response.data.frete,
                concluido: true
            }
            const responseOrder = await addOrder(order);
            if (responseOrder.data) {
                localStorage.removeItem('productCart');
                navigate('/complete')
            }
        }
    }



    return (
        <main className='h-screen banner bg-zinc-100 bg-blend-soft-light'>
            <div className='max-w-screen-xl py-20 mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                    {/* Informações endereço */}
                    <div className='col-span-1'>
                        <div className='flex flex-col mt-20'>
                            <h2 className='text-2xl pb-4 border-b border-zinc-500 text-zinc-700'>Adicione seu endereço</h2>
                            <form className='my-4'>
                                <div className='flex flex-col space-y-3'>
                                    <input
                                        type='text'
                                        name='cep'
                                        placeholder='cep'
                                        id='cep'
                                        value={address.cep}
                                        onChange={handleChangeValues}
                                        className='w-full px-4 py-3 rounded-lg ring-zinc-200 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                    />
                                    <input
                                        type='text'
                                        name='rua'
                                        placeholder='rua'
                                        id='rua'
                                        value={address.rua}
                                        onFocus={findAdress}
                                        onChange={handleChangeValues}
                                        className='w-full px-4 py-3 rounded-lg ring-zinc-200 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                    />
                                    <input
                                        type='text'
                                        name='numero'
                                        placeholder='numero'
                                        id='numero'
                                        value={address.numero}
                                        onChange={handleChangeValues}
                                        className='w-full px-4 py-3 rounded-lg ring-zinc-200 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                    />
                                    <input
                                        type='text'
                                        name='complemento'
                                        placeholder='complemento'
                                        id='complemento'
                                        value={address.complemento}
                                        onChange={handleChangeValues}
                                        className='w-full px-4 py-3 rounded-lg ring-zinc-200 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        {/* Informações do pedido */}
                        <div className='glass p-6 box-border rounded-lg'>
                            <div className='flex flex-col space-y-3'>
                                {productsCart.map((product) => (
                                    <div key={product._id} className='rounded-lg p-4 flex space-x-3'>
                                        <div className='flex'>
                                            <img src={product.imagem} alt={product.nome} className='w-24 object-contain' />
                                        </div>
                                        <div className='flex flex-col space-y-3 flex-grow'>
                                            <h5 className='text-base text-zinc-700'>{product.nome}</h5>
                                            <h3 className='font-semibold text-lg text-zinc-600'>R$ {product.precoUnitario}</h3>
                                        </div>
                                        <div className='flex items-center px-4 py-2 space-x-3'>
                                            <span className='text-lg text-zinc-500 select-none'>{product.quantity} un</span>
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <AiOutlineDelete onClick={() => remove(product._id)} className='w-6 h-6 text-zinc-600 transform transition hover:scale-105 duration-500 cursor-pointer' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col space-y-3 my-4'>
                                <div className='flex items-center'>
                                    <span className='flex-grow text-zinc-700'>Total Produtos</span>
                                    <span className='font-semibold text-black'>R$ {totalValue}</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className='flex-grow text-zinc-700'>Taxa de Entrega</span>
                                    <span className='font-semibold text-black'>R$ 5</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className='flex-grow text-zinc-700 text-xl'>Taxa com entrega</span>
                                    <span className='font-semibold text-black text-xl'>R$ {totalValue + 5}</span>
                                </div>
                                <div className='flex flex-col space-y-4 mb-3'>
                                    <p className='text-zinc-700'>Endereço de Entrega</p>
                                    <span className='font-semibold text-black'>{address.rua}</span>
                                    <span className='font-semibold text-black'>Numero: {address.numero} - Complemento: {address.complemento}</span>
                                </div>
                                <div>
                                    <button onClick={sendOrder} className='w-full px-6 py-3 rounded-lg bg-zinc-600 text-white ring-zinc-300 focus:ring-4 transition duration-500'>Enviar Pedido</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart