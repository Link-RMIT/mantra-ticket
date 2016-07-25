import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Cases = new Mongo.Collection('Cases');


Cases.deny({
    insert(){ return true; },
    update(){ return true; },
    remove(){ return true; },
});

Cases.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id},
    customerId: { type: String, regEx: SimpleSchema.RegEx.Id},
    createdAt: { type: Date,  denyUpdate: true },
    content: { type: String },
    state: { type: Number },
});

export const State = {
    PENDING: 1,
    PROCESSING: 2,
    RESOLVED: 3,
};

//"meteor add aldeed:collection2" required
Cases.attachSchema(Cases.schema);