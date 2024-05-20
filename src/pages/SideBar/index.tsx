import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const SideBar: React.FC<{ active: boolean, setActive: (active: boolean) => void }> = ({ active, setActive }) => {
    let navigate = useNavigate();

    const closeSidebar = () => {
        setActive(false);
    }

    return (
        <div className={`container-menu ${active ? 'show' : ''}`}>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeSidebar} />
            <div className="container-content">
                {/* Conteúdo do menu vazio */}
            </div>
        </div>
    );
}

export default SideBar;