import { React, Fragment } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

export default function SignedOutMenuLinks() {
    return (
        <Fragment>
            <MenuItem><Link to='/join-meeting' style={{ color: "black", textDecoration: "none" }}>Join a Meeting</Link></MenuItem>
            <MenuItem><Link to='/' style={{ color: "black", textDecoration: "none" }}>Login</Link></MenuItem>
            <MenuItem><Link to='/register' style={{ color: "black", textDecoration: "none" }}>Register</Link></MenuItem>
        </Fragment>
    )
}


