import React, { useEffect, useState } from 'react';
import { findAllCategories } from '../../service/categoryService';
import { MultiSelect } from "react-multi-select-component";
import { AddProductApi } from '../../service/productService';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productForm, setProductForm] = useState({
        nome: '',
        descricao: '',
        precoUnitario: 0,
        imagem: '',
        codigoBarras: 0,
        categorias: [{ _id: '' }]
    });

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, [])

    //formata a resposta 
    const getCategories = async () => {
        const response = await findAllCategories();
        const categoriesSelect = response.data.map((categoria) => {
            return {
                value: categoria._id,
                label: categoria.nome
            }
        })
        console.log('Resposta do get categorias', response.data);
        console.log('Resposta do select', categoriesSelect);
        setCategories(categoriesSelect);
    }

    const handleChangeValues = (event) => {
        setProductForm({
            ...productForm,
            [event.target.name]: event.target.value
        })
        console.log(productForm);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(productForm);

        const categoriesId = selected.map((categoria) => {
            return {
                _id: categoria.value
            }
        })

        const product = {
            ...productForm,
            categorias: categoriesId,
            precoUnitario: parseInt(productForm.precoUnitario),
            codigoBarras: parseInt(productForm.codigoBarras)
        }

        console.log('array do produto', product);

        const response = await AddProductApi(product);
        if (response.data) {
            alert(`Produto ${response.data.nome} cadastrado com sucesso!`);
            navigate('/admin');
        }
    }

    return (
        <section className='my-12 max-w-screen-xl mx-auto px-6'>
            <div className='flex flex-col space-y-2'>
                <h1 className='text-2xl text-zinc-600'>Cadastro de Produtos</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6'>
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='nome' className='text-zinc-600'>Nome:</label>
                        <input type='text' id='nom' name='nome' required className='w-full px-4 py-3 rounded-lg ring-zinc-300 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='descricao' className='text-zinc-600'>Descrição:</label>
                        <textarea name='descricao' id='descricao' required cols='30' rows='10' className='w-full px-4 py-3 rounded-lg ring-zinc-300 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='codigoBarras' className='text-zinc-600'>Código de Barras:</label>
                        <input type='text' id='codigoBarras' name='codigoBarras' required className='w-full px-4 py-3 rounded-lg ring-zinc-300 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='preco' className='text-zinc-600'>Preço Unitário:</label>
                        <input type='text' id='preco' name='precoUnitario' required className='w-full px-4 py-3 rounded-lg ring-zinc-300 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='imagem' className='text-zinc-600'>Imagem:</label>
                        <input type='text' id='imagem' name='imagem' required className='w-full px-4 py-3 rounded-lg ring-zinc-300 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='categoria' className='text-zinc-600'>Categoria:</label>
                        <MultiSelect
                            options={categories}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />

                        <div className='mt-8'>
                            <button className='w-full py-3 bg-zinc-600 text-white hover:bg-zinc-800 mt-6 rounded-lg transition duration-300'>Adicionar</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddProduct;