import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import PostList from '../components/main_layout.jsx';


export const composer = ({context}, onData) => {
    console.log("////////////////////////////////////////");
    console.log(context());
    console.log("////////////////////////////////////////");

    const {Meteor, Collections, States} = context();
    const nav = [{url:'/',name:'Home'}];
    if(!Meteor.user){
        onData(null, {content: ()=> ('login'), nav});
    }
    else{
        onData(null, {content: ()=> ('logined'),nav});
    }

};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(PostList);
