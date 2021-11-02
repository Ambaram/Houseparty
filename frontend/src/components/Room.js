import React, {Component} from "react";
import { Link } from "react-router-dom"
import {Grid, Typography, Button} from "@material-ui/core"
import CreateRoom from "./CreateRoom";
import MusicPlayer from "./MusicPlayer";


export default class Room extends Component{
    constructor(props){
        super(props);
        this.state={
            VotesToSkip: 2,
            GuestCanPause:false,
            isHost: true,
            showSettings:false,
            spotifyAuthenticated : false,
            song:{}
        }
        this.RoomCode = this.props.match.params.RoomCode
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.getRoomdetails = this.getRoomdetails.bind(this)
        this.authenticateSpotify = this.authenticateSpotify.bind(this)
        this.getCurrentSong = this.getCurrentSong.bind(this)
    }

    getRoomdetails(){
        fetch('/api/get-room?code='+this.RoomCode)
        .then(response=>{
            if(!response.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json()
        })
        .then(data=>{
            this.setState({
                VotesToSkip : data.votes_to_skip,
                GuestCanPause : data.guest_can_pause,
                isHost : data.is_Host,
            });
            if(this.state.isHost){
            this.authenticateSpotify()
        }
        })
    }

    leaveButtonPressed(){
        const requestOptions ={
            method : "POST",
            headers : {"Content-Type":"application/json"},
        }
        fetch("/api/leave-room", requestOptions)
            .then(_response => {
            this.props.leaveRoomCallback()
            this.props.history.push("/")

        })
    }

    updateShowSettings(value){
        this.setState({
            showSettings:value
        })
    }

    getCurrentSong(){
        fetch("/spotify/current-song").then(response=> {
            if (!response.ok){
                return {};
            }
            else{
                return response.json();
            }
        }).then(data=> this.setState({song:data}))
    }

    componentDidMount(){
        this.interval = setInterval(this.getCurrentSong,1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    authenticateSpotify(){
        fetch("/spotify/is-authenticated").then(response => response.json())
        .then(data=> {
            this.setState({
                spotifyAuthenticated:data.status
            });
            if(!data.status){
                fetch("spotify/get-auth-url").then(response => response.json()).then(data=>{
                    window.location.replace(data.url)
                })}
        })
    }

    renderSettings(){
        return (<Grid container spacing={1}>
            <Grid item xs={!2} align="center">
            <CreateRoom update={true} VotesToSkip={this.state.VotesToSkip} GuestCanPause = {this.state.GuestCanPause} RoomCode = {this.RoomCode} updateRoomCallback={(props)=>{this.getRoomdetails}}/>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant = "contained" color="secondary" onClick={()=>this.updateShowSettings(false)}>Back to Room</Button>
            </Grid>
        </Grid>)
    }

    renderSettingsButton(){
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color = "primary" onClick={() => this.updateShowSettings(true)}>Show Settings</Button>
            </Grid>
        )
    }

    render(){
        if(this.state.showSettings){
            return this.renderSettings()
        }
        return (<Grid container spacing={3} >
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">Room : {this.RoomCode}</Typography>
            </Grid>
            <MusicPlayer {...this.state.song}/>
            { this.state.isHost ? this.renderSettingsButton() : null }
            <Grid item xs={12} align="center">
                <Button color="secondary" variant = "contained" onClick={this.leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
        )}}