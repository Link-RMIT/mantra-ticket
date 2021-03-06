export default {
    support_person:{
        new_note: ({
            Meteor,
            LocalState,
            GlobalDefinitions:{MethodNames}
        }, caseId, content ) => {
            Meteor.call(
                MethodNames.note.add,
                { caseId, content }
            );
        },
        assign_to_self: ({Meteor, LocalState, GlobalDefinitions:{MethodNames}}, caseId ) => {
            Meteor.call(
                MethodNames.case.assign.to.self,
                {caseId});
        },
        assign_to_team: ({Meteor, LocalState, GlobalDefinitions:{MethodNames}}, caseId, teamName ) => {
            Meteor.call(
                MethodNames.case.assign.to.team,
                {caseId, teamName}
            );
        },
        release: ({Meteor, LocalState, GlobalDefinitions:{MethodNames}}, caseId ) => {
            Meteor.call(
                MethodNames.case.release,
                {caseId}
            );
        },
        resolve: ({Meteor, LocalState, GlobalDefinitions:{MethodNames}}, caseId ) => {
            Meteor.call(
                MethodNames.case.resolve,
                {caseId}
            );
        },
    }
}
