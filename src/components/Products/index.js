import React, { useState } from 'react';
import ProductList from '../ProductList';

const Products = () => {
    const [ categoriaTab, setCategoriaTab ] = useState('Primavera');
  return (
    <section className='my-12 max-w-screen-xl mx-auto px-6'>
        {/* Menu Categoria */}
        <div className='flex items-center justify-center space-x-6'>
            <p className={categoriaTab == 'Primavera' ? "active-menu-tab bg-zinc-600" : "menu-tab"} onClick={() => setCategoriaTab('Primavera')}>Primavera</p>
            <p className={categoriaTab == 'Verao' ? "active-menu-tab bg-zinc-600" : "menu-tab"} onClick={() => setCategoriaTab('Verao')}>Verão</p>
            <p className={categoriaTab == 'Outono' ? "active-menu-tab bg-zinc-600" : "menu-tab"} onClick={() => setCategoriaTab('Outono')}>Outono</p>
            <p className={categoriaTab == 'Inverno' ? "active-menu-tab bg-zinc-600" : "menu-tab"} onClick={() => setCategoriaTab('Inverno')}>Inverno</p>
        </div>
        {/* Lista de produtos */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
            <ProductList/>
            <ProductList/>
            <ProductList/>
            <ProductList/>
            <ProductList/>
            <ProductList/>
        </div>
    </section>
  )
}

export default Products;