import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Overview, Status } from './pages';

class Main extends Component {
    render() {
        return (
            <>
                <button
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        width: '100px',
                        height: '40px',
                        position: 'fixed',
                        zIndex: '15',
                        top: '90vh',
                        left: '90vh'
                    }}
                    onClick={this.props.reload}
                >
                    Main API
                </button>

                <Switch>
                    <Route exact path="/" component={Overview} />
                    <Route path="/:location/:floor" render={props => <Status {...props} />} />
                    <Route path="/:location" component={Status} />
                    <Redirect path="*" to="/" />
                </Switch>
            </>
        );
    }
}

export default Main;
