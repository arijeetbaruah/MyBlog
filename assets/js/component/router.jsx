import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './homecomponent';
import ViewSkillComponent from './viewSkill';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route path="/skill/:id" component={ViewSkillComponent} />
                </Switch>
            </Router>
        );
    }
}
