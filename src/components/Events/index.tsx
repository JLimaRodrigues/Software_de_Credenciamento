import React, { useState } from "react";
import { Evento } from "../../backend/db";
import EventsTable from "./EventsTable";
import './styles.css';
import EventsForm from "./EventsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const Events: React.FC = () => {
    const [show, setShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);

    const handleClose = () => {
        setSelectedEvent(null);
        setShow(false);
    };
    const handleShow = (evento?: Evento) => {
        setSelectedEvent(evento || null);
        setShow(true);
    };

    return (
        <>
            <h2>Eventos Page</h2>
            <p>Bem-vindo à Eventos Page!</p>
            <ul>
                <li>Aqui irei mostrar os uma lista de CRUD de todos os eventos cadastrados por data mais recente</li>
                <li>E entre as opções dentro da lista terá um link para ir direto para o evento</li>
            </ul>
            <div className="tabela-eventos">
                <button className="button-add-user" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faCalendarPlus} />
                </button>
                <EventsTable onEditEvent={handleShow}/>
            </div>
            <EventsForm show={show} handleClose={handleClose} event={selectedEvent} />
        </>
    );
}

export default Events;