import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUserApi, getUserById } from '../service/authService';
import api from '../service/api';

const useAuth = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userFull, setUserFull] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      api.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      findUserById(userInfo.id);
      setUserLogged(true);
    }
    setLoading(false);
  }, [])

  const loginUser = async (inputValues) => {
    //chamada da API
    const response = await loginUserApi(inputValues);
    const data = await response.data;//acessar o body da resposta
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    navigate('/');
    setUserLogged(true);
  }

  const logoutUser = () => {
    setUserLogged(false);
    localStorage.clear();
    navigate('/login');
  }

  const findUserById = async (idUser) => {
    const response = await getUserById(idUser);
    // console.log('o que vem no response',response);
    setUserFull(response.data);
    // console.log('resposta do userFull',userFull);
  }

  return { userLogged, loading, loginUser, logoutUser, userFull }
}

export default useAuth;