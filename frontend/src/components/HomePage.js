import React,{Component} from "react";
import RoomJoin from "./RoomJoin";
import CreateRoom from "./CreateRoom";
import {BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom"
import Room from "./Room";
import { ButtonGroup, TextField, Grid, Button, Typography } from "@material-ui/core";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            RoomCode:null
        }
        this.clearRoomcode=this.clearRoomcode.bind(this)
    }

    async componentDidMount(){
        fetch("/api/user-in-room")
        .then(response => response.json())
        .then(data => {
            this.setState({
                RoomCode : data.code,
            })
        })
    }

    renderHomePage(){
        return (
        <Grid container sapcing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h4">
                    House Party App
                </Typography>
            </Grid>       
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/create" component = { Link }>
                        Create a Room
                    </Button>
                    <Button color="secondary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>)
    }

    clearRoomcode(){
        this.setState({
            RoomCode : null
        })
    }

    render(){
        return (<Router>
                <Switch>
                    <Route exact path="/" render={() => {
                            return this.state.RoomCode ? (
                            <Redirect to = {`/room/${this.state.RoomCode}`}/>
                            ) : 
                            (
                                this.renderHomePage()
                            )
                        }}
                        />
                    <Route path="/join" component={RoomJoin} ></Route>
                    <Route path="/create" component={CreateRoom} ></Route>
                    <Route path="/room/:RoomCode" 
                    render={props => {
                        return <Room {...props} leaveRoomCallback={this.clearRoomcode}/> 
                    }}
                    />
                </Switch>
            </Router>
        )
    }
}