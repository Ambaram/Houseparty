import React , {Component} from "react";
import Countdown from "react-countdown";
import Game from "./game";

class Timer extends Component{
    render(){
        return <React.Fragment>
            <Countdown date={Date.now()+10000} />
            </React.Fragment>
    }
}


export default Timer