import React,{Component} from "react";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, FormControlLabel, Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoom extends Component{
    defaultVotes = 2;

    constructor(props){
        super(props);
        this.state={
            guestCanPause:true,
            voteToSkip:this.defaultVotes,
        };
        this.handleRoomButtonClicked = this.handleRoomButtonClicked.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
    }

    handleVotesChange(e){
        this.setState({
            voteToSkip: e.target.value,
        });
    }

    handleGuestCanPause(e){
        this.setState({
            guestCanPause:e.target.value === 'true' ? true : false,
        })
    }

    handleRoomButtonClicked(){
        const requestOptions = {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                votes_to_skip : this.state.voteToSkip,
                guest_can_pause : this.state.guestCanPause
            }),
        };
        fetch('/api/create-room',requestOptions).then(response => response.json()).then( data=>this.props.history.push(`/room/${data.code}`));
    } 

    render(){
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center" >
                <Typography component="h4" variant="h4">
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="Center">Guest Playback state</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={ this.handleGuestCanPause }>
                        <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom" />
                        <FormControlLabel value="flase" control={<Radio color="secondary"/>} label="No control" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" defaultValue={this.defaultVotes} onChange={ this.handleVotesChange } inputProps={{min:1,style:{"textAlign":"center"}}}/>
                    <FormHelperText>
                        <div align="center">
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick = { this.handleRoomButtonClicked } >Create a room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
            </Grid>)
    }
}