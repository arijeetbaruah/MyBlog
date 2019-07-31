import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, SoundsProvider, createSounds } from 'arwes';
import HomeComponent from './homecomponent';
import ViewSkillComponent from './skill/viewSkill';
import ListSkillComponent from './skill/listSkill';
import store from '../reducer/index';
import { createAppTheme, sounds } from '../withTemplate';
import history from '../history';

const RouterComponent = () => {
    return (
        <ThemeProvider theme={createTheme(createAppTheme())}>
            <SoundsProvider sounds={createSounds(sounds)}>
                <Provider store={store}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={HomeComponent} />
                            <Route exact path="/skill" component={ListSkillComponent} />
                            <Route path="/skill/:id" component={ViewSkillComponent} />
                        </Switch>
                    </Router>
                </Provider>
            </SoundsProvider>
        </ThemeProvider>
    );
};

export default RouterComponent;
