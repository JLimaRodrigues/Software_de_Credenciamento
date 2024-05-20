import React, { useState } from 'react';
import './Header.css';

const Header: React.FC = () => {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sideBar);

    return (
        <div className='header'>
        </div>
    );
}

export default Header;