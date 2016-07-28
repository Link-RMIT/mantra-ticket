export default {
    main:{
        login: ({Meteor, LocalState}, username, password, signup = undefined) => {
            if(signup==='checked'){
                //signup
                return;
            }
            Meteor.loginWithPassword(username, password);
        }
    }
}
