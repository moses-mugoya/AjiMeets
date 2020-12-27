import React, { Component } from 'react'
import Navbar from '../shared/Navbar'
import { connect } from 'react-redux'
import { clearErrors, resetPassword } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class PasswordReset extends Component {
    state = {
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        this.props.resetPass(email);
        this.props.clearErrors();
    }
    render() {
        const { resetError, loading, auth, reqSuccess, classes } = this.props;
        if (auth.uid) return <Redirect to='/profile' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Forgot Password
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />
                                {resetError ? <Typography style={{ color: "red", textAlign: "center" }}>{resetError}</Typography> : null}
                                {reqSuccess ? <Typography style={{ color: "green", textAlign: "center" }}>{reqSuccess}</Typography> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Send
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
        resetError: state.auth.resetPassError,
        loading: state.auth.loading,
        reqSuccess: state.auth.reqPassSuccessMes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPass: (email) => dispatch(resetPassword(email)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(PasswordReset) 
