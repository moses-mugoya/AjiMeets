import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './InfoBar.css';

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><CloseIcon /></a>
        </div>
    </div>
);

export default InfoBar;