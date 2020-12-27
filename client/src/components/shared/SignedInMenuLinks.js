import { React, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const myStyle = {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#478647",
    height: 40,
    marginTop: 10,
    width: 40,
    color: "white",
    borderRadius: "100%",
    textAlign: "center",
    display: "flex",
}

function SignedInMenuLinks(props) {
    const { auth } = props;
    return (
        <Fragment>
            <MenuItem onClick={props.signOut}>Logout</MenuItem>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInMenuLinks)