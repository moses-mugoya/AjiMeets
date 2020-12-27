import React, { useState, Fragment, useEffect, useRef } from 'react'
import "antd/dist/antd.css";
import { Row, Col, Button, Drawer } from 'antd';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import SecurityIcon from '@material-ui/icons/Security';
import PeopleIcon from '@material-ui/icons/People';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import Badge from '@material-ui/core/Badge';
import Messages from '../Messages/Messages'
import SendIcon from '@material-ui/icons/Send';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicOffIcon from '@material-ui/icons/MicOff';
import './MeetingRoom.css'
import ParticipantsModal from '../shared/ParticipantsModal'
import io from 'socket.io-client';
import queryString from 'query-string';
import { connect } from 'react-redux'
import Peer from 'peerjs';


let socket;

const videoGrid = {
    backgroundColor: "black",
    height: "100vh",
}

const chatGrid = {
    height: "100vh",
    backgroundColor: "#242324",
    borderLeft: "1px solid #3D3D42",
    display: "flex",
    flexDirection: "column"
}

const mainControls = {
    backgroundColor: "#1C1E20",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
}

const chatInput = {
    marginTop: "auto",
    padding: "22px 12px",
    display: "flex"
}

const mainControlsBlock1 = {
    color: "#D2D2D2",
    display: "flex",
    padding: 5,
}
const mainControlsBlock2 = {
    color: "#D2D2D2",
    display: "flex",
    padding: 5,
    justifyContent: "space-between"
}
const mainControlsBlock3 = {
    color: "#D2D2D2",
    display: "flex",
    padding: 5,
    justifyContent: "end",
    float: "right"
}
const chatMessage = {
    flexGrow: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "#F5F5F5",
}



function MeetingRoom(props) {
    const [participantsVisible, setparticipantsVisible] = useState(false);
    const [chatsVisible, setChatsVisible] = useState(false);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [hostName, setHostName] = useState('');
    const [myStream, setMyStream] = useState('');
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true)

    const myVideoGrid = useRef();

    const ENDPOINT = 'localhost:5000';

    const myPeer = new Peer(undefined, {
        host: '/',
        port: '3001'
    })


    const myVideo = document.createElement('video');
    myVideo.className = 'myVideo';
    myVideo.muted = true;
    const peers = {}

    useEffect(() => {
        myPeer.on('error', e => {
            console.log("connection set", e.type);
        })

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            setMyStream(stream);
            addVideoStream(myVideo, stream)
            myPeer.on('call', call => {
                console.log('Answered call', call);
                call.answer(stream);
                const video = document.createElement('video');
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })

            socket.on('user-connected', userId => {
                connectToNewUser(userId, stream)
            })


        })
    }, []);


    useEffect(() => {
        const { name, room, host } = queryString.parse(props.location.search);
        setName(name);
        setRoom(room);
        if (host !== '') {
            setHostName(host);
        }

        socket = io(ENDPOINT);

        myPeer.on('open', userId => {
            socket.emit('join', { name, room, userId }, (error) => {
                if (error) {
                    alert(error);
                }
            });
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, props.location.search]);




    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        myVideoGrid.current.append(video);

    }


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, []);

    useEffect(() => {
        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        })
    }, [])



    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const showHideChats = () => {
        setChatsVisible(!chatsVisible);
    }
    const showParticipants = () => {
        setparticipantsVisible(true);
    };
    const onClose = () => {
        setparticipantsVisible(false);
    };

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
            video.remove()
        })

        peers[userId] = call
    }

    const muteUnmute = () => {
        const enabled = myStream.getAudioTracks()[0].enabled;
        if (enabled) {
            myStream.getAudioTracks()[0].enabled = false;
            setAudioEnabled(false);

        } else {
            myStream.getAudioTracks()[0].enabled = true;
            setAudioEnabled(true);
        }
    }

    const playStop = () => {
        let enabled = myStream.getVideoTracks()[0].enabled;
        if (enabled) {
            myStream.getVideoTracks()[0].enabled = false;
            setVideoEnabled(false);

        } else {
            myStream.getVideoTracks()[0].enabled = true;
            setVideoEnabled(true);
        }
    }


    function renderMainScreen(chatsVisible) {
        if (chatsVisible) {
            return (
                <Fragment>
                    <Col xs={24} lg={19} style={videoGrid}>
                        <div id="video-grid" ref={myVideoGrid}>


                        </div>
                        <div style={mainControls}>
                            <Row>
                                <Col lg={8} style={mainControlsBlock1}>
                                    <div onClick={muteUnmute} className="main__controls__button main__mute_button">
                                        {
                                            audioEnabled
                                                ?
                                                <Fragment><MicIcon />
                                                    <span>Mute</span></Fragment>
                                                :
                                                <Fragment>
                                                    <MicOffIcon />
                                                    <span>Unmute</span>
                                                </Fragment>

                                        }
                                    </div>
                                    <div onClick={playStop} className="main__controls__button main__video_button">
                                        {
                                            videoEnabled
                                                ?
                                                <Fragment><VideocamIcon />
                                                    <span>Stop Video</span></Fragment>
                                                :
                                                <Fragment>
                                                    <VideocamOffIcon />
                                                    <span>Play Video</span>
                                                </Fragment>

                                        }
                                    </div>

                                </Col>
                                <Col lg={8} style={mainControlsBlock2}>
                                    <div className="main__controls__button">
                                        <SecurityIcon />
                                        <span>Security</span>
                                    </div>
                                    <div className="main__controls__button" style={{ textAlign: "center" }}>
                                        <ScreenShareIcon />
                                        <span>Share Screen</span>
                                    </div>
                                    <div className="main__controls__button" style={{ textAlign: "center" }} onClick={showParticipants}>
                                        <Badge color="secondary" badgeContent={users.length}>
                                            <PeopleIcon />
                                        </Badge>
                                        <span>Participants</span>
                                    </div>
                                    <div className="main__controls__button" style={{ textAlign: "center" }} onClick={showHideChats}>
                                        <ChatBubbleIcon />
                                        <span>Chats</span>
                                    </div>
                                </Col>
                                <Col lg={8} style={mainControlsBlock3}>
                                    <div className="main__controls__block">
                                        <div className="main__controls__button" >
                                            <Button href="/profile" type="primary" danger style={{ position: "absolute", right: 0, marginRight: 10 }}>Leave meeting</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Drawer
                            title={<h4 style={{ fontWeight: "bold", textAlign: "center" }}>{`Participants(${users.length})`}</h4>}
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={participantsVisible}
                        >
                            <ParticipantsModal users={users} />
                        </Drawer>
                    </Col>
                    <Col xs={24} lg={5} style={chatGrid}>
                        <h3 style={{ marginTop: 20, color: 'white', textAlign: "center" }}>Chats</h3>
                        <div className="main__chat_window">
                            <Messages messages={messages} name={name} />

                        </div>
                        <div style={chatInput}>
                            <input id="chat_message" style={chatMessage} type="text" value={message}
                                onChange={({ target: { value } }) => setMessage(value)}
                                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} placeholder="Type message here..." />
                            <SendIcon style={{ color: "white" }} onClick={e => sendMessage(e)} />
                        </div>

                    </Col>
                </Fragment>
            )
        } else {
            return (<Fragment>
                <Col xs={24} lg={24} style={videoGrid}>
                    <div id="video-grid" ref={myVideoGrid}>

                    </div>
                    <div style={mainControls}>
                        <Row>
                            <Col lg={8} style={mainControlsBlock1}>
                                <div onClick={muteUnmute} className="main__controls__button main__mute_button">
                                    {
                                        audioEnabled
                                            ?
                                            <Fragment><MicIcon />
                                                <span>Mute</span></Fragment>
                                            :
                                            <Fragment>
                                                <MicOffIcon />
                                                <span>Unmute</span>
                                            </Fragment>

                                    }
                                </div>
                                <div onClick={playStop} className="main__controls__button main__video_button">
                                    {
                                        videoEnabled
                                            ?
                                            <Fragment><VideocamIcon />
                                                <span>Stop Video</span></Fragment>
                                            :
                                            <Fragment>
                                                <VideocamOffIcon />
                                                <span>Play Video</span>
                                            </Fragment>

                                    }
                                </div>

                            </Col>
                            <Col lg={8} style={mainControlsBlock2}>
                                <div className="main__controls__button">
                                    <SecurityIcon />
                                    <span>Security</span>
                                </div>
                                <div className="main__controls__button">
                                    <ScreenShareIcon />
                                    <span>Share Screen</span>
                                </div>
                                <div className="main__controls__button" onClick={showParticipants}>
                                    <Badge color="secondary" badgeContent={users.length}>
                                        <PeopleIcon />
                                    </Badge>
                                    <span>Participants</span>
                                </div>
                                <div className="main__controls__button" onClick={showHideChats}>
                                    <ChatBubbleIcon />
                                    <span>Chats</span>
                                </div>
                            </Col>
                            <Col lg={8} style={mainControlsBlock3}>
                                <div className="main__controls__block">
                                    <div className="main__controls__button" >
                                        <Button href="/profile" type="primary" danger style={{ position: "absolute", right: 0, marginRight: 10 }}>Leave meeting</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Drawer
                        title={<h4 style={{ fontWeight: "bold", textAlign: "center" }}>{`Participants(${users.length})`}</h4>}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={participantsVisible}
                    >
                        <ParticipantsModal users={users} />
                    </Drawer>
                </Col>
            </Fragment>
            )
        }
    }
    return (
        <div>
            <Row>
                {
                    renderMainScreen(chatsVisible)
                }
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(MeetingRoom)
