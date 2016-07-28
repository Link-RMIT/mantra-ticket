import React from 'react';
import {mount} from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MainLayout from './containers/main_layout';
//import PostList from './containers/postlist';
//nimport Post from './containers/post';
//import NewPost from './containers/newpost';

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);
    const nav = [{url:'/',name:'Home'}];
    FlowRouter.route('/', {
        name: 'case.list',
        action() {
            mount(MainLayoutCtx, {
                //content: () => (<PostList />),

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
