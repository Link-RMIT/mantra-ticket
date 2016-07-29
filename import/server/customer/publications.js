import {Cases} from '../../collections/cases.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Publications } from '../../definitions';


Meteor.publish(Publications.cases.list.customer, function () {
    const selector = {customerId: this.userId};
    const options = {
        fields: {
            _id: 1,
            content: 1,
            createdAt: 1,
            state: 1
        },
        sort: {createdAt: -1},
        //limit: 10
    };
    return Cases.find(selector, options);
});
