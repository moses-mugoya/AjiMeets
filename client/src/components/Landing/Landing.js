import React, { Component, Fragment } from 'react'
import bg2 from '../../img/bgi.jpg';
import avatar from '../../img/avatar.svg';
import Navbar from '../shared/Navbar';
import { connect } from 'react-redux'
import { signIn, clearErrors } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as LinkRouter } from 'react-router-dom'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ajira.go.ke/">
                Ajira | Ajimeets
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${bg2})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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

class Landing extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { email, password } = this.state;
        const user = { email, password };
        e.preventDefault();
        if (email !== "" && password !== "") {
            this.props.signIn(user);
            this.props.clearErrors();
        }

    }

    render() {
        const { auth, loginError, loading, classes } = this.props;
        if (auth.uid) return <Redirect to='/profile' />
        return (
            <Fragment>
                <Navbar />
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>
                        <div className={classes.paper}>
                            <div>
                                <img src={avatar} width={120} />
                            </div>
                            <Typography component="h1" variant="h4">
                                Welcome
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
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
                                    name="password"
                                    label="Password"
                                    value={this.state.password}
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                            focused: classes.focusedLabel,
                                            error: classes.erroredLabel
                                        }
                                    }}
                                />
                                <Typography><LinkRouter to='/forgot-password' style={{ color: "rgb(21 103 75)", textDecoration: "none" }}>Forgot password?</LinkRouter></Typography>
                                {loginError ? <Typography style={{ color: "red", textAlign: "center" }}>{loginError}</Typography> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Login
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}
                                </Button>
                                <Typography style={{ textAlign: "center" }}><LinkRouter to='/register' style={{ color: "rgb(21 103 75)", textDecoration: "none" }}>Don't have an account? Register</LinkRouter></Typography>
                            </form>
                            <div style={{ marginTop: 40, textAlign: "center" }}>
                                <Copyright />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        loginError: state.auth.loginError,
        auth: state.firebase.auth,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials)),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(Landing) 
