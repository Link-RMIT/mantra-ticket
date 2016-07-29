import {
    useDeps, composeWithTracker, composeAll
} from 'mantra-core';
import CaseDetail from '../components/case_detail';

export const composer = ({context, caseId}, onData) => {
    const {Meteor, FlowRouter, Collections, GlobalDefinitions} = context();
    console.log(GlobalDefinitions);
    if (Meteor.subscribe(GlobalDefinitions.Publications.cases.list.support ).ready()) {
        const user = Meteor.user();
        const options = {
            sort: {createdAt: -1}
        };
        const the_case = Collections.Cases.findOne(
            {_id:caseId},
            options
        );
        if(!the_case){
            FlowRouter.go('/');
            return;
        }
        let data = {
            the_case,
            teams: GlobalDefinitions.Configs.TEAM_LIST
                .filter((name)=> !(name in user.roles)),
            notes:[],
        };

        if(Meteor.subscribe(GlobalDefinitions.Publications.notes.list).ready()){
            const note_options = {
                sort: {createdAt: -1},
            };
            data.notes = Collections.CaseNotes.find({caseId: caseId},note_options).fetch();
            onData(null, data);
        }
        else{
            onData(null, data);
        }

    } else {
        onData();
    }
};

export const depsMapper = (context, actions) => {
    console.log(actions);
    return ({
        assign_to_team: actions.support_person.assign_to_team,
        new_note: actions.support_person.new_note,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(CaseDetail);
