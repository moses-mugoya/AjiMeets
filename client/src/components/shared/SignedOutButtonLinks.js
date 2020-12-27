import { React, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default function SignedOutButtonLinks() {
    return (
        <Fragment>
            <Button><Link to='/join-meeting' style={{ color: "black", textDecoration: "none" }}>Join a Meeting</Link></Button>
            <Button><Link to='/' style={{ color: "black", textDecoration: "none" }}>Login</Link></Button>
            <Button><Link to='/register' style={{ color: "black", textDecoration: "none" }}>Register</Link></Button>
        </Fragment>
    )
}
