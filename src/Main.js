import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview, Status } from './pages';

class Main extends Component {
    render() {
        return (
            <div>
                <button
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        width: '100px',
                        height: '30px'
                    }}
                    onClick={this.props.reload}
                >
                    reload
                </button>
                <Route exact path="/" component={Overview} />
                <Switch>
                    <Route path="/:location/:floor" component={Status} />
                    <Route path="/:location" component={Status} />
                </Switch>
            </div>
        );
    }
}

export default Main;
