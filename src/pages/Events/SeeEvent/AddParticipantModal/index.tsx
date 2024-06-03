import React, { useState, useEffect } from 'react';
import { Pessoa, ParticipanteEvento } from '../../../../backend/db';
import './styles.css';

interface AddParticipantModalProps {
    show: boolean;
    handleClose: () => void;
    pessoas: Pessoa[];
    eventId: number;
    addParticipante: (participante: ParticipanteEvento) => void;
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({ show, handleClose, pessoas, eventId, addParticipante }) => {
    const [selectedPessoa, setSelectedPessoa] = useState<string>('');
    const [tipoParticipacao, setTipoParticipacao] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleAddParticipante = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPessoa || !tipoParticipacao) {
            setError("Preencha todos os campos");
            return;
        }
        const novoParticipante: ParticipanteEvento = {
            id: 0,
            idPessoa: Number(selectedPessoa),
            idEvento: eventId,
            tipoParticipacao,
            dataCadastro: new Date(),
            cadastradoPor: "admin" // Altere conforme necessário
        };
        addParticipante(novoParticipante);
        setSelectedPessoa('');
        setTipoParticipacao('');
        setError(null);
        handleClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Adicionar Participante</h2>
                    <button className="close-button" onClick={handleClose}>×</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleAddParticipante}>
                        <div className="form-group">
                            <label htmlFor="pessoa">Pessoa</label>
                            <select id="pessoa" value={selectedPessoa} onChange={(e) => setSelectedPessoa(e.target.value)}>
                                <option value="">Selecione uma pessoa</option>
                                {pessoas.map((pessoa) => (
                                    <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoParticipacao">Tipo de Participação</label>
                            <select id="tipoParticipacao" value={tipoParticipacao} onChange={(e) => setTipoParticipacao(e.target.value)}>
                                <option value="">Selecione o tipo de participação</option>
                                <option value="convidado">Convidado</option>
                                <option value="palestrante">Palestrante</option>
                                <option value="organizacao">Organização</option>
                                <option value="servico">Serviço</option>
                            </select>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="modal-footer">
                            <button type="button" className="button" onClick={handleClose}>Cancelar</button>
                            <button type="submit" className="button button-primary">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddParticipantModal;
