import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout';
import LoginForm from '../components/login_from';



export const composer = ({context}, onData) => {
    const {LocalState} = context();
    onData(null, {error_message:LocalState.get('LOGIN_ERROR')});
};

export const depsMapper = (context, actions) => {
    return ({
        login: actions.main.login,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginForm);
