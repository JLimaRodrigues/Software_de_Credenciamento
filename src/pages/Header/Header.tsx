import React, { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

import SideBar from '../SideBar';

const Header: React.FC = () => {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sideBar);

    return (
        <div className='header'>
            <FontAwesomeIcon icon={faBars} onClick={showSideBar}/>
            <SideBar active={sideBar} setActive={setSideBar} />
        </div>
    );
}

export default Header;