import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Overview, Status } from './pages';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Overview} />
                <Route path="/status" component={Status} />
            </div>
        );
    }
}

export default Main;
