import React, { Component } from 'react'
import Navbar from '../shared/Navbar';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp, clearErrors } from '../../store/actions/authActions'
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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



class Register extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        passMatchError: ''

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { firstName, lastName, email, password, confirmPassword, passMatchError } = this.state;
        e.preventDefault();
        const personalId = makeid(8);
        const user = { firstName, lastName, email, password, personalId };
        if (password === confirmPassword) {

            this.props.signUp(user);
            this.setState({
                passMatchError: ""
            })
        } else {
            this.setState({
                passMatchError: "Passwords do not match. Please try again"
            })
        }
        this.props.clearErrors();


    }
    render() {
        const { auth, regError, loading, classes } = this.props;
        const { passMatchError } = this.state;
        if (auth.uid) return <Redirect to='/profile' />
        return (
            <div>
                <Navbar />
                <Grid container justify="center">
                    <Grid item xs={12} sm={5} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h4">
                                Create Account
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
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange}
                                    fullWidth
                                    value={this.state.email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
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
                                    onChange={this.handleChange}
                                    name="password"
                                    label="Password"
                                    value={this.state.password}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
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
                                    onChange={this.handleChange}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={this.state.confirmPassword}
                                    id="confirmPassword"
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />
                                {regError ? <Typography style={{ color: "red", textAlign: "center" }}>{regError}</Typography> : null}
                                {passMatchError ? <Typography style={{ color: "red", textAlign: "center" }}>{passMatchError}</Typography> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Register
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                                </Button>
                                <Typography style={{ textAlign: "center" }}><LinkRouter to='/' style={{ color: "rgb(21 103 75)", textDecoration: "none" }}>Already have an account? Login</LinkRouter></Typography>
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
        regError: state.auth.registerError,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(Register) 
