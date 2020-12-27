import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, MenuItem } from '@material-ui/core';
import logo from '../../img/ajira.png';
import ButtonAppBarCollapse from '../shared/ButtonAppBarCollapse'
import SignedOutButtonLinks from '../shared/SignedOutButtonLinks'
import SignedOutMenuLinks from '../shared/SignedOutMenuLinks'
import SignedInMenuLinks from '../shared/SignedInMenuLinks'
import SignedInButtonLinks from '../shared/SignedInButtonLinks'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: 20,
        fontWeight: "bold",
    },

    logoImage: {
        maxWidth: "100%",
        maxHeight: "50px"
    },

    appBar: {
        color: "black",
        backgroundColor: "transparent",
        boxShadow: "0px 0px 0px 0px"
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        marginLeft: 'auto',
        margin: "10px",
        paddingLeft: "16px",
        background: "transparent"
    },
});

class Navbar extends Component {
    render() {
        const { classes, auth } = this.props;
        const menuLink = auth.uid ? <SignedInMenuLinks /> : <SignedOutMenuLinks />
        const buttonLink = auth.uid ? <SignedInButtonLinks /> : <SignedOutButtonLinks />
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Link to='/'><img src={logo} alt="logo" className={classes.logoImage} /></Link>
                        <Typography variant="h6" className={classes.title}>
                            AjiMeets
                        </Typography>
                        <ButtonAppBarCollapse>
                            {menuLink}
                        </ButtonAppBarCollapse>
                        <div className={classes.buttonBar} id="appbar-collapse">
                            {buttonLink}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth

    }
}

export default compose(connect(mapStateToProps), withStyles(useStyles))(Navbar) 
