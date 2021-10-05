import React, { Component } from 'react';

var profilepic = require("../images/profile.jpeg")
class Profile extends Component {
    render() { 
        return <img src = {profilepic.default} className="w-25 rounded-circle" alt="profile"/>
    }
}
 
export default Profile;