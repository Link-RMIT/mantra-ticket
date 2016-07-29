import {Configs} from '../definitions';
import { Roles } from 'meteor/alanning:roles';


function new_suppor_persons(){
    const field = 'roles.'+Configs.DEFAULT_SUPPORT_TEAM;
    let selector = {};
    selector[field] = {$exists:true};
    console.log('init add');

    console.log('level1');

    try{
        Accounts.createUser({
            username: 'l1',
            password: 'password'
        });
    }catch(e){}
    const l1 = Meteor.users.findOne({username:'l1'})._id;
    Roles.addUsersToRoles(l1,[],Configs.DEFAULT_SUPPORT_TEAM);
    try{
        const l2 = Accounts.createUser({
            username: 'l2',
            password: 'password'
        });
    }catch(e){}
    const l2 = Meteor.users.findOne({username:'l2'})._id;
    Roles.addUsersToRoles(l2,[],Configs.DEFAULT_SUPPORT_TEAM);

    try{
        const d1 = Accounts.createUser({
            username: 'd1',
            password: 'password'
        });
    }catch(e){}
    const d1 = Meteor.users.findOne({username:'d1'})._id;
    Roles.addUsersToRoles(d1,[],'Developer');
    try{
        const d2 = Accounts.createUser({
            username: 'd2',
            password: 'password'
        });
    }catch(e){}
    const d2 = Meteor.users.findOne({username:'d2'})._id;
    Roles.addUsersToRoles(d2,[], 'Developer');

}

export default function () {
    new_suppor_persons();
    /*try{

     }catch(e){
     }*/
}
