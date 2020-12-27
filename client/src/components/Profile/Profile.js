import React, { Component, Fragment } from 'react'
import Navbar from '../shared/Navbar'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import bg2 from '../../img/bgi.jpg';
import avatar from '../../img/avatar.svg';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadProfImage } from '../../store/actions/authActions'
import { compose } from 'redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import Edit from '@material-ui/icons/Edit';
import Forward from '@material-ui/icons/Forward';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import './Profile.css'


const useStyles = (theme) => ({
    root: {
        height: '100vh',
        paddingRight: 15,
        paddinLeft: 15,
        marginRight: "auto",
        marginLeft: "auto"
    },
    large: {
        marginTop: 40,
        width: 100,
        height: 100,
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
        margin: theme.spacing(4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper2: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        height: 180,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 4
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
        backgroundColor: "#32be8f",
        '&:hover': {
            background: "#33be6f",
        },
        marginTop: 50,
        color: "white",
        height: 30,
        borderRadius: 15,
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
    },
    profileImage: {
        position: "relative"
    },
    input: {
        display: 'none',
    },

    uploadBtn: {
        backgroundColor: "#32be8f",
        color: "white",
        fontSize: 20,
        margin: 5
    },
    progress: {
        color: "#32be8f"
    },

    icons: {
        color: "#32be8f",
        marginTop: 20,
        fontSize: 80
    },
    sideBar: {
        marginTop: 15,
    }

});

class Profile extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        this.props.uploadProfileImg(image, this.props.auth.uid);
    };

    render() {
        const { auth, profile, classes, loading, uploadError } = this.props;
        let imageUrl;
        if (profile.profileImageUrl) {
            imageUrl = profile.profileImageUrl;
        } else {
            imageUrl = avatar;
        }
        if (!auth.uid) return <Redirect to='/' />
        return (
            <Fragment>
                <Navbar />
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={12} sm={4} md={3} component={Paper} className={classes.sideBar} elevation={4} square>
                        <div className={classes.paper}>
                            <div>
                                <Avatar alt="Remy Sharp" src={imageUrl} className={classes.large} />
                            </div>
                            <input accept="image/*" className={classes.input} onChange={this.handleImageChange} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <Tooltip title='Upload picture' placement="right-start">
                                    <IconButton className={classes.uploadBtn} aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </Tooltip>
                            </label>

                            {loading && (<Typography component="h6" variant="h6" style={{ marginTop: 10 }}>
                                Uploading image...<CircularProgress className={classes.progress} size={30} />
                            </Typography>)}
                            {uploadError && (<Typography component="h6" variant="h6" style={{ marginTop: 10, color: "red" }}>
                                {uploadError}
                            </Typography>)}

                            <Typography component="h5" variant="h5" style={{ marginTop: 30 }}>
                                {profile.firstName ? this.capitalizeFirstLetter(profile.firstName) : null} {profile.lastName ? this.capitalizeFirstLetter(profile.lastName) : null}
                                <Tooltip title='Update Profile Names' placement="right-start">
                                    <Link to='/update-profile'><Edit style={{ marginLeft: 20, color: "#32be8f" }} /></Link>
                                </Tooltip>
                            </Typography>
                            <Typography component="h6" variant="h6" style={{ marginTop: 30, fontWeight: "bold" }}>
                                Personal ID
                            </Typography>
                            <Typography component="h6" variant="h6">
                                {profile.personalID}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={8} md={9} container square className="zoom">
                        <Grid md={3} sm={6} xs={12}>
                            <Link to='/profile-join-meeting' style={{ textDecoration: "none" }}>
                                <Paper className={classes.paper2}>
                                    <Forward className={classes.icons} />
                                    <Typography variant="h6" component="h6" style={{ marginTop: 10 }}>Join a Meeting</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid md={3} sm={6} xs={12} className="zoom">
                            <Link to={`/meeting-room?name=${profile.firstName + ' ' + profile.lastName}&host=${profile.firstName + ' ' + profile.lastName}&room=${profile.personalID}`} style={{ textDecoration: "none" }}>
                                <Paper className={classes.paper2}>
                                    <GroupIcon className={classes.icons} />
                                    <Typography variant="h6" component="h6" style={{ marginTop: 10 }}>Host a Meeting</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid md={3} sm={6} xs={12} className="zoom">
                            <Link to='/schedule-meeting' style={{ textDecoration: "none" }}>
                                <Paper className={classes.paper2}>
                                    <ScheduleIcon className={classes.icons} />
                                    <Typography variant="h6" component="h6" style={{ marginTop: 10 }}>Schedule a Meeting</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid md={3} sm={6} xs={12} className="zoom">
                            <Link to='/meetings' style={{ textDecoration: "none" }}>
                                <Paper className={classes.paper2}>
                                    <CalendarTodayIcon className={classes.icons} />
                                    <Typography variant="h6" component="h6" style={{ marginTop: 10 }}>Meetings</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loading: state.auth.loading,
        profile: state.firebase.profile,
        notifications: state.firestore.ordered.notifications,
        uploadError: state.auth.uploadError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadProfileImg: (data, userId) => dispatch(uploadProfImage(data, userId))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(useStyles))(Profile)

