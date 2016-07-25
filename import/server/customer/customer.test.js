import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Tasks } from './methods.js';
import { Cases,State } from '../../collectons/cases.js';


if (Meteor.isServer) {
    describe('Server.Customer', () => {
        describe('methods',()=>{
            const customerId = Random.id();

            beforeEach(() => {
                Cases.remove({});
            });

            it('can open a case', () => {
                const new_case = Meteor.server.method_handlers['case.add'];
                const content = "test content";
                new_case.apply({
                    userId: customerId
                },[{content}]);
                the_case = Cases.find({customerId: customerId});
                assert.equal(the_case.count(), 1);
                the_case = the_case.fetch()[0];
                assert.equal(the_case.state, State.PENDING, "default state should be PENDING");
                assert.equal(the_case.customerId, customerId);
                assert.equal(the_case.content, content);
            });
        });
    });
}
