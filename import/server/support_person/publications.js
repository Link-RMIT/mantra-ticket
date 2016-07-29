import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Publications } from '../../definitions';
import {Cases} from '../../collections/cases.js';
import { CaseNotes } from '../../collections/case_notes.js';

Meteor.publish(Publications.cases.list.support, function () {
    const group = Roles.getGroupsForUser(this.userId);
    const selector = {$and:[
        {supportTeamName: {$in:group}},
        {$or:[
            {supportPersonId: null},
            {supportPersonId: this.userId},
        ]},
    ]};
    const options = {
        fields: {
            _id: 1,
            content: 1,
            createdAt: 1,
            state: 1,
            supportTeamName:1,
            supportPersonId:1,
            //supportPersonName:1,
            //notes:1,
        },
        sort: {createdAt: -1},
        /*
        transform:(the_case)=>{
            if(the_case.supportPersonId){
                const support_user = Meteor.users.findOne({_id:the_case.supportPersonId});
                console.log('//support_user////////////////////////')
                console.log(support_user);
                if(support_user){
                    the_case.supportPersonName = support_user.username;
                }
            }
            the_case.notes = CaseNotes.find({
                caseId:the_case._id
            },{
                sort: {createdAt: -1}
            }).fetch() || [];
            return the_case;
        },
        //limit: 10
        */
    };
    //return Cases.find({}).fetch();
    //console.log('//find////////////////////////');
    //console.log(Cases.find({}, options).fetch()[0]);
    //console.log('//end find////////////////////////');
    return Cases.find(selector, options);
});


Meteor.publish("rooms", function () {
    var self = this;
    var handle = Rooms.find({}).observeChanges({
        added:   function(id, fields) { self.added("rooms", id, fields); },
        changed: function(id, fields) { self.changed("rooms", id, fields); },
        removed: function(id)         { self.added("rooms", id); },
    });
    self.ready();
    self.onStop(function () { handle.stop(); });
});

Meteor.publish(Publications.notes.list, function () {
    var self = this;
    var handle = CaseNotes.find({}).observeChanges({
        added:   function(id, fields) {
            const author = Meteor.users.findOne({_id:fields.supportPersonId});
            fields.support_person_name = author.username;
            console.log(id,fields);
            self.added("CaseNotes", id, fields);
        },
    });
    self.ready();
    self.onStop(function () { handle.stop(); });
});
