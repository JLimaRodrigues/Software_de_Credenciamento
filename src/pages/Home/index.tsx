import React from 'react';
import Header from '../Header';
import EventsCard from '../../components/Events/EventsCard';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            <p>Bem-vindo à Home Page!</p>
            <ul>
                <li>Aqui irei mostrar os próximos eventos</li>
                <li>Histórico de ultimos eventos</li>
                <li>gráfico comparando: quantidade de pessoas previstas e quantidade de pessoas presentes</li>
            </ul>
            <EventsCard />
        </div>
    );
}

export default HomePage;