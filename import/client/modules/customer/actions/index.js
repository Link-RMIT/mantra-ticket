export default {
    customer:{
        new_case: ({Meteor, LocalState, GlobalDefinitions}, content ) => {
            console.log('new_case');
            Meteor.call(
                GlobalDefinitions.MethodNames.case.add,
                { content }
            );
        }
    }
}
