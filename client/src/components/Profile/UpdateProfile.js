import React, { Component } from 'react'
import Navbar from '../shared/Navbar';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProfile, clearErrors } from '../../store/actions/authActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as LinkRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = (theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#32be8f",
        '&:hover': {
            background: "#33be6f",
        },
        color: "white",
        height: 50,
        borderRadius: 25,
        position: "relative"
    },
    textField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#32be8f",
                borderWidth: "2px",
            },

        },
    },

    label: {
        "&$focusedLabel": {
            color: "#32be8f"
        },
    },
    focusedLabel: {},
    erroredLabel: {},
    progress: {
        position: "absolute",
        color: "#32be8f"
    }
});

class UpdateProfile extends Component {
    state = {
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { firstName, lastName } = this.state;
        const uid = this.props.auth.uid;
        const { push } = this.props.history;
        e.preventDefault();
        const user = { firstName, lastName, uid, push };
        this.props.updateProfile(user);
        this.props.clearErrors();
    }
    render() {
        const { auth, updateProfError, loading, classes, profile } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Update Profile Names
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    value={this.state.firstName}
                                    fullWidth
                                    id="firstName"
                                    label="FirstName"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    autoFocus
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    id="lastName"
                                    label="LastName"
                                    name="lastName"
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />

                                {updateProfError ? <Typography style={{ color: "red", textAlign: "center" }}>{updateProfError}</Typography> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Update
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                                </Button>
                            </form>
                        </div>
                    </Grid>

                </Grid>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        updateProfError: state.auth.updateProfError,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (updatedInfo) => dispatch(updateProfile(updatedInfo)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(UpdateProfile)

