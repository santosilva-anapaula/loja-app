import React from 'react';
import logo from '../../assets/logolrp.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/login');
    }
  return (
    <main className='h-screen w-full banner'>
        <div className='flex flex-col pt-30 h-screen items-center'>
            <img src={logo} alt='logotipo food app' className='w-40 my-6'/>
            <form onSubmit={handleSubmit} action='' className='bg-white w-96 mt-6 p-4 rounded-lg shadow-lg'>
                <div className='flex flex-col space-y-6'>
                    <input type='text' placeholder='Digite o seu nome' name='nome'
                        className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                    />
                    <input type='mail' placeholder='Digite o seu email' name='email'
                        className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                    />
                    <input type='password' placeholder='Digite a sua senha' name='senha'
                        className='w-full px-4 py-3 rounded-lg ring-zinc-400 border border-zinc-300 focus:ring-4 focus:outline-none transition duration-300'
                    />
                </div>
                <button type='submit' className='w-full py-3 bg-zinc-600 text-zinc-100 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Entrar</button>
                <p className='text-base text-center my-6 hover:underline cursor-pointer'>Já tem uma conta?</p>
            </form>
        </div>
    </main>
  )
}

export default Register;