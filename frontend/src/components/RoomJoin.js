import React,{Component} from "react";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, FormControlLabel, Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoin extends Component{
    constructor(props){
        super(props);
        this.state={
            RoomCode : "",
            error : "hello"
        }
        this.handleJoinRoom = this.handleJoinRoom.bind(this)
        this.RoomFieldChange = this.RoomFieldChange.bind(this)
    }

    render(){
        return ( <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid>
                    <TextField
                    error={this.state.error}
                    label = "Code"
                    placeholeder="Enter a room code"
                    value = {this.state.RoomCode}
                    helperText = {this.state.error}
                    variant = "outlined"
                    onChange={ this.RoomFieldChange }
                    />
                </Grid>
                <Grid>
                    <Button variant="contained" color="primary" onClick={ this.handleJoinRoom }>Join Room</Button>
                    <Button variant = "container" color="secondary" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        )
    }
    RoomFieldChange(e){
        this.setState({
            RoomCode : e.target.value,
        })
    }

    handleJoinRoom(){
        const requestOptions = {
            method : "POST",
            headers : { 'Content-Type':'application/json' },
            body : JSON.stringify({
                code : this.state.RoomCode
            })
        }
        fetch("/api/join-room", requestOptions).then(response=>{
            if (response.ok){
                this.props.history.push(`/room/${this.state.RoomCode}`)
            }
            else{
                this.setState({
                    error : "Room not found"
                })
            }
        }).catch(error => console.log(error))
    }
}