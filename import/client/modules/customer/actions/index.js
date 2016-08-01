export default {
    customer:{
        new_case: ({Meteor, LocalState, GlobalDefinitions}, content ) => {
            Meteor.call(
                GlobalDefinitions.MethodNames.case.add,
                { content }
            );
        }
    }
}
