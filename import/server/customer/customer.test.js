import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { _ } from 'meteor/underscore';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { new_case } from './methods.js';
import { Cases,State } from '../../collectons/cases.js';
import { MethodNames, Publications } from '../../definitions';

if (Meteor.isServer) {
    require('./publications.js');
    describe('Customer', () => {
        describe('methods',()=>{
            const customerId = Random.id();
            beforeEach(() => {
                Cases.remove({});
            });

            it('can open a case', (done) => {
                const new_case = Meteor.server.method_handlers[MethodNames.case.add];
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
                done();
            });

        });
        describe('publications', () => {

            Factory.define('case', Cases, {});
            const new_case = ({customerId=Random.id(),createdAt=new Date(), content="A new content", state=State.PENDING}) =>{
                Factory.create('case',{customerId, createdAt, content, state});
            };
            const currentCustomer = Random.id();
            before(()=>{
                Cases.remove({});
                _.times(3, new_case);
                _.times(3, () => new_case({customerId:currentCustomer}));
            });

            it('can only view own cases', (done)=>{
                const collector = new PublicationCollector({ userId: currentCustomer});
                collector.collect(Publications.cases.list.customer,(collections) => {
                    assert.equal(collections.Cases.length, 3);
                    done();
                 });
            });
        });
    });
}
