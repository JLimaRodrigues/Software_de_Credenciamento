import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Evento, db } from "../../../backend/db";
import { isValidName, isValidCompany, isValidAddress, isValidEventType, isValidParticipants } from './validate';

interface EventsFormProps {
    show: boolean;
    handleClose: () => void;
    event?: Evento | null;
}

const EventsForm: React.FC<EventsFormProps> = ({ show, handleClose, event }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [eventType, setEventType] = useState('');
    const [participants, setParticipants] = useState<number | string>('');
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (event) {
            setName(event.nome);
            setCompany(event.empresa);
            setAddress(event.endereco);
            setEventType(event.tipo_evento);
            setParticipants(event.qtd_participantes);
        } else {
            resetForm();
        }
    }, [event]);

    const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setter(value === '' ? '' : Number(value));
        };

    const resetForm = () => {
        setName('');
        setCompany('');
        setAddress('');
        setEventType('');
        setParticipants('');
        setErrors([]);
    };

    const handleCloseAndReset = () => {
        resetForm();
        handleClose();
    };

    const validateForm = () => {
        const newErrors: string[] = [];
        if (!isValidName(name)) newErrors.push("Name is required");
        if (!isValidCompany(company)) newErrors.push("Company is required");
        if (!isValidAddress(address)) newErrors.push("Address is required");
        if (!isValidEventType(eventType)) newErrors.push("Event type is required");
        if (!isValidParticipants(participants)) newErrors.push("Valid number of participants is required");
        return newErrors;
    };

    const handleRegisterOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if (event) {
                const updatedEvent: Evento = {
                    id: event.id, // use the existing id for updates
                    nome: name,
                    empresa: company,
                    endereco: address,
                    tipo_evento: eventType,
                    qtd_participantes: Number(participants)
                };
                await db.eventos.update(updatedEvent.id, updatedEvent);
            } else {
                const ultimoRegistro = await db.eventos.orderBy('id').reverse().first();
                const novoId = ultimoRegistro ? ultimoRegistro.id + 1 : 1;

                const novoEvento: Evento = {
                    id: novoId, // assign a new id for new events
                    nome: name,
                    empresa: company,
                    endereco: address,
                    tipo_evento: eventType,
                    qtd_participantes: Number(participants)
                };

                await db.eventos.add(novoEvento);
            }

            resetForm();
            handleClose();
        } catch (error) {
            console.error("Erro ao registrar ou atualizar o evento:", error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2>{event ? 'Edit Event' : 'Register New Event'}</h2>
                        <button className="close-button" onClick={handleCloseAndReset}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleRegisterOrUpdate}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formName"
                                    value={name}
                                    onChange={handleTextChange(setName)}
                                    placeholder=" "
                                />
                                <label className={name ? 'Active' : ''} htmlFor="formName">
                                    Name
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formCompany"
                                    value={company}
                                    onChange={handleTextChange(setCompany)}
                                    placeholder=" "
                                />
                                <label className={company ? 'Active' : ''} htmlFor="formCompany">
                                    Company
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formAddress"
                                    value={address}
                                    onChange={handleTextChange(setAddress)}
                                    placeholder=" "
                                />
                                <label className={address ? 'Active' : ''} htmlFor="formAddress">
                                    Address
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formEventType"
                                    value={eventType}
                                    onChange={handleTextChange(setEventType)}
                                    placeholder=" "
                                />
                                <label className={eventType ? 'Active' : ''} htmlFor="formEventType">
                                    Event Type
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="formParticipants"
                                    value={participants}
                                    onChange={handleNumberChange(setParticipants)}
                                    placeholder=" "
                                />
                                <label className={participants ? 'Active' : ''} htmlFor="formParticipants">
                                    Participants
                                </label>
                            </div>
                            {errors.length > 0 && (
                                <div className="error-messages">
                                    {errors.map((error, index) => (
                                        <p key={index} className="error-text">{error}</p>
                                    ))}
                                </div>
                            )}
                            <div className="modal-footer">
                                <button type="button" className="button button-warning" onClick={handleCloseAndReset}>Cancel</button>
                                <button type="submit" className="button button-primary">{event ? 'Update' : 'Register'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventsForm;
