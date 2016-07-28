import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import { Cases,State } from '../../collections/cases.js';
import { CaseNotes } from '../../collections/case_notes.js';
import { MethodNames } from '../../definitions';


function is_available (caseId)  {
    var the_case = Cases.findOne({_id:caseId});
    if (!the_case){
        throw new Meteor.Error(MethodNames.case.assign.to.team,"case not found");
    }
    if (!this.user.roles){
        throw new Meteor.Error(MethodNames.case.assign.to.team,"login required");
    }
    if(!(the_case.supportTeamName in this.user.roles)){
        throw new Meteor.Error(MethodNames.case.assign.to.team,"the case is currently own by " + the_case.supportTeamName);
    }
    if(the_case.supportPersonId && (the_case.supportPersonId != this.userId)){
        throw new Meteor.Error(MethodNames.case.assign.to.team,"the case is already assigned to another support person");
    }
    return true;
};

export const assign_case_to_another_team = new ValidatedMethod({
    name: MethodNames.case.assign.to.team,
    validate: new SimpleSchema({
        caseId: Cases.simpleSchema().schema('_id'),
        teamName: Cases.simpleSchema().schema('supportTeamName'),
    }).validator(),
    run( {caseId, teamName } ){
        // the team must exist
        let target_team_exists_selector = {};
        target_team_exists_selector['roles.'+teamName]={$exists:true};
        if (!Meteor.users.findOne(target_team_exists_selector)){
            throw new Meteor.Error(MethodNames.case.assign.to.team,'team \''+teamName+'\' not exists');
        }

        is_available.call(this, caseId);

        Cases.update(caseId,{
            $set:{
                state: State.PENDING,
                supportTeamName: teamName,
                supportPersonId:undefined
            }
        });
    }
});

export const assign_to_self = new ValidatedMethod({
    name: MethodNames.case.assign.to.self,
    validate: new SimpleSchema({
        caseId: Cases.simpleSchema().schema('_id'),
    }).validator(),
    run( { caseId } ){
        is_available.call(this,caseId);
        Cases.update(caseId,{
            $set:{
                state: State.PROCESSING,
                supportPersonId:this.userId,
            }
        });
    }
});

export const release = new ValidatedMethod({
    name: MethodNames.case.release,
    validate: new SimpleSchema({
        caseId: Cases.simpleSchema().schema('_id'),
    }).validator(),
    run( { caseId } ){
        is_available.call(this,caseId);
        Cases.update(caseId,{
            $set:{
                state: State.PENDING,
                supportPersonId:undefined,
            }
        });
    }
});


export const add_note = new ValidatedMethod({
    name: MethodNames.note.add,
    validate: new SimpleSchema({
        caseId: CaseNotes.simpleSchema().schema('caseId'),
        content: CaseNotes.simpleSchema().schema('content'),
    }).validator(),
    run( { caseId, content } ){
        is_available.call(this, caseId);
        CaseNotes.insert({
            caseId,
            content,
            supportPersonId:this.userId,
        });
    }
});
