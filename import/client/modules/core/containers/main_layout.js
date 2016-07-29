import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout';

export const composer = ({context,content,nav}, onData) => {
    const {Meteor, Collections, States} = context();
    onData(null, {content, nav});
};

export const depsMapper = (context, actions) => {
    console.log(actions);
    return ({
        logout: actions.main.logout,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(PostList);
