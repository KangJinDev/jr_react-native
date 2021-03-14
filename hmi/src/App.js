import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import NotFound from './containers/NotFound';
import WifiSettings from './containers/WifiSettings';
import Reports from './containers/Reports';
import SplashScreen from './containers/SplashScreen';
import ConfigurationScreen from './containers/Configuration';

const App = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/start"/>

                <Route path="/start">
                    <SplashScreen {...props} />
                </Route>

                <Route path="/wifi">
                    <WifiSettings {...props} />
                </Route>

                <Route path="/reports">
                    <Reports {...props} />
                </Route>

                <Route path="/config">
                    <ConfigurationScreen {...props} />
                </Route>

                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
