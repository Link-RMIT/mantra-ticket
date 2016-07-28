import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CaseNotes = new Mongo.Collection('CaseNote');

CaseNotes.deny({
    insert(){ return true; },
    update(){ return true; },
    remove(){ return true; },
});

CaseNotes.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id},
    caseId: { type: String, regEx: SimpleSchema.RegEx.Id},
    supportPersonId: { type: String, regEx: SimpleSchema.RegEx.Id},
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
});

//"meteor add aldeed:collection2" required
CaseNotes.attachSchema(CaseNotes.schema);
