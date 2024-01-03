import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { findAllProducts, deleteProductById } from '../../service/productService';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        const response = await findAllProducts();
        setProducts(response.data);
        console.log('Resultado do getAll', response)
    }

    const removeProduct = async (id) => {
        const answer = window.confirm('Deseja excluir o produto?');

        if (answer) {
            await deleteProductById(id);
            getAllProducts();
        }
    }
    return (
        <section className='my-12 max-w-screen-xl mx-auto px-6'>
            <div className='flex justify-end space-y-2'>
                <button onClick={() => navigate('/admin/add-product')} className='w-44 px-2 py-3 bg-zinc-600 text-zinc-100 hover:bg-zinc-900 mt-6 rounded-lg transition duration-300'>Adicionar Produto</button>
            </div>
            <div className='flex flex-col my-8'>
                <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className='overflow-hidden sm:rounded-lg shadow-md'>
                            <table className=' min-w-full'>
                                <thead className='bg-zinc-600'>
                                    <tr>
                                        <th scope='col' className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Imagem
                                        </th>
                                        <th scope='col' className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Nome
                                        </th>
                                        <th scope='col' className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Preço
                                        </th>
                                        <th scope='col' className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Código de Barras
                                        </th>
                                        <th scope='col' className='relative px-6 py-3'>
                                            <span className='text-xs font-medium text-white px-6 py- text-left uppercase tracking-wider'>Ações</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {products.map(product => (
                                        <tr key={product._id} className='bg-white border-b'>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                <img src={product.imagem} alt={product.nome} className='w-20' />
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                {product.nome}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                {product.precoUnitario}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                {product.codigoBarras}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center justify-center'>
                                                <div className='flex items-center justify-center space-x-3'>
                                                    <Link to={`/admin/edit-product/${product._id}`}>
                                                        <BiSolidEdit className='cursor-pointer text-2xl text-blue-600' />
                                                    </Link>
                                                    <RiDeleteBin2Fill onClick={() => removeProduct(product._id)} className='cursor-pointer text-2xl text-red-600' />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Admin