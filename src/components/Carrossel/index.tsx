import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, Evento } from '../../backend/db';
import './styles.css';

const Carrossel: React.FC = () => {
    const eventos = useLiveQuery(() => db.eventos.toArray(), []) as Evento[];
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!eventos) return <p>Loading...</p>;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + eventos.length) % eventos.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % eventos.length);
    };

    return (
        <div className="carrossel-container">
            {eventos.length === 0 ? (
                <div className="no-cards-message">Nenhum evento disponível</div>
            ) : (
                <>
                    <button className="carrossel-prev" onClick={handlePrev}>&#10094;</button>
                    <div className="carrossel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {eventos.slice(currentIndex, currentIndex + 3).map((evento, index) => (
                            <div className="carrossel-card" key={evento.id} style={{ flex: 1 }}>
                                <h3>{evento.nome}</h3>
                                <p>{`0/${evento.qtd_participantes}`}</p>
                                <button>Entrar evento</button>
                            </div>
                        ))}
                    </div>
                    <button className="carrossel-next" onClick={handleNext}>&#10095;</button>
                </>
            )}
        </div>
    );
};

export default Carrossel;
