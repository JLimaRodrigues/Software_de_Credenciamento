import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, Evento, ParticipanteEvento, Pessoa } from '../../../backend/db';
import Header from '../../Header';
import './styles.css';

import ParticipantForm from './ParticipantForm';
import { useLiveQuery } from 'dexie-react-hooks';

const SeeEventPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Evento | null>(null);
    //const [participantes, setParticipantes] = useState<ParticipanteEvento[]>([]);
    //const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            if (id) {
                const event = await db.eventos.get(Number(id));
                setEvent(event || null);
            }
        };

        fetchEvent();
    }, [id]);

    const participantes = useLiveQuery(() => db.participantesEventos.where({ idEvento: Number(id) }).toArray());
    const pessoas = useLiveQuery(() => db.pessoas.toArray());

    if (!participantes || !pessoas) return null;
    console.log(participantes);
    console.log(pessoas);

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <Header />
        <div className="see-event-page">
            <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
            <div className="event-info">
                <div className="event-column">
                    <h2>{event.nome}</h2>
                    <p><strong>Empresa:</strong> {event.empresa}</p>
                    <p><strong>Endereço:</strong> {event.endereco}</p>
                </div>
                <div className="event-column">
                    <p><strong>Tipo de Evento:</strong> {event.tipo_evento}</p>
                    <p><strong>Quantidade Máxima de Participantes:</strong> {event.qtd_participantes}</p>
                </div>
            </div>
            <ParticipantForm idEvento={event.id} />
            <div className="participants-list">
                <h3>Participantes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participantes.map((participante) => {
                            const pessoa = pessoas.find(p => p.id === participante.idPessoa);
                            return (
                                <tr key={participante.id}>
                                    <td>{pessoa ? pessoa.nome : 'Desconhecido'}</td>
                                    <td>{new Date(participante.dataCadastro).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default SeeEventPage;
