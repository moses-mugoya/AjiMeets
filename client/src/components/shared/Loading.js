import React, { Component } from 'react'
import logo from '../../img/ajira.png'

export default class loading extends Component {
    render() {
        return (
            <div style={{ textAlign: "center", marginTop: 100 }}>
                <img src={logo} />
                <h3>Loading...Please wait</h3>
            </div>
        )
    }
}
