import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

interface SideBarItemProps {
    Icon: any;
    Text: string;
    href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ Icon, Text, href }) => {
    let navigate = useNavigate();

    const LinkHref = () => {
        navigate(href);
    };

    return (
        <div className='sidebar-item-container' onClick={LinkHref}>
            <FontAwesomeIcon icon={Icon} className="icon" />
            {Text}
        </div>
    );
}

export default SideBarItem;