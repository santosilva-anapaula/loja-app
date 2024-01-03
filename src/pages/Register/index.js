// import React from 'react';
// import logo from '../../assets/logolrp.png';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const navigate = useNavigate();
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         navigate('/login');
//     }
//   return (
//     <main className='h-screen w-full banner'>
//         <div className='flex flex-col pt-30 h-screen items-center'>
//             <img src={logo} alt='logotipo food app' className='w-40 my-6'/>
//             <form onSubmit={handleSubmit} action='' className='bg-white w-96 mt-6 p-4 rounded-lg shadow-lg'>
//                 <div className='flex flex-col space-y-6'>
//                     <input type='text' placeholder='Digite o seu nome' name='nome'
//                         className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
//                     />
//                     <input type='mail' placeholder='Digite o seu email' name='email'
//                         className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
//                     />
//                     <input type='password' placeholder='Digite a sua senha' name='senha'
//                         className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
//                     />
//                 </div>
//                 <button type='submit' className='w-full py-3 bg-zinc-600 text-zinc-100 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Entrar</button>
//                 <p className='text-base text-center my-6 hover:underline cursor-pointer'>Já tem uma conta?</p>
//             </form>
//         </div>
//     </main>
//   )
// }

// export default Register;

import React, { useState } from 'react';
import logo from '../../assets/logolrp.png';
import { registerUserApi } from '../../service/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputValues, setInputValues] = useState({
        nome:'',
        email:'',
        senha:'',
        imagem:''
    });

    const navigate = useNavigate();

    const handleChangeValues = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
        console.log(inputValues);
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputValues);

        const response = await registerUserApi(inputValues);
        console.log(response.data);
        const userName = await response.data.nome;
        console.log(userName);
        if(response.data){
            alert(`Usuário ${userName} cadastrado com sucesso!`);
            navigate('/login');
        }
    }

  return (
    <main className='h-screen w-full banner'>
        <div className='flex pt-20 flex-col items-center h-screen'>
            <img src={logo} alt='Logotipo do foodApp' className='w-40 my-6'/>
            <form onSubmit={handleSubmit} className='bg-white w-96 mt-6 p-4 rounded-lg shadow-lg'>                
                <h1 className='text-2xl text-gray-600 py-3'>Cadastro de Usuário</h1>
                <div className='flex flex-col space-y-6'>
                    <input 
                    type='text' 
                    name='nome' 
                    placeholder='Digite o seu nome' 
                    className='w-full px-4 py-3 rounded-lg ring-zinc-400 focus:ring-1 focus:outline-none transition duration-100 border border-zinc-300 focus:shadow-xl' 
                    onChange={handleChangeValues}/>

                    <input 
                    type='mail' 
                    name='email' 
                    placeholder='Digite o seu email' 
                    className='w-full px-4 py-3 rounded-lg ring-zinc-400 focus:ring-1 focus:outline-none transition duration-100 border border-zinc-300 focus:shadow-xl' 
                    onChange={handleChangeValues}/>

                    <input 
                    type='password' 
                    name='senha' 
                    placeholder='Digite a sua senha' 
                    className='w-full px-4 py-3 rounded-lg ring-zinc-400 focus:ring-1 focus:outline-none transition duration-100 border border-zinc-300 focus:shadow-xl' 
                    onChange={handleChangeValues}/>

                    <input 
                    type='text' 
                    name='imagem' 
                    placeholder='Insira a URL da imagem de avatar' className='w-full px-4 py-3 rounded-lg ring-zinc-400 focus:ring-1 focus:outline-none transition duration-100 border border-zinc-300 focus:shadow-xl' 
                    onChange={handleChangeValues}/>

                    <button type='submit' className='w-full py-3 bg-zinc-600 text-white  hover:bg-zinc-800 mt-6 rounded-lg transition duration-300'>Cadastrar</button>
                    <p onClick={() => navigate('/login')} className='text-base text-center my-6 hover:underline cursor-pointer'>Já tem uma conta?</p>
                </div>
            </form>
        </div>
    </main>
  )
};

export default Register;