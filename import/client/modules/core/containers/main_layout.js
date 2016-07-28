import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout';
import LoginForm from '../containers/login_form';
import CaseList from '../../customer/containers/case_list.js';


export const composer = ({context}, onData) => {
    const {Meteor, Collections, States} = context();
    const nav = [{url:'/',name:'Home'}];
    const user = Meteor.user();
    if(!user){
        onData(null, {content: ()=> (<LoginForm />), nav});
    }
    else if(user.roles){
        onData(null, {content: ()=> ('support person'), nav});
    }
    else {
        onData(null, {content: ()=> (<CaseList />),nav});
    }
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(PostList);
