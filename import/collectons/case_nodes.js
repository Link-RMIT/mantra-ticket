import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CaseNote = new Mongo.Collection('CaseNote');

CaseNote.deny({
    insert(){ return true; },
    update(){ return true; },
    remove(){ return true; },
});

CaseNote.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id},
    supportPersonId: { type: String, regEx: SimpleSchema.RegEx.Id},
    createdAt: { type: Date,  denyUpdate: true },
    content: { type: String },
});

//"meteor add aldeed:collection2" required
CaseNote.attachSchema(CaseNote.schema);