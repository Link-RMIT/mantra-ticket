import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout';
import LoginForm from '../components/login_from';



export const composer = ({context}, onData) => {
    onData(null, {});
};

export const depsMapper = (context, actions) => {
    console.log(actions);
    return ({
        login: actions.main.login,
        //clearErrors: actions.posts.clearErrors,
        context: () => context
    });
};


export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginForm);
