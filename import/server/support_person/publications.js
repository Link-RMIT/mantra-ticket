import {Cases} from '../../collectons/cases.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Publications } from '../../definitions';


Meteor.publish(Publications.cases.list.support, function () {
    const group = Roles.getGroupsForUser(this.userId);
    const selector = {supportTeamName: {$in:group}};

    const options = {
        fields: {
            _id: 1,
            content: 1,
            createdAt: 1,
            state: 1,
            supportTeamName:1,
            supportPersonId:1,
        },
        sort: {createdAt: -1},
        transform:(the_case)=>{
            const support_user = Meteor.users.findOne({_id:the_case.supportPersonId});
            if(support_user){
                the_case.supportPersonName = user.username;
            }
            return the_case;
        },
        //limit: 10
    };
    //return Cases.find({}).fetch();
    return Cases.find(selector, options);
});
