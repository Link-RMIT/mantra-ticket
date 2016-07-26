import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Cases, State } from '../../collectons/cases.js';
import { MethodNames } from '../../definitions/method_names.js';


export const new_case = new ValidatedMethod({
    name: MethodNames.case.add,
    validate: new SimpleSchema({
        content: Cases.simpleSchema().schema('content'),
    }).validator(),
    run( { content } ){
        if(this.userId){
        Cases.insert({
            content: content,
            customerId: this.userId,
            createdAt: new Date(),
            state: State.PENDING,
        });
        }
    }
});
