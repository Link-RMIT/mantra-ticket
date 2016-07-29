import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { Cases,State } from '../../collections/cases.js';
import { CaseNotes } from '../../collections/case_notes.js';
import { MethodNames, Configs, Publications } from '../../definitions';
import { assign_case_to_another_team, assign_case_to_self, release } from './methods.js';
/*
if (Meteor.isServer) {
    require('./publications.js');
    describe('Support Person',()=>{
        Factory.define('case', Cases, {});

        Meteor.users.remove({});

        const customerId = Random.id();
        const support_persons = ['foo','bar','baz','qux'].map((name)=>{
            return Accounts.createUser({
                email: name+"@theCompany.com",
                password: "password",
                username: name,
            });
        });
        const team = {
            level1: support_persons.slice(0,2),
            developer: support_persons.slice(2),
        };
        team.level1.forEach((id)=>{
            Roles.addUsersToRoles(id,[],Configs.DEFAULT_SUPPORT_TEAM);
        });
        team.developer.forEach((id)=>{
            Roles.addUsersToRoles(id,[],"Developer");
        });
        let caseId;
        beforeEach(() => {
            Cases.remove({});
            caseId = Cases.insert({
                content: "a case",
                customerId: customerId,
                createdAt: new Date(),
                state: State.PENDING,
            });
        });
        describe('publications',()=>{
            it('can view cases in its team queue',(done)=>{
                const collector = new PublicationCollector({
                    userId: team.level1[0]
                });
                collector.collect(Publications.cases.list.support,(collections) => {
                    assert.equal(collections.Cases.length, 1);
                    assert.equal(collections.Cases[0]._id, caseId);
                    done();
                });
            });
            describe('foo', ()=>{
                beforeEach(() => {
                    Cases.update(caseId,{$set:{supportPersonId:team.level1[0]}});
                });
                it('can view cases assigned to itself',(done)=>{
                    const collector = new PublicationCollector({
                        userId: team.level1[0]
                    });
                    //console.log('//before collect////////////////////');
                    collector.collect(Publications.cases.list.support,(collections) => {
                        assert.equal(collections.Cases.length, 1);
                        assert.equal(collections.Cases[0]._id, caseId);
                        assert.equal(collections.Cases[0].supportPersonId, team.level1[0]);

                        done();
                    });
                    //console.log('//after collect////////////////////');
                });
                it('can\'t view cases assigned to others',(done)=>{
                    //console.log(Cases.findOne({_id:caseId}));
                    //console.log(Cases.find({}).count());
                    const collector = new PublicationCollector({
                        userId: team.level1[1]
                    });
                    collector.collect(Publications.cases.list.support,(collections) => {
                        if(collections.Cases){
                            //const foo = Cases.findOne({_id:caseId});
                            //console.log(foo,collections.Cases[0]);
                            assert.equal(collections.Cases.length, 0);
                        }
                        done();
                    });
                });
            });
            it('can\'t view cases in other team\'s queue',(done)=>{
                const collector = new PublicationCollector({
                    userId: team.developer[0]
                });
                collector.collect(Publications.cases.list.support,(collections) => {
                    if(collections.Cases){
                        assert.equal(collections.Cases.length, 0);
                    }
                    done();
                });
            });
            describe('comments',()=>{

            });//end comments
        });// end publications
        describe('methods',()=>{
            describe('assigning cases',()=>{
                const assign_case_to_another_team = Meteor.server.method_handlers[
                    MethodNames.case.assign.to.team
                ];
                const assign_case_to_self = Meteor.server.method_handlers[
                    MethodNames.case.assign.to.self
                ];
                const release = Meteor.server.method_handlers[
                    MethodNames.case.release
                ];
                it('can assign an case to another team',(done)=>{
                    assign_case_to_another_team.apply({
                        userId: team.level1[0],
                        user: Meteor.users.findOne({_id:team.level1[0] }),
                    },[{caseId,teamName:'Developer'}]);
                    const the_case = Cases.findOne({
                        _id:caseId
                    });
                    assert.equal(the_case.supportTeamName, 'Developer');
                    assert.isUndefined(the_case.supportPersonId);
                    assert.equal(the_case.state, State.PENDING);
                    done();
                });

                it('can\'t assign an case belong to other teams',()=>{
                    expect(()=>{
                        assign_case_to_another_team.apply({
                            userId: team.developer[0],
                            user: Meteor.users.findOne({_id:team.developer[0] }),
                        },[{caseId,teamName:Config.DEFAULT_SUPPORT_TEAM}]);
                    }).to.throw();
                });

                it('can\'t assign an case assigned to another support person',()=>{
                    Cases.update(caseId,{$set:{supportPersonId:team.level1[0]}});
                    expect(()=>{
                        assign_case_to_another_team.apply({
                            userId: team.level1[1],
                            user: Meteor.users.findOne({_id:team.level1[1] }),
                        },[{caseId,teamName:'Developer'}]);
                    }).to.throw();
                });

                it('can\'t assign an not exists case',()=>{
                    expect(()=>{
                        assign_case_to_another_team.apply({
                            userId: team.level1[0],
                            user: Meteor.users.findOne({_id:team.level1[0] }),
                        },[{caseId:Random.id(), teamName:'Developer'}]);
                    }).to.throw();
                });

                it('can\'t assign to an not exists team',()=>{
                    expect(()=>{
                        assign_case_to_another_team.apply({
                            userId: team.level1[0],
                            user: Meteor.users.findOne({_id:team.level1[0] }),
                        },[{caseId,teamName:Random.id()}]);
                    }).to.throw();
                });

                it('can assign to itself', ()=>{
                    const supportPersonId = team.level1[0];
                    assign_case_to_self.apply({
                        userId: supportPersonId,
                        user: Meteor.users.findOne({_id:supportPersonId}),
                    },[{caseId}]);
                    const the_case = Cases.findOne({_id:caseId});
                    assert.equal(the_case.supportPersonId, supportPersonId);
                    assert(the_case.state, State.PROCESSING);
                });

                it('can release the case back to the team', ()=>{
                    const supportPersonId = team.level1[0];
                    Cases.update(caseId, { $set: {
                        supportPersonId:supportPersonId,
                        state:State.PROCESSING,
                    }});
                    release.apply({
                        userId: supportPersonId,
                        user: Meteor.users.findOne({_id:supportPersonId }),
                    },[{caseId}]);
                });

            });// end assign cases
            describe('Note',()=>{
                const add_note = Meteor.server.method_handlers[
                    MethodNames.note.add
                ];
                it('can add a note',()=>{
                    CaseNotes.remove({});
                    const supportPerson = Meteor.users
                              .findOne({_id:team.level1[0]});
                    Cases.update(caseId,{$set:{
                        supportTeamName: Configs.DEFAULT_SUPPORT_TEAM,
                        supportPersonId: supportPerson._id,
                    }});
                    const content = Random.id();
                    add_note.apply({
                        userId: supportPerson._id,
                        user: supportPerson
                    },[{caseId,content}]);
                    const the_note = CaseNotes.findOne({});
                    assert.equal(the_note.caseId,caseId);
                    assert.equal(the_note.supportPersonId,supportPerson._id);
                    assert.equal(the_note.content, content);
                });
            });
        });//end method

    });// end support person
}
*/
