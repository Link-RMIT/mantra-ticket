import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Configs } from '../definitions';

export const Cases = new Meteor.Collection('Cases');

Cases.deny({
    insert(){ return true; },
    update(){ return true; },
    remove(){ return true; },
});

export const State = {
    PENDING: 1,
    PROCESSING: 2,
    RESOLVED: 3,
};

Cases.State  = State;

Cases.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id},
    customerId: { type: String, regEx: SimpleSchema.RegEx.Id},
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        },
    },
    content: { type: String },
    state: { type: Number , defaultValue: State.PENDING},
    supportTeamName: { type: String, defaultValue: Configs.DEFAULT_SUPPORT_TEAM },
    supportPersonId: { type: String, regEx: SimpleSchema.RegEx.Id, optional:true },

});



//"meteor add aldeed:collection2" required
Cases.attachSchema(Cases.schema);
