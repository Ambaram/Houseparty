import React, { Component } from 'react';
import ToggleDsiplay from 'react-toggle-display'
import Timer from './timer';

class Game extends Component{
    state= {
        levels : ['Easy', 'Medium', 'Hard'],
        show: true
        
    }
    
    handleDifficulty = level => {
        console.log(level);
        this.setState({
            show: !this.state.show
        });

    }

    render(){
        return <React.Fragment>
            <ToggleDsiplay show={this.state.show}>
            <div className="d-flex flex-column">
                { this.state.levels.map(level => <button onClick={() => this.handleDifficulty(level)} className="btn btn-success col-sm-4 mx-auto my-2 p-2" id={level} key={level}>{level}</button>)}
            </div>
            </ToggleDsiplay>
            <ToggleDsiplay show={!this.state.show}>
                <Timer className="col-sm-4 mx-auto my-2 p-2"></Timer>
            </ToggleDsiplay>
            </React.Fragment>
        
    }
}

export default Game