import Collections from '../../collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import GlobalDefinitions from '../../definitions';

console.log(Collections);

export default function () {
    console.log('init context');
    console.log(Meteor);
    return {
        Meteor,
        FlowRouter,
        Collections,
        LocalState: new ReactiveDict(),
        Tracker,
        GlobalDefinitions,
    };
}
