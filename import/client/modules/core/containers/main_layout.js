import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout';

export const composer = ({context,content,nav}, onData) => {
    const {Meteor, Collections, States, LocalState} = context();
    onData(null, {
        content,
        nav,
        display_logout_button: LocalState.get('LOGIN_STATE')
    });
};

export const depsMapper = (context, actions) => {
    return ({
        logout: actions.main.logout,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(PostList);
