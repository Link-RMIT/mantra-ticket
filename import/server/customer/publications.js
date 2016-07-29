import {Cases,State} from '../../collections/cases.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Publications } from '../../definitions';


Meteor.publish(Publications.cases.list.customer, function () {

    const selector = {customerId: this.userId};
    const options = {
        sort: {createdAt: -1},
        //limit: 10
    };
    var self = this;
    function transform (id, fields) {
        if (fields.state == State.RESOLVED){
            fields.stateDescription = "Resolved";
        }
        else if (fields.supportPersonId){
            const support_person_name = Meteor.users.findOne({_id:fields.supportPersonId});
            fields.stateDescription = "Processing by: " + support_person_name.username;
        }
        else if(fields.supportTeamName){
            fields.stateDescription = "Pending at team: " + fields.supportTeamName;
        }else if(fields.state == State.PENDING){
            fields.stateDescription = "Pending";
        }
        console.log(Cases._name);
        return fields;
    };
    var handle = Cases.find(selector,options).observeChanges({
        added: (id, fields)=>{
            self.added(Cases._name,id,transform(id,fields));
        },
        changed: (id, fields)=>{
            console.log(fields);
            self.changed(Cases._name,id,transform(id,fields));
        },
    });
    self.ready();
    self.onStop(function () { handle.stop(); });
    //return Cases.find(selector, options);
});
