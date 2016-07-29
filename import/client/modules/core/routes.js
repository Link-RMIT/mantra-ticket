import React from 'react';
import {mount} from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MainLayout from './containers/main_layout';
import LoginForm from './containers/login_form';
import CaseList from '../customer/containers/case_list.js';
import SupportCaseList from '../support_person/containers/case_list.js';
import CaseDetail from '../support_person/containers/case_detail.js';

//import PostList from './containers/postlist';
//nimport Post from './containers/post';
//import NewPost from './containers/newpost';

/*
 const {Meteor, Collections, States} = context();
 const nav = [{url:'/',name:'Home'}];
 const user = Meteor.user();
 if(!user){
 onData(null, {content: ()=> (<LoginForm />), nav});
 }
 else if(user.roles){
 onData(null, {content: ()=> (<SupportCaseList />), nav});
 }
 else {
 onData(null, {content: ()=> (<CaseList />),nav});
 }
*/
export default function (injectDeps, {FlowRouter, Meteor, Tracker, LocalState}) {
    const MainLayoutCtx = injectDeps(MainLayout);
    const nav = [{url:'/',name:'Home'}];
    Tracker.autorun(()=>{
        if(LocalState.get('LOGIN_STATE')===undefined){
            //ignore first run
            LocalState.set('LOGIN_STATE',false);
            return ;
        }
        const user = Meteor.user();
        if( LocalState.get('LOGIN_STATE') === !user){
            LocalState.set('LOGIN_STATE', !!user);
            FlowRouter.reload('/');
        }
    });

    FlowRouter.route('/', {
        name: 'case.list',
        action() {
            const user = Meteor.user();
            //console.log(user);
            //let content = ()=> ('==========');
            let content = ()=> (<LoginForm />);
            if(!user){
            }
            else if(user.roles){
                content = ()=> (<SupportCaseList />);
            }
            else {
                content = ()=> (<CaseList />);
            }
            mount(MainLayoutCtx, {
                content, nav
            });
        }
    });
    FlowRouter.route('/case/:caseId', {
        name: 'case.detail',
        action({caseId}) {
            mount(MainLayoutCtx, {
                content: () => (<CaseDetail caseId={caseId}/>)
            });
        }
    });

    /*
    FlowRouter.route('/post/:postId', {
        name: 'posts.single',
        action({postId}) {
            mount(MainLayoutCtx, {
                content: () => (<Post postId={postId}/>)
            });
        }
    });
     *//*
    FlowRouter.route('/new-post', {
        name: 'newpost',
        action () {
            mount(MainLayoutCtx, {
                content: () => (<NewPost/>)
            });
        }
    });*/
}
