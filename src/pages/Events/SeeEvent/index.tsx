import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, Evento, ParticipanteEvento, Pessoa } from '../../../backend/db';
import Header from '../../Header';
import './styles.css';

const SeeEventPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Evento | null>(null);
    const [participantes, setParticipantes] = useState<ParticipanteEvento[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            if (id) {
                const event = await db.eventos.get(Number(id));
                setEvent(event || null);
            }
        };

        const fetchParticipantes = async () => {
            if (id) {
                const participantes = await db.participantesEventos.where({ idEvento: Number(id) }).toArray();
                setParticipantes(participantes);
            }
        };

        const fetchPessoas = async () => {
            const pessoas = await db.pessoas.toArray();
            setPessoas(pessoas);
        };

        fetchEvent();
        fetchParticipantes();
        fetchPessoas();
    }, [id]);

    const handleAddParticipante = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPessoa) {
            setError("Selecione uma pessoa");
            return;
        }
        if (event) {
            const novoParticipante: ParticipanteEvento = {
                id: 0,
                idPessoa: Number(selectedPessoa),
                idEvento: event.id,
                dataCadastro: new Date(),
                cadastradoPor: "admin" // Altere conforme necessário
            };
            try {
                await db.participantesEventos.add(novoParticipante);
                setParticipantes([...participantes, novoParticipante]);
                setSelectedPessoa('');
                setError(null);
            } catch (error) {
                console.error("Erro ao adicionar participante:", error);
                setError("Erro ao adicionar participante");
            }
        }
    };

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
            <div className="add-participant-section">
                <h3>Adicionar Participante</h3>
                <form onSubmit={handleAddParticipante}>
                    <select value={selectedPessoa} onChange={(e) => setSelectedPessoa(e.target.value)}>
                        <option value="">Selecione uma pessoa</option>
                        {pessoas.map((pessoa) => (
                            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                        ))}
                    </select>
                    <button type="submit">Adicionar</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
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
