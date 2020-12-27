import React, { Component } from 'react'
import { connect } from 'react-redux'


class ScheduleMeeting extends Component {
    render() {
        const { auth, profile } = this.state;
        return (
            <div>
                <h1>Schedule Meeting Page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(ScheduleMeeting)
