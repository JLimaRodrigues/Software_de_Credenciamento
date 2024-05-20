import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const HomePage: React.FC = () => {
    let navigate = useNavigate();

    const LinkUsers = async () => {
       return navigate('/users')
    };

    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            <p>Bem-vindo à Home Page!</p>
            <button onClick={LinkUsers}>Vamos para a lista de usuários</button>
        </div>
    );
}

export default HomePage;