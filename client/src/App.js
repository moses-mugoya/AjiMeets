import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/Profile/UpdateProfile'
import JoinMeeting from './components/JoinMeeting/JoinMeeting'
import Meetings from './components/Meetings/Meetings'
import ScheduleMeeting from './components/ScheduleMeeting/ScheduleMeeting'
import JoinMeetingAuth from './components/JoinMeeting/JoinMeetingAuth'
import HostMeeting from './components/HostMeeting/HostMeeting'
import MeetingRoom from './components/MeetingRoom/MeetingRoom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot-password' component={PasswordReset} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/update-profile' component={UpdateProfile} />
        <Route exact path='/profile-join-meeting' component={JoinMeetingAuth} />
        <Route exact path='/join-meeting' component={JoinMeeting} />
        <Route exact path='/schedule-meeting' component={ScheduleMeeting} />
        <Route exact path='/meetings' component={Meetings} />
        <Route exact path='/host-meeting' component={HostMeeting} />
        <Route exact path='/meeting-room' component={MeetingRoom} />


      </Switch>
    </Router>

  );
}

export default App;
