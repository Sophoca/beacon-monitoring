import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Overview, Status } from './pages';

function Main(props) {
    const slotURL = props.lists.reduce((obj, d) => ({ ...obj, [d.key]: d.slotUrl }), {});

    return (
        <Switch>
            <Route exact path="/" render={props => <Overview {...props} slotURL={slotURL} />} />
            <Route
                path="/:location/:floor"
                render={props => <Status {...props} mainReload={props.reload} />}
            />
            <Route
                path="/:location"
                render={props => <Status {...props} mainReload={props.reload} />}
            />
            <Redirect path="*" to="/" />
        </Switch>
    );
}

export default Main;
