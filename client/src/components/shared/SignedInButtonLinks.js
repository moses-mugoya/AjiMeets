import { React, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
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

function SignedInButtonLinks(props) {
    const { auth } = props;
    return (
        <Fragment>
            <Button onClick={props.signOut} variant="outlined" color="secondary">Logout</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignedInButtonLinks)