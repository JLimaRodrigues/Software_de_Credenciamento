import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import SideBarItem from '../SideBarItem';

interface SideBarProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ active, setActive }) => {
    const closeSidebar = () => {
        setActive(false);
    }

    return (
        <div className={`container-menu ${active ? 'show' : ''}`}>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeSidebar} />
            <div className="container-content">
                <SideBarItem Icon={faHome} Text="Home" href="/home" />
                <SideBarItem Icon={faUser} Text="Usuários" href="/users" />
            </div>
        </div>
    );
}

export default SideBar;