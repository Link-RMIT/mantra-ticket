import {
    useDeps, composeWithTracker, composeAll
} from 'mantra-core';
import CaseList from '../components/case_list';

export const composer = ({context}, onData) => {
    const {Meteor, Collections, GlobalDefinitions} = context();
    if (Meteor.subscribe(GlobalDefinitions.Publications.cases.list.support ).ready()) {
        const options = {
            sort: {createdAt: -1}
        };
        console.log(Collections);
        const case_list = Collections.Cases.find({},options).fetch();
        onData(null, {case_list});
    } else {
        onData();
    }
};

export const depsMapper = (context, actions) => {
    console.log(actions);
    return ({
        assign_to_self: actions.support_person.assign_to_self,
        release: actions.support_person.release,
        resolve: actions.support_person.resolve,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(CaseList);
