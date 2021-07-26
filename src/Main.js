import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Overview, Status } from './pages';

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Overview} />
                <Route
                    path="/:location/:floor"
                    render={props => <Status {...props} mainReload={this.props.reload} />}
                />
                <Route
                    path="/:location"
                    render={props => <Status {...props} mainReload={this.props.reload} />}
                />
                <Redirect path="*" to="/" />
            </Switch>
        );
    }
}

export default Main;
