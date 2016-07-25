import {Cases} from '../../collectons/cases.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';


export default function () {
    Meteor.publish('cases.list', function () {
        const selector = {customerId: this.customerId};
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
/*
    Meteor.publish('posts.single', function (postId) {
        check(postId, String);
        const selector = {_id: postId};
        return Posts.find(selector);
    });

    Meteor.publish('posts.comments', function (postId) {
        check(postId, String);
        const selector = {postId};
        return Comments.find(selector);
    });
 */
}
