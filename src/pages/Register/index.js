import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/', {state: 'Maria'});
    }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center h-64 w-80 mx-auto rounded-lg shadow-lg shadow-zinc-400 mt-20 gap-4'>
        <div>
            <label htmlFor=''>Nome:</label>
            <input type='text' className='rounded-full ml-4 border px-2'/>
        </div>
        <div>
            <label htmlFor=''>Email:</label>
            <input type='text' className='rounded-full ml-4 border px-2'/>
        </div>
        <div>
            <label htmlFor=''>Senha:</label>
            <input type='password' className='rounded-full ml-4 border px-2'/>
        </div>
        <button type='submit' className='bg-zinc-600  text-zinc-100  rounded-full px-6 py-1 transition duration-700 hover:scale-105 mt-6'>Register</button>
    </form>
  )
}

export default Register;