import React from 'react';
import Events from '../../components/Events';
import Header from '../Header';

const EventsPage: React.FC = () => {
   
    return (
        <div>
           <Header />
            <h2>Eventos Page</h2>
            <p>Bem-vindo à Eventos Page!</p>
            <ul>
                <li>Aqui irei mostrar os uma lista de CRUD de todos os eventos cadastrados por data mais recente</li>
                <li>E entre as opções dentro da lista terá um link para ir direto para o evento</li>
            </ul>
           <Events />
        </div>
    );
}

export default EventsPage;