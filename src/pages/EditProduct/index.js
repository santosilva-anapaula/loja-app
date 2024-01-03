import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findAllCategories } from '../../service/categoryService';
import { MultiSelect } from 'react-multi-select-component';
import { findProductsById, updateProductById } from '../../service/productService';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);

    const [productForm, setProductForm] = useState({
        nome: '',
        descricao: '',
        precoUnitario: 0,
        imagem: '',
        codigoBarras: 0
    });

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        getCategories();
        getProductById();
    }, [])

    const getProductById = async () => {
        const response = await findProductsById(id);
        console.log('prooduto por id', response.data);
        setProductForm(response.data);
    }

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

        const response = await updateProductById(id, productForm);

        if (response) {
            alert('Produto editado com sucesso');
            navigate('/admin');
        }
    }

    return (
        <section className='my-12 max-w-screen-xl mx-auto px-6'>
            <div className='flex flex-col space-y-2'>
                <h1 className='text-2xl text-zinc-600'>Ediçao de Produtos</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6'>
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='nome' className='text-zinc-500'>Nome:</label>
                        <input type='text' id='nom' name='nome' value={productForm.nome} required className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='descricao' className='text-zinc-500'>Descrição:</label>
                        <textarea name='descricao' value={productForm.descricao} id='descricao' required cols='30' rows='10' className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='codigoBarras' className='text-zinc-500'>Código de Barras:</label>
                        <input type='text' id='codigoBarras' name='codigoBarras' value={productForm.codigoBarras} required className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='preco' className='text-zinc-500'>Preço Unitário:</label>
                        <input type='text' id='preco' name='precoUnitario' value={productForm.precoUnitario} required className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='imagem' className='text-zinc-500'>Imagem:</label>
                        <input type='text' id='imagem' name='imagem' value={productForm.imagem} required className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                            onChange={handleChangeValues} />

                        <label htmlFor='categoria' className='text-zinc-500'>Categoria:</label>
                        <MultiSelect
                            options={categories}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />

                        <div className='mt-8'>
                            <button type='submit' className='w-full py-3 font-bold bg-zinc-600 text-white hover:bg-zinc-800 rounded-lg transition duration-300'>Editar</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditProduct;