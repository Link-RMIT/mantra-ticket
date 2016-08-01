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
        },
        sort: {createdAt: -1},
    return Cases.find(selector, options);
});

Meteor.publish(Publications.notes.list, function () {
    var self = this;
    var handle = CaseNotes.find({}).observeChanges({
        added:   function(id, fields) {
            const author = Meteor.users.findOne({_id:fields.supportPersonId});
            fields.support_person_name = author.username;
            self.added("CaseNotes", id, fields);
        },
    });
    self.ready();
    self.onStop(function () { handle.stop(); });
});
