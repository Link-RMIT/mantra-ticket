import {
    useDeps, composeWithTracker, composeAll
} from 'mantra-core';
import CaseList from '../components/case_list';

export const composer = ({context}, onData) => {
    const {Meteor, Collections, GlobalDefinitions} = context();
    if (Meteor.subscribe(GlobalDefinitions.Publications.cases.list.customer ).ready()) {
        const options = {
            sort: {createdAt: -1}
        };

        const case_list = Collections.Cases.find({},options).fetch();
        onData(null, {case_list});
    } else {
        onData();
    }
};

export const depsMapper = (context, actions) => {
    return ({
        new_case: actions.customer.new_case,
        context: () => context
    });
};

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(CaseList);
