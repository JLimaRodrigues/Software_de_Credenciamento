import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, Evento } from '../../../backend/db';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const EventsCard: React.FC = () => {
    const eventos = useLiveQuery(() => db.eventos.toArray(), []) as Evento[];
    const [searchTerm, setSearchTerm] = useState('');
    const [showConcluidos, setShowConcluidos] = useState(false);

    let navigate = useNavigate();

    const seeEvent = (id: number) => {
        navigate(`/events/${id}`);
    }

    if (!eventos) return <p>Loading...</p>;

    const filteredEventos = eventos
        .filter(evento => evento.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(evento => (showConcluidos ? evento.qtd_participantes === 40 : true));

    return (
        <div>
            <h2>Eventos disponíveis</h2>
            <div className="events-cards-filters">
                <input 
                    type="text" 
                    placeholder="Pesquisar evento por nome" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <label>
                    <input 
                        type="checkbox" 
                        checked={showConcluidos} 
                        onChange={(e) => setShowConcluidos(e.target.checked)} 
                    />
                    Mostrar somente concluídos
                </label>
            </div>
            <div className="container-events-cards">
                {filteredEventos.map((evento) => (
                    <div 
                        className={`event-card ${evento.qtd_participantes === 40 ? 'event-concluido' : ''}`} 
                        key={evento.id}
                    >
                        <h3>{evento.nome}</h3>
                        <p>{`0/${evento.qtd_participantes}`}</p>
                        {evento.qtd_participantes === 40 ? (
                            <p>Evento concluído</p>
                        ) : (
                            <button onClick={() => seeEvent(evento.id)}>Entrar evento</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsCard;
