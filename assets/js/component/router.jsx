import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, SoundsProvider, createSounds } from 'arwes';
import HomeComponent from './homecomponent';
import ViewSkillComponent from './skill/viewSkill';
import ListSkillComponent from './skill/listSkill';
import ListProjectComponent from './project/list';
import ViewProjectComponent from './project/view';
import ListExperienceComponent from './experience/list';
import ViewExperienceComponent from './experience/view';
import ListEducationComponent from './education/list';
import ViewEducationComponent from './education/view';
import ListCertificateComponent from './certificate/list';
import ViewCertificateComponent from './certificate/view';
import store from '../reducer/index';
import { createAppTheme, sounds } from '../withTemplate';
import history from '../history';
import NotFound from './error';

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
                            <Route exact path="/project" component={ListProjectComponent} />
                            <Route exact path="/project/:id" component={ViewProjectComponent} />
                            <Route exact path="/experience" component={ListExperienceComponent} />
                            <Route path="/experience/:id" component={ViewExperienceComponent} />
                            <Route exact path="/education" component={ListEducationComponent} />
                            <Route path="/education/:id" component={ViewEducationComponent} />
                            <Route exact path="/certificate" component={ListCertificateComponent} />
                            <Route exact path="/certificate/:id" component={ViewCertificateComponent} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </Provider>
            </SoundsProvider>
        </ThemeProvider>
    );
};

export default RouterComponent;
