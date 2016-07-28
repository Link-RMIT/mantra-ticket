import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Cases, State } from '../../collections/cases.js';
import { MethodNames, Configs } from '../../definitions';


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
        });
        }
    }
});
