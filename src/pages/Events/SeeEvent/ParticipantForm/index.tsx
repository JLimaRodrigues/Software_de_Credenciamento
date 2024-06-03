import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Pessoa, db } from "../../../../backend/db";
import { useLiveQuery } from "dexie-react-hooks";
import './styles.css';

const ParticipantForm: React.FC = () => {
    const [isAddParticipantSectionVisible, setAddParticipantSectionVisible] = useState(false);
    const [selectedPessoa, setSelectedPessoa] = useState('');
    const [tipoParticipacao, setTipoParticipacao] = useState('');
    const [cadastradoPor, setCadastradoPor] = useState('');
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [error, setError] = useState('');
    const [pessoaSuggestions, setPessoaSuggestions] = useState<Pessoa[]>([]);
    const [selectedPessoaData, setSelectedPessoaData] = useState<Pessoa | null>(null);

    const pessoas = useLiveQuery(() => db.pessoas.toArray(), [], []);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const { login } = JSON.parse(user);
            setCadastradoPor(login);
        }
    }, []);

    const toggleAddParticipantSection = () => {
        setAddParticipantSectionVisible(!isAddParticipantSectionVisible);
    };

    const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const handlePessoaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedPessoa(value);
        if (value && pessoas) {
            const suggestions = pessoas.filter(pessoa => 
                pessoa.nome.toLowerCase().includes(value.toLowerCase()) || 
                pessoa.cpf.includes(value)
            );
            setPessoaSuggestions(suggestions);
        } else {
            setPessoaSuggestions([]);
        }
    };

    const handlePessoaSelect = (pessoa: Pessoa) => {
        setSelectedPessoa(pessoa.nome);
        setSelectedPessoaData(pessoa);
        setPessoaSuggestions([]);
    };

    const handleAddParticipante = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedPessoa || !tipoParticipacao || !cadastradoPor) {
            setError('Preencha todos os campos obrigatórios.');
            return;
        }
        // Aqui você pode adicionar a lógica para adicionar o participante ao banco de dados
        setSelectedPessoa('');
        setTipoParticipacao('');
        setEntrada('');
        setSaida('');
        setError('');
    };

    return (
        <div className="add-participant-section">
            <h3 onClick={toggleAddParticipantSection} style={{ cursor: 'pointer' }}>
                Adicionar Participante
                <FontAwesomeIcon icon={isAddParticipantSectionVisible ? faChevronUp : faChevronDown} style={{ marginLeft: '10px' }} />
            </h3>
            {isAddParticipantSectionVisible && (
                <form onSubmit={handleAddParticipante} className="participant-form">
                    <div className="form-group">
                        <input
                            type="text"
                            id="formPessoa"
                            value={selectedPessoa}
                            onChange={handlePessoaChange}
                            placeholder=" "
                            autoComplete="off"
                        />
                        <label className={selectedPessoa ? 'Active' : ''} htmlFor="formPessoa">
                            Pessoa
                        </label>
                        {pessoaSuggestions.length > 0 && (
                            <ul className="suggestions">
                                {pessoaSuggestions.map(pessoa => (
                                    <li key={pessoa.id} onClick={() => handlePessoaSelect(pessoa)}>
                                        {pessoa.nome} - {pessoa.cpf}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="formTipoParticipacao"
                            value={tipoParticipacao}
                            onChange={handleTextChange(setTipoParticipacao)}
                            placeholder=" "
                        />
                        <label className={tipoParticipacao ? 'Active' : ''} htmlFor="formTipoParticipacao">
                            Tipo de Participação
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="formCadastradoPor"
                            value={cadastradoPor}
                            readOnly
                            placeholder=" "
                        />
                        <label className={cadastradoPor ? 'Active' : ''} htmlFor="formCadastradoPor">
                            Cadastrado Por
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="datetime-local"
                            id="formEntrada"
                            value={entrada}
                            onChange={handleTextChange(setEntrada)}
                            placeholder=" "
                        />
                        <label className={entrada ? 'Active' : ''} htmlFor="formEntrada">
                            Entrada
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="datetime-local"
                            id="formSaida"
                            value={saida}
                            onChange={handleTextChange(setSaida)}
                            placeholder=" "
                        />
                        <label className={saida ? 'Active' : ''} htmlFor="formSaida">
                            Saída
                        </label>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <div className="modal-footer">
                        <button type="submit" className="button button-primary">Adicionar</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ParticipantForm;
