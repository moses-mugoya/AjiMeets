import React, { useState, useEffect, Fragment } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from '../shared/Navbar'
import CssBaseline from '@material-ui/core/CssBaseline';
import './MeetingRoom.css'
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import SecurityIcon from '@material-ui/icons/Security';
import PeopleIcon from '@material-ui/icons/People';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import Badge from '@material-ui/core/Badge';
import Messages from '../Messages/Messages'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import ParticipantsModal from '../shared/ParticipantsModal'



let socket;

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paperVideo: {
        padding: theme.spacing(0),
        borderRadius: 0,
        textAlign: 'center',
        height: "100vh",
        backgroundColor: "blue",
        color: theme.palette.text.secondary,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    paperChat: {
        padding: theme.spacing(0),
        borderRadius: 0,
        backgroundColor: "red",
        textAlign: 'center',
        height: "100vh",
        color: theme.palette.text.secondary,
    },
    paperModal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

}));

function MeetingRoom(props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [hostName, setHostName] = useState('');

    const ENDPOINT = 'http://localhost:5000';
    useEffect(() => {
        const { name, room, host } = queryString.parse(props.location.search);
        setName(name);
        setRoom(room);
        if (host !== '') {
            setHostName(host);
        }

        socket = io(ENDPOINT);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, props.location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (
        <Fragment>
            <Grid container spacing={0} className="main">
                <Grid item xs={12} sm={8} md={8} className="main__left">
                    <div className="main__videos">
                        <ParticipantsModal users={users} />
                    </div>
                    <div className="main__controls">
                        <div className="main__controls__block">
                            <div onclick="muteUnmute()" className="main__controls__button main__mute_button">
                                <MicIcon />
                                <span>Mute</span>
                            </div>
                            <div onclick="playStop()" className="main__controls__button main__video_button">
                                <VideocamIcon />
                                <span>Stop Video</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                <SecurityIcon />
                                <span>Security</span>
                            </div>
                            <div className="main__controls__button">
                                <ScreenShareIcon />
                                <span>Share Screen</span>
                            </div>
                            <div className="main__controls__button">
                                <Badge color="secondary" badgeContent={users.length}>
                                    <PeopleIcon />
                                </Badge>
                                <span>Participants</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                <Button href="/profile" color="secondary">Leave meeting</Button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} md={4} className="main__right">
                    <div className="meeting_info">
                        <br />
                        <br />
                        Meeting ID: {room}
                    </div>
                    <div className="main__header">
                        <h3>Chat</h3>
                    </div>
                    <div className="main__chat_window">
                        <Messages messages={messages} name={name} />

                    </div>
                    <div className="main__message_container">
                        <input id="chat_message" type="text" value={message}
                            onChange={({ target: { value } }) => setMessage(value)}
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} placeholder="Type message here..." />
                        <SendIcon style={{ color: "white" }} onClick={e => sendMessage(e)} />
                    </div>

                </Grid>
            </Grid>
        </Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(MeetingRoom)

