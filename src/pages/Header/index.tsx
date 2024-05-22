import React, { useState, useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

import SideBar from '../SideBar';

const Header: React.FC = () => {
    const [sideBar, setSideBar] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if(userData){
            try {
                const user = JSON.parse(userData);
                setUsername(user.nome);
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
            }
        }
    }, []);

    const showSideBar = () => setSideBar(!sideBar);

    return (
        <div className='header'>
            <FontAwesomeIcon icon={faBars} onClick={showSideBar} className='icon'/>
            <SideBar active={sideBar} setActive={setSideBar} />

            <div className='username'>
                {username ? `Bem-vindo, ${username}` : 'Usuário'}
            </div>
        </div>
    );
}

export default Header;